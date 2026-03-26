import styled from "styled-components";

export const BottomBarSpacer = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    height: calc(82px + env(safe-area-inset-bottom, 0px));
  }
`;

export const BottomBar = styled.nav`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1100;
    padding: 10px 14px calc(10px + env(safe-area-inset-bottom, 0px));
    background: linear-gradient(
      180deg,
      rgba(247, 244, 236, 0.82) 0%,
      rgba(247, 244, 236, 0.96) 28%
    );
    backdrop-filter: blur(18px);
    border-top: 1px solid rgba(192, 175, 138, 0.24);
    box-shadow: 0 -14px 36px rgba(12, 26, 20, 0.12);
  }
`;

export const BottomBarInner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 640px;
  margin: 0 auto;
`;

export const BottomBarLink = styled.a`
  min-height: 62px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#0d7d6e" : "#5d675f")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, rgba(13, 125, 110, 0.14) 0%, rgba(13, 125, 110, 0.06) 100%)"
      : "rgba(255, 255, 255, 0.62)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(13, 125, 110, 0.22)" : "rgba(183, 170, 142, 0.18)"};
  box-shadow: ${({ $active }) =>
    $active ? "0 14px 24px rgba(13, 125, 110, 0.14)" : "none"};
  transition:
    transform 0.22s ease,
    background 0.22s ease,
    color 0.22s ease;

  svg {
    font-size: 18px;
  }

  &:active {
    transform: translateY(1px) scale(0.985);
  }
`;

export const BottomBarLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
`;
