import styled, { css, keyframes } from "styled-components";

// ─── DESKTOP ANIMATIONS (unchanged) ──────────────────────────────────────────
const projectCardWinkIn = keyframes`
  0% { opacity:0; transform:perspective(1400px) scaleY(0.08) scaleX(0.97) rotateX(8deg); clip-path:inset(50% 0 50% 0 round 20px); filter:blur(14px); }
  62% { opacity:1; transform:perspective(1400px) scaleY(1.03) scaleX(1) rotateX(0deg); clip-path:inset(0 0 0 0 round 20px); filter:blur(2px); }
  100% { opacity:1; transform:perspective(1400px) scaleY(1) scaleX(1) rotateX(0deg); clip-path:inset(0 0 0 0 round 20px); filter:blur(0); }
`;
const projectCardWinkOut = keyframes`
  0% { opacity:1; transform:perspective(1400px) scaleY(1) scaleX(1) rotateX(0deg); clip-path:inset(0 0 0 0 round 20px); filter:blur(0); }
  100% { opacity:0; transform:perspective(1400px) scaleY(0.08) scaleX(0.98) rotateX(-8deg); clip-path:inset(50% 0 50% 0 round 20px); filter:blur(12px); }
`;
const projectImageReveal = keyframes`
  0% { transform:scale(1.12); filter:saturate(0.82) brightness(0.88); }
  100% { transform:scale(1); filter:saturate(1) brightness(1); }
`;
const projectContentReveal = keyframes`
  0% { opacity:0; transform:translate3d(0,18px,0); filter:blur(10px); }
  100% { opacity:1; transform:translate3d(0,0,0); filter:blur(0); }
`;
const projectBadgeReveal = keyframes`
  0% { opacity:0; transform:translate3d(0,-10px,0) scale(0.92); filter:blur(8px); }
  100% { opacity:1; transform:translate3d(0,0,0) scale(1); filter:blur(0); }
`;
const showcaseGlowFloat = keyframes`
  0%,100% { transform:translate3d(0,0,0) scale(1); }
  50% { transform:translate3d(0,-14px,0) scale(1.05); }
`;

// ─── MOBILE-ONLY ANIMATIONS ───────────────────────────────────────────────────
const mobileCardReveal = keyframes`
  0% { opacity:0; transform:translateY(44px) scale(0.91); filter:blur(8px); }
  70% { filter:blur(0); }
  100% { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
`;
const mobileFadeSlideUp = keyframes`
  0% { opacity:0; transform:translateY(22px); }
  100% { opacity:1; transform:translateY(0); }
`;
const mobileSheen = keyframes`
  0% { left:-100%; }
  100% { left:200%; }
`;
const mobileBtnSheen = keyframes`
  0% { left:-100%; }
  100% { left:200%; }
`;
const mobilePulseRing = keyframes`
  0% { box-shadow:0 0 0 0 rgba(212,168,67,0.45); }
  70% { box-shadow:0 0 0 10px rgba(212,168,67,0); }
  100% { box-shadow:0 0 0 0 rgba(212,168,67,0); }
`;
const mobileGlowPulse = keyframes`
  0%,100% { opacity:0.6; transform:scale(1); }
  50% { opacity:1; transform:scale(1.15); }
`;
const mobileLivePulse = keyframes`
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.55; transform:scale(0.78); }
`;

// ─── HERO CONTAINER ───────────────────────────────────────────────────────────
export const HeroContainer = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background:
    linear-gradient(115deg,
      rgba(10,22,34,0.84) 0%,
      rgba(11,54,63,0.66) 42%,
      rgba(212,148,13,0.24) 100%
    ),
    ${({ $backgroundImage }) =>
      $backgroundImage
        ? `url(${$backgroundImage}) center/cover no-repeat`
        : "linear-gradient(135deg,#f5f7fa 0%,#e8ecf1 100%)"};
  padding: ${({ $offsetForHeader }) => ($offsetForHeader ? "168px 20px 84px" : "84px 20px")};
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 36%),
      radial-gradient(circle at bottom left, rgba(13,125,110,0.2), transparent 38%);
    pointer-events: none;
  }

  /* ── MOBILE ──────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    padding: 0;
    min-height: 100svh;
    display: flex;
    align-items: flex-end;

    /* Deep dark luxury gradient — overlays the background image */
    background:
      linear-gradient(175deg,
        rgba(5,13,20,0.45) 0%,
        rgba(5,13,20,0.20) 18%,
        rgba(5,13,20,0.65) 52%,
        rgba(5,13,20,0.97) 76%,
        rgba(5,13,20,1) 100%
      ),
      ${({ $backgroundImage }) =>
        $backgroundImage
          ? `url(${$backgroundImage}) center 28%/cover no-repeat`
          : "linear-gradient(135deg,#050d14 0%,#0a1e30 100%)"};

    /* Gold ambient glow (top) */
    &::before {
      background:
        radial-gradient(circle at 55% 8%, rgba(212,168,67,0.18) 0%, transparent 42%),
        radial-gradient(circle at 85% 60%, rgba(14,144,128,0.14) 0%, transparent 38%);
    }

    /* Animated horizontal gold line – scan effect */
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, rgba(212,168,67,0.5), transparent);
      animation: ${css`
        @keyframes mobileScan {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        mobileScan 9s linear infinite
      `};
      pointer-events: none;
      z-index: 5;
    }
  }
`;

// ─── CONTENT WRAPPER ─────────────────────────────────────────────────────────
export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1024px) { gap: 60px; }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100svh;
    padding-bottom: max(env(safe-area-inset-bottom, 16px), 16px);
  }
`;

// ─── LEFT SECTION ─────────────────────────────────────────────────────────────
export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 60px;

  @media (max-width: 1024px) { padding-left: 40px; }

  @media (max-width: 768px) {
    order: 2;
    gap: 16px;
    padding: 10px 20px 0;
    animation: ${mobileFadeSlideUp} 0.75s cubic-bezier(0.22,1,0.36,1) 0.15s both;
  }
`;

// ─── RIGHT SECTION ────────────────────────────────────────────────────────────
export const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-top: 40px;
    padding-bottom: 5px;
  }
`;

// ─── BADGE WRAPPER ────────────────────────────────────────────────────────────
export const BadgeWrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    animation: ${mobileFadeSlideUp} 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both;
  }
`;

// ─── BADGE ────────────────────────────────────────────────────────────────────
export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,248,230,0.92);
  border: 1px solid rgba(255,214,102,0.88);
  box-shadow: 0 16px 32px rgba(6,18,28,0.16);
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #d4930d;

  svg { color: #d4930d; font-size: 16px; }

  @media (max-width: 768px) {
    gap: 8px;
    font-size: 11.5px;
    padding: 6px 14px 6px 10px;
    /* Glass gold style */
    background: rgba(212,168,67,0.10);
    border: 1px solid rgba(212,168,67,0.30);
    box-shadow: none;
    color: #f5d98a;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
    animation: ${mobilePulseRing} 2.5s ease-out 1.8s 2;

    svg { color: #f5d98a; font-size: 12px; }

    /* Sheen sweep */
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 55%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      animation: ${mobileSheen} 3.2s ease-in-out 2.5s infinite;
    }
  }
`;

// ─── MAIN HEADING ─────────────────────────────────────────────────────────────
export const MainHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) { gap: 1px; }
`;

// ─── HEADING PRIMARY ──────────────────────────────────────────────────────────
export const HeadingPrimary = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 12px 30px rgba(5,10,15,0.28);
  line-height: 1.1;
  margin: 0;
  font-family: "Georgia", serif;

  @media (max-width: 1024px) { font-size: 48px; }

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 1.06;
    letter-spacing: -0.4px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }

  @media (max-width: 380px) { font-size: 28px; }
`;

// ─── HEADING SECONDARY ───────────────────────────────────────────────────────
export const HeadingSecondary = styled.h2`
  font-size: 56px;
  font-weight: 700;
  color: #f5d48a;
  text-shadow: 0 12px 30px rgba(5,10,15,0.22);
  line-height: 1.1;
  margin: 0;
  font-family: "Georgia", serif;

  @media (max-width: 1024px) { font-size: 48px; }

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 1.06;
    letter-spacing: -0.4px;
    /* Subtle gold text glow */
    text-shadow: 0 0 40px rgba(212,168,67,0.35), 0 4px 20px rgba(0,0,0,0.5);
  }

  @media (max-width: 380px) { font-size: 28px; }
`;

// ─── DESCRIPTION ─────────────────────────────────────────────────────────────
export const Description = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: rgba(245,247,250,0.92);
  margin: 0;
  max-width: 580px;
  text-shadow: 0 8px 22px rgba(4,9,14,0.24);

  strong { color: #ffffff; font-weight: 600; }

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.55;
    color: rgba(195,215,228,0.68);
    max-width: 100%;
    text-shadow: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    strong { color: rgba(245,218,138,0.85); font-weight: 400; }
  }
`;

// ─── STATS CONTAINER ─────────────────────────────────────────────────────────
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 40px;
  margin-top: 8px;

  @media (max-width: 768px) {
    gap: 0;
    margin-top: 0;
    display: flex;
    align-items: stretch;
    background: rgba(255,255,255,0.045);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    animation: ${mobileFadeSlideUp} 0.75s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }
`;

// ─── STAT ITEM ────────────────────────────────────────────────────────────────
export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 13px 8px;
    position: relative;
    gap: 3px;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 18%;
      height: 64%;
      width: 1px;
      background: rgba(255,255,255,0.08);
    }
  }
`;

// ─── STAT VALUE ───────────────────────────────────────────────────────────────
export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 8px 20px rgba(4,9,14,0.28);
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
    color: #f5d98a;
    text-shadow: 0 0 20px rgba(212,168,67,0.3);
    font-family: "Georgia", serif;
    font-weight: 600;
    display: block;
  }
`;

// ─── STAT LABEL ───────────────────────────────────────────────────────────────
export const StatLabel = styled.div`
  font-size: 15px;
  color: rgba(234,240,245,0.82);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 9.5px;
    color: rgba(180,205,220,0.5);
    line-height: 1.3;
    display: block;
  }
`;

// ─── BUTTON CONTAINER ─────────────────────────────────────────────────────────
export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 14px;
    margin: 12px 0 28px;
    width: 100%;
    animation: ${mobileFadeSlideUp} 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s both;
  }
`;

// ─── EXPLORE BUTTON ───────────────────────────────────────────────────────────
export const ExploreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg,#0d7d6e 0%,#14a38f 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 13px 26px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: Playfair Display, serif;

  svg { font-size: 14px; transition: transform 0.3s ease; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(13,125,110,0.34);
    svg { transform: translateX(4px); }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
    font-family: Playfair Display, serif;
    border-radius: 16px;
    background: linear-gradient(135deg, #0d7d6e 0%, #16a085 100%);
    box-shadow: 0 8px 24px rgba(13, 125, 110, 0.4);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
      pointer-events: none;
    }

    /* Animated sweep */
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      animation: ${mobileBtnSheen} 2.8s ease-in-out 2.2s infinite;
    }

    svg { 
      font-size: 15px; 
      margin-left: 4px;
    }

    &:active { 
      transform: scale(0.98); 
      box-shadow: 0 4px 12px rgba(13, 125, 110, 0.3); 
    }
  }
`;

// ─── WHATSAPP BUTTON ──────────────────────────────────────────────────────────
export const WhatsAppButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.95);
  color: #0d7d6e;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  svg { font-size: 20px; color: #25d366; }

  &:hover {
    background: #ffffff;
    border-color: rgba(13,125,110,0.5);
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(6,18,28,0.16);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 15px 24px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 16px;
    background: #25d366;
    border: none;
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);

    svg { 
      font-size: 20px; 
      color: #ffffff; 
      margin-right: 2px;
    }

    &:active { 
      transform: scale(0.98); 
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
    }
  }
`;

// ─── PROJECT CARD STAGE ───────────────────────────────────────────────────────
export const ProjectCardStage = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  isolation: isolate;

  &::before, &::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
    z-index: 0;
    animation: ${showcaseGlowFloat} 8s ease-in-out infinite;
  }
  &::before {
    top: 18px; right: -32px;
    width: 180px; height: 180px;
    background: radial-gradient(circle,rgba(245,212,138,0.34) 0%,rgba(245,212,138,0) 72%);
    filter: blur(10px);
  }
  &::after {
    bottom: 22px; left: -28px;
    width: 160px; height: 160px;
    background: radial-gradient(circle,rgba(20,163,143,0.24) 0%,rgba(20,163,143,0) 74%);
    filter: blur(12px);
    animation-delay: -4s;
  }

  @media (max-width: 768px) {
    max-width: 280px;
    margin: 0 auto;
    &::before, &::after { display: none; }
  }
`;

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
export const ProjectCard = styled.button`
  appearance: none;
  border: none;
  padding: 0;
  text-align: left;
  background: linear-gradient(180deg,rgba(255,255,255,0.98) 0%,rgba(244,249,248,0.98) 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 28px 70px rgba(1,12,19,0.22), 0 10px 24px rgba(255,255,255,0.18);
  width: 100%;
  transition: transform 0.45s ease, box-shadow 0.45s ease;
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
      linear-gradient(135deg,rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 34%),
      linear-gradient(180deg,rgba(13,125,110,0.04) 0%,rgba(13,125,110,0) 42%);
    pointer-events: none;
    z-index: 0;
  }
  > * { position: relative; z-index: 1; }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 34px 86px rgba(1,12,19,0.26), 0 14px 28px rgba(255,255,255,0.24);
  }
  &:focus-visible { outline: 3px solid rgba(13,125,110,0.38); outline-offset: 4px; }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 20px;
    background: rgba(10,26,40,0.88);
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow:
      0 16px 40px rgba(0,0,0,0.45),
      0 0 0 1px rgba(212,168,67,0.08) inset;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    /* Override the light-mode pseudo */
    &::before {
      background: linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 35%);
    }

    /* Gold shimmer on hover */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: linear-gradient(135deg,rgba(212,168,67,0.12),transparent 50%,rgba(14,144,128,0.08));
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 0;
    }
    &:hover::after { opacity: 1; }
    &:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,67,0.2) inset; }
    &:active { transform: scale(0.96) !important; }
  }
`;

// ─── ANIMATED PROJECT CARD ────────────────────────────────────────────────────
export const AnimatedProjectCard = styled(ProjectCard)`
  position: ${({ $animationState }) => ($animationState === "exit" ? "absolute" : "relative")};
  inset: ${({ $animationState }) => ($animationState === "exit" ? "0" : "auto")};
  z-index: ${({ $animationState }) => ($animationState === "exit" ? 1 : 2)};
  pointer-events: ${({ $animationState }) => ($animationState === "exit" ? "none" : "auto")};

  ${({ $animationState }) =>
    $animationState === "enter" && css`animation: ${projectCardWinkIn} 1.2s ease-out both;`}
  ${({ $animationState }) =>
    $animationState === "exit" && css`animation: ${projectCardWinkOut} 1.2s ease-out both;`}

  /* Restoring desktop animations to mobile naturally */

`;

// ─── PROJECT IMAGE ────────────────────────────────────────────────────────────
export const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transform-origin: center;
    will-change: transform, filter;
    transition: transform 6s ease;
  }

  ${AnimatedProjectCard}[data-state="enter"] & img {
    animation: ${projectImageReveal} 1.8s ease both;
  }

  /* Hover zoom on desktop */
  ${ProjectCard}:hover & img { transform: scale(1.05); }

  @media (max-width: 768px) {
    height: 125px;

    /* Bottom fade to card body */
    &::after {
      content: "";
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 50%;
      background: linear-gradient(180deg,transparent,rgba(10,26,40,0.95));
      pointer-events: none;
    }

    img { transition: transform 8s ease; }
    ${ProjectCard}:hover & img { transform: scale(1.07); }
  }
`;

// ─── QUALITY BADGE ────────────────────────────────────────────────────────────
export const QualityBadge = styled.div`
  position: absolute;
  top: 20px; right: 20px;
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  display: flex; align-items: center; gap: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);

  svg { font-size: 18px; color: #0d7d6e; }

  ${AnimatedProjectCard}[data-state="enter"] & {
    animation: ${projectBadgeReveal} 0.9s ease-out 0.26s both;
  }

  div {
    display: flex; flex-direction: column; gap: 0; line-height: 1.2;
    div:first-child { font-size: 11px; color: #666; font-weight: 500; }
    div:last-child { font-size: 12px; color: #1a1a1a; font-weight: 700; }
  }

  @media (max-width: 768px) {
    /* Replaced by inline live-dot + status chip in mobile redesign */
    top: 9px; right: 9px;
    padding: 4px 8px;
    border-radius: 8px;
    gap: 5px;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);

    svg { font-size: 13px; }
    div {
      div:first-child { font-size: 9px; }
      div:last-child { font-size: 10px; }
    }
  }
`;

// ─── PROJECT INFO ─────────────────────────────────────────────────────────────
export const ProjectInfo = styled.div`
  padding: 20px 22px 18px;
  display: flex; flex-direction: column; gap: 7px;

  > * { will-change: transform, opacity, filter; }

  ${AnimatedProjectCard}[data-state="enter"] & > * {
    opacity: 0;
    animation: ${projectContentReveal} 0.82s ease-out forwards;
  }
  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(1) { animation-delay: 0.18s; }
  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(2) { animation-delay: 0.28s; }
  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(3) { animation-delay: 0.38s; }
  ${AnimatedProjectCard}[data-state="enter"] & > *:nth-child(4) { animation-delay: 0.48s; }

  @media (max-width: 768px) {
    padding: 10px 12px 12px;
    gap: 5px;
  }
`;

// ─── PROJECT HEADER ROW ───────────────────────────────────────────────────────
export const ProjectHeaderRow = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
`;

// ─── PROJECT CONTENT ROW ──────────────────────────────────────────────────────
export const ProjectContentRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0,1fr) auto;
  gap: 16px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

// ─── PROJECT TEXT CONTENT ─────────────────────────────────────────────────────
export const ProjectTextContent = styled.div`
  display: flex; flex-direction: column; gap: 6px; min-width: 0;

  @media (max-width: 768px) { gap: 2px; }
`;

// ─── PROJECT LABEL ────────────────────────────────────────────────────────────
export const ProjectLabel = styled.div`
  font-size: 10px; color: #888;
  font-weight: 500; text-transform: uppercase;
  letter-spacing: 0.5px; line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 9px;
    color: rgba(180,200,215,0.5);
    letter-spacing: 0.7px;
  }
`;

// ─── PROJECT TITLE ────────────────────────────────────────────────────────────
export const ProjectTitle = styled.h3`
  font-size: 22px; font-weight: 700; color: #1a1a1a;
  margin: 0; line-height: 1.15; font-family: "Georgia", serif;

  @media (max-width: 768px) {
    font-size: 15px;
    color: #ffffff;
    line-height: 1.2;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
`;

// ─── PROJECT BUILDER ──────────────────────────────────────────────────────────
export const ProjectBuilder = styled.div`
  font-size: 14px; color: #3b4952; font-weight: 600; line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 10.5px;
    color: rgba(200,220,230,0.55);
    font-weight: 400;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
`;

// ─── PROJECT LOCATION ─────────────────────────────────────────────────────────
export const ProjectLocation = styled.div`
  font-size: 12px; color: #666; line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 10px;
    color: rgba(160,190,210,0.5);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
`;

// ─── BENEFIT BOX ─────────────────────────────────────────────────────────────
export const BenefitBox = styled.div`
  background: #e6f7f4;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex; align-items: center; gap: 12px;
  align-self: start; min-width: 176px;

  @media (max-width: 768px) {
    padding: 6px 9px;
    gap: 7px;
    min-width: 0;
    border-radius: 10px;
    background: linear-gradient(135deg,rgba(14,144,128,0.2),rgba(14,144,128,0.08));
    border: 1px solid rgba(14,144,128,0.3);
  }
`;

// ─── BENEFIT ICON ─────────────────────────────────────────────────────────────
export const BenefitIcon = styled.div`
  width: 32px; height: 32px;
  background: white; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;

  svg { font-size: 14px; color: #0d7d6e; }

  @media (max-width: 768px) {
    width: 24px; height: 24px;
    background: linear-gradient(135deg,#0e9080,#0a6a5e);
    box-shadow: 0 2px 8px rgba(14,144,128,0.4);

    svg { font-size: 11px; color: white; }
  }
`;

// ─── BENEFIT LABEL ────────────────────────────────────────────────────────────
export const BenefitLabel = styled.div`
  font-size: 10px; color: #0d7d6e; font-weight: 600; line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 8.5px;
    color: rgba(130,220,200,0.7);
    font-weight: 400;
  }
`;

// ─── BENEFIT AMOUNT ───────────────────────────────────────────────────────────
export const BenefitAmount = styled.div`
  font-size: 16px; font-weight: 700; color: #0d7d6e; line-height: 1.15;

  @media (max-width: 768px) {
    font-size: 12px;
    font-weight: 600;
    color: #7EECD8;
  }
`;