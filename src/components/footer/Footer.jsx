import React from "react";

import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "./../../assets/footer-bg.jpg";
import logo from "./../../assets/logo.png";

import * as Config from "./../../constants/Config";

const Footer2 = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to={`/${Config.HOME_PAGE}`}>{Config.SITE_NAME}</Link>
          </div>
        </div>

        {/* <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to={`/${Config.HOME_PAGE}`}>Home</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Contact us</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Term of service</Link>
            <Link to={`/${Config.HOME_PAGE}`}>About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to={`/${Config.HOME_PAGE}`}>Live</Link>
            <Link to={`/${Config.HOME_PAGE}`}>FAQ</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Premium</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Privacy policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to={`/${Config.HOME_PAGE}`}>You must watch</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Recent release</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Top IMDB</Link>
          </div>
        </div> */}
      </div>
    </div>
  );  // ...existing code...
  // import React from "react";
  // import "./Footer.scss";
  
 
}
 
 const Footer = () => {
    return (
      <footer className="site-footer" style={{ backgroundImage: `url(${bg})` }}>
        <div className="site-footer__inner container">
          <div className="site-footer__brand">
              <div className="footer__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to={`/${Config.HOME_PAGE}`}>{Config.SITE_NAME}</Link>
          </div>
        </div>
            <div className="site-footer__copyright">© {new Date().getFullYear()} MovieBook. All rights reserved.</div>
          </div>
  
          <div className="site-footer__dev">
            <div className="site-footer__devline">
              Developed by{" "}
              <a
                className="site-footer__devlink"
                href="https://github.com/pavel-dev-bd"
                target="_blank"
                rel="noreferrer"
              >
                Md Pavel Miah
              </a>
            </div>
            <div className="site-footer__contacts">
              <a className="site-footer__contact" href="mailto:pavel.dev.bd@gmail.com">pavel.dev.bd@gmail.com</a>
              <a className="site-footer__contact" href="https://github.com/pavel-dev-bd" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
export default Footer;
