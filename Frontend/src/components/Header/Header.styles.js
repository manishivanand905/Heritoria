import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  background: ${({ $transparent }) =>
    $transparent ? "transparent" : "#f8f9fa"};
  border-bottom: ${({ $transparent }) =>
    $transparent ? "none" : "1px solid #e9ecef"};
  position: ${({ $transparent }) => ($transparent ? "absolute" : "sticky")};
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 16px 20px;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;

export const HeaderWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    flex: 1;
    gap: 10px;
    min-width: 0;
  }
`;

export const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ $transparent }) =>
    $transparent
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 100%)"
      : "#0d7d6e"};
  border: ${({ $transparent }) =>
    $transparent ? "1px solid rgba(255, 255, 255, 0.24)" : "none"};
  backdrop-filter: ${({ $transparent }) => ($transparent ? "blur(10px)" : "none")};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    font-size: 22px;
    border-radius: 10px;
  }
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const LogoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $transparent }) => ($transparent ? "#ffffff" : "#1a1a1a")};
  text-shadow: ${({ $transparent }) =>
    $transparent ? "0 10px 24px rgba(0, 0, 0, 0.26)" : "none"};
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LogoSubtitle = styled.div`
  font-size: 13px;
  color: ${({ $transparent }) =>
    $transparent ? "rgba(244, 246, 248, 0.82)" : "#6c757d"};
  text-shadow: ${({ $transparent }) =>
    $transparent ? "0 8px 20px rgba(0, 0, 0, 0.22)" : "none"};
  line-height: 1.2;

  @media (max-width: 768px) {
    display: block;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Navigation = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    justify-content: flex-start;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 32px;
  }

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const NavLink = styled.a`
  font-size: 16px;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  color: ${({ $transparent, $isActive }) => {
    if ($transparent && $isActive) return "#f5d48a";
    if ($transparent) return "rgba(255, 255, 255, 0.92)";
    return $isActive ? "#0d7d6e" : "#495057";
  }};
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  text-shadow: ${({ $transparent }) =>
    $transparent ? "0 8px 20px rgba(0, 0, 0, 0.24)" : "none"};

  &:hover {
    color: ${({ $transparent }) => ($transparent ? "#f5d48a" : "#0d7d6e")};
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 1024px) {
    margin-left: auto;
  }

  @media (max-width: 480px) {
    width: auto;
  }
`;

export const CallButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${({ $transparent }) =>
    $transparent ? "rgba(255, 255, 255, 0.92)" : "#495057"};
  border: ${({ $transparent }) =>
    $transparent ? "1px solid rgba(255, 255, 255, 0.22)" : "none"};
  backdrop-filter: ${({ $transparent }) => ($transparent ? "blur(8px)" : "none")};
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;

  svg {
    font-size: 16px;
  }

  &:hover {
    background: ${({ $transparent }) =>
      $transparent ? "rgba(255, 255, 255, 0.12)" : "#e9ecef"};
    color: ${({ $transparent }) => ($transparent ? "#ffffff" : "#1a1a1a")};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;

    svg {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }

    padding: 10px 14px;
  }
`;

export const WhatsAppButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ $transparent }) =>
    $transparent
      ? "linear-gradient(135deg, rgba(37, 211, 102, 0.92) 0%, rgba(22, 185, 85, 0.92) 100%)"
      : "#25d366"};
  color: white;
  border: ${({ $transparent }) =>
    $transparent ? "1px solid rgba(255, 255, 255, 0.18)" : "none"};
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: ${({ $transparent }) =>
      $transparent
        ? "linear-gradient(135deg, rgba(37, 211, 102, 1) 0%, rgba(22, 185, 85, 1) 100%)"
        : "#20ba5a"};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;

    svg {
      font-size: 17px;
    }
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }

    padding: 10px 14px;
  }
`;
