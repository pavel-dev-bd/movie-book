import React, { useCallback, useEffect, useState } from "react";
import "./movie-grid.scss";
import { useHistory, useParams } from "react-router";
import MovieCard from "./../movie-card/MovieCard";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import MovieSearch from "../movie-search/MovieSearch";
//import * as Config from "./../../constants/Config";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // renamed from Lodging
  const [loadingMore, setLoadingMore] = useState(false); // prevent concurrent loads
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      setLoading(true);

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
      setPage(1); // reset page on new query/category
     // setLoading(false);
    };
    getList();
  }, [keyword, props.category]);

  const loadMore = useCallback(async () => {
    // don't load if already loading more or initial loading or no more pages
    if (loadingMore || loading || page >= totalPage) return;

    setLoadingMore(true);
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }

    setItems((prev) => [...prev, ...response.results]);
    setPage((p) => p + 1);
    setLoadingMore(false);
  }, [loadingMore, loading, page, totalPage, keyword, props.category]);

  // scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && page < totalPage && !loadingMore && !loading) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, page, totalPage, loadingMore, loading]);

  return (
    <>
      {/* <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div> */}
      {loading ? (
        <div className="container">
          <SkeletonLoader
            count={5}
            height={380}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
              width: "100%",
              borderRadius: "30px",
            }}
          />
          <SkeletonLoader
            count={5}
            height={380}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
              width: "100%",
              borderRadius: "30px",
              marginTop: 20,
            }}
          />
        </div>
      ) : (
        <div className="movie-grid">
          {items.map((item, index) => (
            <MovieCard key={index} category={props.category} item={item} />
          ))}
        </div>
      )}

      {page < totalPage ? (
            loadingMore &&  <LoagingSkeleton/>
      ) : (
        "No more content"
      )}
    </>
  );
};
const LoagingSkeleton = () => {
  return (
    <div className="container">
          <SkeletonLoader
            count={5}
            height={380}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
              width: "100%",
              borderRadius: "30px",
            }}
          />
          <SkeletonLoader
            count={5}
            height={380}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
              width: "100%",
              borderRadius: "30px",
              marginTop: 20,
            }}
          />
        </div>
  )}


// const MovieSearch = (props) => {
//   const history = useHistory();

//   const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

//   const goToSearch = useCallback(() => {
//     if (keyword.trim().length > 0) {
//       history.push(
//         `/${category[props.category]}/search/${keyword}`
//       );
//     }
//   }, [keyword, props.category, history]);

//   useEffect(() => {
//     const enterEvent = (e) => {
//       e.preventDefault();
//       if (e.keyCode === 13) {
//         goToSearch();
//       }
//     };
//     document.addEventListener("keyup", enterEvent);
//     return () => {
//       document.removeEventListener("keyup", enterEvent);
//     };
//   }, [goToSearch]);

//   return (
//     <div className="movie-search">
//       <Input
//         type="text"
//         placeholder="Enter keyword"
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <Button className="small" onClick={goToSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };

export default MovieGrid;
