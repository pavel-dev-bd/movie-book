import React, { useEffect, useRef } from "react";
import { Link, useLocation,useParams } from "react-router-dom";

import "./header.scss";

import logo from "./../../assets/logo.png";

import * as Config from "./../../constants/Config";
import MovieSearch from "../movie-search/MovieSearch";


const headerNav = [
  {
    display: "Home",
    path: `${Config.HOME_PAGE}`,
  },
   {
    display: "Movies",
    path: `/movie`,
  },
  {
    display: "TV Series",
    path: `/tv`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
 console.log(pathname);
 console.log(useLocation());
 console.log(useParams());

 
 
 

  
 
   
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to={`${Config.HOME_PAGE}`}>{Config.SITE_NAME}</Link>
        </div>
        <div>
          <MovieSearch category={'movie'} />
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
