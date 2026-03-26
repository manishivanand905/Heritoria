import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  HeaderContainer,
  HeaderWrapper,
  LogoSection,
  LogoIcon,
  LogoText,
  LogoTitle,
  LogoSubtitle,
  Navigation,
  NavLinks,
  NavLink,
  ActionButtons,
  CallButton,
  WhatsAppButton,
} from "./Header.styles";

const Header = ({ transparent = false }) => {
  const location = useLocation();
  const isTransparent = transparent && location.pathname === "/";

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;

    if (
      path === "/projects" &&
      (location.pathname === "/projects" ||
        location.pathname.startsWith("/project/"))
    ) {
      return true;
    }

    if (path === "/forinvestors" && location.pathname === "/forinvestors") {
      return true;
    }

    return false;
  };

  return (
    <HeaderContainer $transparent={isTransparent}>
      <HeaderWrapper>
        <LogoSection as={Link} to="/">
          <LogoIcon $transparent={isTransparent}>H</LogoIcon>
          <LogoText>
            <LogoTitle $transparent={isTransparent}>Heritoria</LogoTitle>
            <LogoSubtitle $transparent={isTransparent}>
              Heritage Projects • Hyderabad
            </LogoSubtitle>
          </LogoText>
        </LogoSection>

        <Navigation>
          <NavLinks>
            <NavLink
              as={Link}
              to="/"
              $isActive={isActive("/")}
              $transparent={isTransparent}
            >
              Home
            </NavLink>
            <NavLink
              as={Link}
              to="/projects"
              $isActive={isActive("/projects")}
              $transparent={isTransparent}
            >
              Projects
            </NavLink>
            <NavLink
              as={Link}
              to="/forinvestors"
              $isActive={isActive("/forinvestors")}
              $transparent={isTransparent}
            >
              For Investors
            </NavLink>
          </NavLinks>
        </Navigation>

        <ActionButtons>
          <CallButton $transparent={isTransparent}>
            <FontAwesomeIcon icon={faPhone} />
            <span>Call Us</span>
          </CallButton>
          <WhatsAppButton $transparent={isTransparent}>
            <FontAwesomeIcon icon={faWhatsapp} />
            <span>WhatsApp</span>
          </WhatsAppButton>
        </ActionButtons>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
