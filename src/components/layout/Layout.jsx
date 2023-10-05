import React, { useEffect } from "react";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Dashboard from "../../pages/Dashboard";
import Customers from "../../pages/Customers";
import Products from "../../pages/Products";
import Authentication from "../../pages/Authentication";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../../redux/actions/ThemeAction";
import { Text } from "@chakra-ui/react";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode") || "theme-mode-light";
    const colorClass = localStorage.getItem("colorMode") || "theme-mode-light";

    dispatch(ThemeAction.setMode(themeClass));
    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
        <Sidebar />
        <div className="layout__content">
          <TopNav />
          <Routes>
            <Route
              path="/"
              element={
                <Outlet>
                  <Text>Text</Text>
                </Outlet>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/authentication" element={<Authentication />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
