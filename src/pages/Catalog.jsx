import React from "react";

import { useParams } from "react-router";
import MovieGrid from "../components/movie-grid/MovieGrid";

import PageHeader from "../components/page-header/PageHeader";

import { category as cate } from "./../api/tmdbApi";

const Catalog = () => {
  const { category ,keyword } = useParams();

  return (
    <>
      <PageHeader>
        {keyword && 'Search result for: ' + keyword}
        {category && !keyword &&  <b style={{textTransform:"uppercase"}}>{category}</b>  }
        {/* {category === cate.movie ? "Movies" : "TV Series"} */}
      </PageHeader>

      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
