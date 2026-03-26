import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBuilding,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import {
  BottomBar,
  BottomBarInner,
  BottomBarLink,
  BottomBarLabel,
  BottomBarSpacer,
} from "./MobileBottomNav.styles";

const MobileBottomNav = () => {
  const location = useLocation();
  const isVisible =
    location.pathname === "/" ||
    location.pathname === "/projects" ||
    location.pathname === "/forinvestors" ||
    location.pathname.startsWith("/project/");

  if (!isVisible) {
    return null;
  }

  const items = [
    {
      label: "Home",
      to: "/",
      icon: faHouse,
      active: location.pathname === "/",
    },
    {
      label: "Projects",
      to: "/projects",
      icon: faBuilding,
      active:
        location.pathname === "/projects" ||
        location.pathname.startsWith("/project/"),
    },
    {
      label: "Investors",
      to: "/forinvestors",
      icon: faChartLine,
      active: location.pathname === "/forinvestors",
    },
  ];

  return (
    <>
      <BottomBarSpacer />
      <BottomBar>
        <BottomBarInner>
          {items.map((item) => (
            <BottomBarLink
              key={item.to}
              as={Link}
              to={item.to}
              $active={item.active}
            >
              <FontAwesomeIcon icon={item.icon} />
              <BottomBarLabel>{item.label}</BottomBarLabel>
            </BottomBarLink>
          ))}
        </BottomBarInner>
      </BottomBar>
    </>
  );
};

export default MobileBottomNav;
