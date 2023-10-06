import React from "react";
import "./topnav.css";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import ThemeMenu from "../thememenu/ThemeMenu";
import notifications from "../../assets/JsonData/notification.json";
import user_image from "../../assets/images/junior.jpg";
import user_menu from "../../assets/JsonData/user_menus.json";
import { useSelector } from "react-redux";

const curr_user = {
  display_name: "Jason Bourne",
  image: user_image,
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    {/* <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div> */}
    <div
      className="topnav__right-user__image"
      style={{
        backgroundImage: `url(${user.image})`,
        width: "70px", // Adjust the width and height as needed
        height: "70px",
      }}
    ></div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.userData);
  let curr_user;
  if (isLoggedIn) {
    curr_user = {
      display_name: userData.displayName || userData.email,
      image: userData.photoURL,
    };
  } else {
    curr_user = {
      display_name: "Anonymous",
      image: user_image,
    };
  }

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input
          type="text"
          placeholder="Search here..."
        />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">See all</Link>}
          />
          {/* dropdown here */}
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
