import styled, { css, keyframes } from "styled-components";

const projectCardWinkIn = keyframes`
  0% {
    opacity: 0;
    transform: perspective(1400px) scaleY(0.08) scaleX(0.97) rotateX(8deg);
    clip-path: inset(50% 0 50% 0 round 20px);
    filter: blur(14px);
  }

  62% {
    opacity: 1;
    transform: perspective(1400px) scaleY(1.03) scaleX(1) rotateX(0deg);
    clip-path: inset(0 0 0 0 round 20px);
    filter: blur(2px);
  }

  100% {
    opacity: 1;
    transform: perspective(1400px) scaleY(1) scaleX(1) rotateX(0deg);
    clip-path: inset(0 0 0 0 round 20px);
    filter: blur(0);
  }
`;

const projectCardWinkOut = keyframes`
  0% {
    opacity: 1;
    transform: perspective(1400px) scaleY(1) scaleX(1) rotateX(0deg);
    clip-path: inset(0 0 0 0 round 20px);
    filter: blur(0);
  }

  100% {
    opacity: 0;
    transform: perspective(1400px) scaleY(0.08) scaleX(0.98) rotateX(-8deg);
    clip-path: inset(50% 0 50% 0 round 20px);
    filter: blur(12px);
  }
`;

const projectImageReveal = keyframes`
  0% {
    transform: scale(1.12);
    filter: saturate(0.82) brightness(0.88);
  }

  100% {
    transform: scale(1);
    filter: saturate(1) brightness(1);
  }
`;

const projectContentReveal = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    filter: blur(10px);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
`;

const projectBadgeReveal = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -10px, 0) scale(0.92);
    filter: blur(8px);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
`;

const showcaseGlowFloat = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -14px, 0) scale(1.05);
  }
`;

export const HeroContainer = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background:
    linear-gradient(
      115deg,
      rgba(10, 22, 34, 0.84) 0%,
      rgba(11, 54, 63, 0.66) 42%,
      rgba(212, 148, 13, 0.24) 100%
    ),
    ${({ $backgroundImage }) =>
      $backgroundImage
        ? `url(${$backgroundImage}) center/cover no-repeat`
        : "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)"};
  padding: ${({ $offsetForHeader }) =>
    $offsetForHeader ? "168px 20px 84px" : "84px 20px"};
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at top right,
        rgba(255, 255, 255, 0.18),
        transparent 36%
      ),
      radial-gradient(
        circle at bottom left,
        rgba(13, 125, 110, 0.2),
        transparent 38%
      );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${({ $offsetForHeader }) =>
      $offsetForHeader ? "310px 16px 100px" : "56px 16px"};
    min-height: auto;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 60px;

  @media (max-width: 1024px) {
    padding-left: 40px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    padding-left: 0;
  }
`;

export const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 248, 230, 0.92);
  border: 1px solid rgba(255, 214, 102, 0.88);
  box-shadow: 0 16px 32px rgba(6, 18, 28, 0.16);
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #d4930d;

  svg {
    color: #d4930d;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    gap: 6px;
    font-size: 12px;
    padding: 6px 12px;

    svg {
      font-size: 13px;
    }
  }
`;

export const MainHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeadingPrimary = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 12px 30px rgba(5, 10, 15, 0.28);
  line-height: 1.1;
  margin: 0;
  font-family: "Georgia", serif;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const HeadingSecondary = styled.h2`
  font-size: 56px;
  font-weight: 700;
  color: #f5d48a;
  text-shadow: 0 12px 30px rgba(5, 10, 15, 0.22);
  line-height: 1.1;
  margin: 0;
  font-family: "Georgia", serif;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Description = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: rgba(245, 247, 250, 0.92);
  margin: 0;
  max-width: 580px;
  text-shadow: 0 8px 22px rgba(4, 9, 14, 0.24);

  strong {
    color: #ffffff;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.55;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 8px;

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    align-items: start;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 480px) {
    text-align: center;
    gap: 3px;
  }
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 8px 20px rgba(4, 9, 14, 0.28);
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const StatLabel = styled.div`
  font-size: 15px;
  color: rgba(234, 240, 245, 0.82);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 1.3;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ExploreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #0d7d6e 0%, #14a38f 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 13px 26px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family:
    Playfair Display,
    serif;

  svg {
    font-size: 14px;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(13, 125, 110, 0.34);

    svg {
      transform: translateX(4px);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 12px 22px;
    font-size: 14px;
  }
`;

export const WhatsAppButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #0d7d6e;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 20px;
    color: #25d366;
  }

  &:hover {
    background: #ffffff;
    border-color: rgba(13, 125, 110, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(6, 18, 28, 0.16);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 11px 20px;
    font-size: 14px;
  }
`;

export const ProjectCardStage = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  isolation: isolate;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
    z-index: 0;
    animation: ${showcaseGlowFloat} 8s ease-in-out infinite;
  }

  &::before {
    top: 18px;
    right: -32px;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(245, 212, 138, 0.34) 0%, rgba(245, 212, 138, 0) 72%);
    filter: blur(10px);
  }

  &::after {
    bottom: 22px;
    left: -28px;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, rgba(20, 163, 143, 0.24) 0%, rgba(20, 163, 143, 0) 74%);
    filter: blur(12px);
    animation-delay: -4s;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ProjectCard = styled.button`
  appearance: none;
  border: none;
  padding: 0;
  text-align: left;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 249, 248, 0.98) 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 28px 70px rgba(1, 12, 19, 0.22),
    0 10px 24px rgba(255, 255, 255, 0.18);
  width: 100%;
  transition:
    transform 0.45s ease,
    box-shadow 0.45s ease,
    border-color 0.45s ease;
  cursor: pointer;
  will-change: transform, opacity, filter;
  transform-origin: center center;
  backface-visibility: hidden;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 34%),
      linear-gradient(180deg, rgba(13, 125, 110, 0.04) 0%, rgba(13, 125, 110, 0) 42%);
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow:
      0 34px 86px rgba(1, 12, 19, 0.26),
      0 14px 28px rgba(255, 255, 255, 0.24);
  }

  &:focus-visible {
    outline: 3px solid rgba(13, 125, 110, 0.38);
    outline-offset: 4px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const AnimatedProjectCard = styled(ProjectCard)`
  position: ${({ $animationState }) =>
    $animationState === "exit" ? "absolute" : "relative"};
  inset: ${({ $animationState }) => ($animationState === "exit" ? "0" : "auto")};
  z-index: ${({ $animationState }) => ($animationState === "exit" ? 1 : 2)};
  pointer-events: ${({ $animationState }) =>
    $animationState === "exit" ? "none" : "auto"};

  ${({ $animationState }) =>
    $animationState === "enter" &&
    css`
      animation: ${projectCardWinkIn} 1.2s ease-out both;
    `}

  ${({ $animationState }) =>
    $animationState === "exit" &&
    css`
      animation: ${projectCardWinkOut} 1.2s ease-out both;
    `}
`;

export const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform-origin: center;
    will-change: transform, filter;
  }

  ${AnimatedProjectCard}[data-state="enter"] & img {
    animation: ${projectImageReveal} 1.8s ease both;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

export const QualityBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  svg {
    font-size: 18px;
    color: #0d7d6e;
  }

  ${AnimatedProjectCard}[data-state="enter"] & {
    animation: ${projectBadgeReveal} 0.9s ease-out 0.26s both;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0;
    line-height: 1.2;

    div:first-child {
      font-size: 11px;
      color: #666;
      font-weight: 500;
    }

    div:last-child {
      font-size: 12px;
      color: #1a1a1a;
      font-weight: 700;
    }
  }

  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    padding: 7px 10px;

    svg {
      font-size: 16px;
    }

    div {
      div:first-child {
        font-size: 10px;
      }

      div:last-child {
        font-size: 11px;
      }
    }
  }
`;

export const ProjectInfo = styled.div`
  padding: 20px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 7px;

  > * {
    will-change: transform, opacity, filter;
  }

  ${AnimatedProjectCard}[data-state="enter"] & > * {
    opacity: 0;
    animation: ${projectContentReveal} 0.82s ease-out forwards;
  }

  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(1) {
    animation-delay: 0.18s;
  }

  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(2) {
    animation-delay: 0.28s;
  }

  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(3) {
    animation-delay: 0.38s;
  }

  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(4) {
    animation-delay: 0.48s;
  }

  @media (max-width: 768px) {
    padding: 18px 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 18px 14px;
  }
`;

export const ProjectHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ProjectContentRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const ProjectLabel = styled.div`
  font-size: 10px;
  color: #888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.1;
`;

export const ProjectTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.15;
  font-family: "Georgia", serif;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ProjectBuilder = styled.div`
  font-size: 14px;
  color: #3b4952;
  font-weight: 600;
  line-height: 1.3;
`;

export const ProjectLocation = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const BenefitBox = styled.div`
  background: #e6f7f4;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: start;
  min-width: 176px;

  @media (max-width: 480px) {
    padding: 9px 10px;
    min-width: 0;
  }
`;

export const BenefitIcon = styled.div`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 14px;
    color: #0d7d6e;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;

    svg {
      font-size: 12px;
    }
  }
`;

export const BenefitLabel = styled.div`
  font-size: 10px;
  color: #0d7d6e;
  font-weight: 600;
  line-height: 1.1;
`;

export const BenefitAmount = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0d7d6e;
  line-height: 1.15;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
