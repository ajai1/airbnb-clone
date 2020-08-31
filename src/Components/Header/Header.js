import React from "react";
import "./Header.css";
import airbnbLogo from "../../images/airbnb-logo.png";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <div className="header">
      <Link to="/">
        <img className="header__icon" src={airbnbLogo} alt="Logo" />
      </Link>
      <div className="header__center">
        <input
          type="text"
          onChange={(e) =>
            history.push({
              pathname: "/search",
              state: {
                location: e.target.value,
                startDate: null,
                endDate: null,
                guests: null,
              },
            })
          }
        />
        <SearchIcon />
      </div>
      <div className="header__right">
        <Link to="/host" style={{ textDecoration: "none" }}>
          <p>Become a host</p>
        </Link>
        <LanguageIcon />
        <ExpandMoreIcon />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
