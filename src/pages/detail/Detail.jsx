import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
const Detail = () => {
  const { category, id } = useParams();
  const [Loading, setLoading] = useState(true);

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.detail(category, id, { params: {} });
        setItem(response);
      } catch (err) {
        console.error("Failed to fetch detail", err);
      } finally {
         setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {Loading ? (
        <>
          {/* Banner skeleton */}
          {/* <div style={{marginTop:'80px'}}  className="banner-skeleton ">
            <SkeletonLoader count={1} height={300} style={{ width: "100%" }} />
          </div> */}

          {/* Main content skeleton: poster + info */}
          <div style={{marginTop:'100px'}} className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <SkeletonLoader count={1} height={320} style={{  borderRadius: 12 }} />
            </div>

            <div className="movie-content__info" style={{ flex: 1 }}>
              {/* Title skeleton */}
              <div style={{ marginBottom: 16 }}>
                <SkeletonLoader count={1} height={48} style={{ width: "70%" }} />
              </div>

              {/* Genres skeleton */}
              <div className="genres" style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <SkeletonLoader count={3} height={32} style={{ width: 80, borderRadius: 20 }} />
              </div>

              {/* Overview skeleton */}
              <div style={{ marginBottom: 16 }}>
                <SkeletonLoader count={3} height={14} style={{ width: "100%" }} />
              </div>

              {/* Cast header + list skeleton */}
              <div className="cast">
                <div className="section__header" style={{ marginBottom: 12 }}>
                  <SkeletonLoader count={1} height={28} style={{ width: 120 }} />
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <SkeletonLoader   count={5} height={80} circle={true}  style={{ display: "flex", flexDirection: 'row', gap: 12 ,width:'100%' }}/>
                </div>
              </div>
            </div>
          </div>

          {/* Videos skeleton */}
          <div className="container">
            <div className="section mb-3">
              <SkeletonLoader count={1} height={36} style={{ width: 140, marginBottom: 12 }} />
              <SkeletonLoader count={2} height={180} style={{ width: "100%", marginBottom: 8 }} />
            </div>

            {/* Similar movies skeleton */}
            <div className="section mb-3">
              <div className="section__header mb-2">
                <SkeletonLoader count={1} height={28} style={{ width: 120 }} />
              </div>
              <div >
                <SkeletonLoader count={6} height={220}style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12,width: "100%"  }}  />
              </div>
            </div>
          </div>
        </>
      ) : (
        item && (
          <>
            <div
              className="banner"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  item.backdrop_path || item.poster_path
                )})`,
              }}
            ></div>

            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <div
                  className="movie-content__poster__img"
                  style={{
                    backgroundImage: `url(${apiConfig.originalImage(
                      item.backdrop_path || item.poster_path
                    )})`,
                  }}
                ></div>
              </div>

              <div className="movie-content__info">
                <h1 className="title">{item.title || item.name}</h1>
                <div className="genres">
                  {item.genres &&
                    item.genres.slice(0, 5).map((genre, index) => (
                      <span key={index} className="genres__item">
                        {genre.name}
                      </span>
                    ))}
                </div>
                <p className="overview">{item.overview}</p>
                <div className="cast">
                  <div className="section__header">
                    <h2>Casts</h2>
                  </div>
                  {/* casts list */}
                  <CastList id={item.id} />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="section mb-3">
                <VideoList id={item.id} />
              </div>
              <div className="section mb-3">
                <div className="section__header mb-2">
                  <h2>Similar</h2>
                </div>
                <MovieList category={category} type="similar" id={item.id} />
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default Detail;
