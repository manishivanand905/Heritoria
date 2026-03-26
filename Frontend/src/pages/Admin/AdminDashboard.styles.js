import styled, { css } from "styled-components";

const buttonStyles = css`
  border: none;
  border-radius: 999px;
  padding: 14px 22px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const inputBase = css`
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(25, 118, 99, 0.14);
  background: rgba(255, 255, 255, 0.88);
  color: ${({ theme }) => theme.colors.textDark};
  padding: 13px 14px;
  outline: none;

  &::placeholder {
    color: rgba(103, 119, 126, 0.72);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(25, 118, 99, 0.08);
  }
`;

export const PageShell = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(236, 171, 19, 0.16), transparent 26%),
    radial-gradient(circle at bottom right, rgba(25, 118, 99, 0.16), transparent 32%),
    linear-gradient(180deg, #f8f5ef 0%, #f3eee4 48%, #f7f4ed 100%);
  color: ${({ theme }) => theme.colors.textDark};
  position: relative;
  overflow: hidden;
`;

export const BackgroundGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.5;
  }

  &::before {
    width: 280px;
    height: 280px;
    background: rgba(236, 171, 19, 0.12);
    top: -90px;
    right: 6%;
  }

  &::after {
    width: 320px;
    height: 320px;
    background: rgba(25, 118, 99, 0.12);
    bottom: -110px;
    left: -80px;
  }
`;

export const AdminContainer = styled.div`
  position: relative;
  z-index: 1;
  width: min(1440px, calc(100% - 48px));
  margin: 0 auto;
  padding: 40px 0 56px;

  ${({ theme }) => theme.media.md} {
    width: min(100%, calc(100% - 28px));
    padding-top: 24px;
  }
`;

export const HeroCard = styled.section`
  display: grid;
  grid-template-columns: 1.35fr 0.95fr;
  gap: 24px;
  padding: 34px;
  border: 1px solid rgba(25, 118, 99, 0.1);
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.68)),
    linear-gradient(135deg, rgba(236, 171, 19, 0.08), rgba(25, 118, 99, 0.08));
  box-shadow: 0 20px 50px rgba(40, 53, 61, 0.08);
  margin-bottom: 28px;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 1fr;
  }

  ${({ theme }) => theme.media.md} {
    padding: 24px;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: 999px;
  background: rgba(236, 171, 19, 0.12);
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-family: "Playfair Display", serif;
  font-size: clamp(2.4rem, 5vw, 4.4rem);
  line-height: 0.96;
  letter-spacing: -0.03em;
  max-width: 12ch;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const HeroText = styled.p`
  margin: 0;
  max-width: 62ch;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.8;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export const PrimaryButton = styled.button`
  ${buttonStyles};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 14px 30px rgba(25, 118, 99, 0.2);
`;

export const SecondaryButton = styled.button`
  ${buttonStyles};
  background: rgba(255, 255, 255, 0.84);
  color: ${({ theme }) => theme.colors.textDark};
  border: 1px solid rgba(25, 118, 99, 0.12);
  box-shadow: 0 10px 24px rgba(40, 53, 61, 0.06);
`;

export const HeroAside = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: start;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const HeroVisual = styled.div`
  grid-column: 1 / -1;
  position: relative;
  min-height: 240px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background:
    radial-gradient(circle at 18% 20%, rgba(236, 171, 19, 0.18), transparent 18%),
    radial-gradient(circle at 78% 18%, rgba(25, 118, 99, 0.18), transparent 20%),
    linear-gradient(180deg, rgba(236, 171, 19, 0.05) 0%, rgba(25, 118, 99, 0.08) 100%),
    linear-gradient(180deg, #f7f4ed 0%, #ece6d8 100%);
  box-shadow: inset 0 -40px 70px rgba(25, 118, 99, 0.06);
`;

export const VisualGlow = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  top: 16px;
  right: 26px;
  background: radial-gradient(circle, rgba(236, 171, 19, 0.3) 0%, rgba(236, 171, 19, 0.08) 45%, transparent 72%);
  filter: blur(8px);
  z-index: 0;
`;

export const VisualGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(25, 118, 99, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(25, 118, 99, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 28%);
  z-index: 1;
`;

export const Skyline = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 16px;
  perspective: 1200px;
  z-index: 2;
`;

export const BuildingStack = styled.div`
  position: relative;
  width: ${({ $width = 90 }) => `${$width}px`};
  height: ${({ $height = 180 }) => `${$height}px`};
  border-radius: 18px 18px 8px 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(232, 242, 238, 0.88)),
    linear-gradient(180deg, rgba(236, 171, 19, 0.08), transparent);
  border: 1px solid rgba(25, 118, 99, 0.12);
  box-shadow:
    -18px 12px 30px rgba(25, 118, 99, 0.08),
    18px 20px 34px rgba(40, 53, 61, 0.08);
  transform: rotateX(9deg) rotateY(${({ $tilt = -16 }) => `${$tilt}deg`});
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    right: -18px;
    width: 18px;
    height: calc(100% - 10px);
    border-radius: 0 12px 6px 0;
    background: linear-gradient(180deg, rgba(25, 118, 99, 0.24), rgba(25, 118, 99, 0.1));
    transform: skewY(18deg);
    transform-origin: left top;
  }

  &::after {
    content: "";
    position: absolute;
    top: -14px;
    left: 10px;
    right: 10px;
    height: 16px;
    border-radius: 12px 12px 4px 4px;
    background: linear-gradient(90deg, rgba(236, 171, 19, 0.28), rgba(25, 118, 99, 0.22));
  }
`;

export const WindowGrid = styled.div`
  position: absolute;
  inset: 24px 12px 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

export const WindowCell = styled.span`
  border-radius: 6px;
  background: ${({ $lit }) =>
    $lit
      ? "linear-gradient(180deg, rgba(236, 171, 19, 0.92), rgba(236, 171, 19, 0.46))"
      : "linear-gradient(180deg, rgba(25, 118, 99, 0.14), rgba(25, 118, 99, 0.05))"};
  box-shadow: ${({ $lit }) =>
    $lit ? "0 0 16px rgba(236, 171, 19, 0.28)" : "none"};
`;

export const FloatBadge = styled.div`
  position: absolute;
  top: ${({ $top = 24 }) => `${$top}px`};
  left: ${({ $left }) => ($left !== undefined ? `${$left}px` : "auto")};
  right: ${({ $right }) => ($right !== undefined ? `${$right}px` : "auto")};
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(25, 118, 99, 0.1);
  color: ${({ theme }) => theme.colors.primaryDark};
  box-shadow: 0 12px 24px rgba(40, 53, 61, 0.08);
  backdrop-filter: blur(8px);
  animation: floatBadge 5s ease-in-out infinite;
  font-size: 0.82rem;
  z-index: 4;

  @keyframes floatBadge {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
`;

export const FloatBadgeValue = styled.span`
  font-weight: 700;
`;

export const ShowcaseCard = styled.div`
  padding: 16px 16px 15px;
  border-radius: 20px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 244, 236, 0.92));
  box-shadow: 0 10px 22px rgba(40, 53, 61, 0.05);
`;

export const ShowcaseLabel = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.68rem;
  font-weight: 600;
`;

export const ShowcaseValue = styled.h3`
  margin: 0 0 6px;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const ShowcaseText = styled.p`
  margin: 0;
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

export const Notification = styled.div`
  margin-bottom: 20px;
  padding: 14px 18px;
  border-radius: 18px;
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === "error"
        ? "rgba(231, 76, 60, 0.18)"
        : `rgba(25, 118, 99, 0.18)`};
  background: ${({ $tone, theme }) =>
    $tone === "error"
      ? "rgba(231, 76, 60, 0.08)"
      : `rgba(25, 118, 99, 0.08)`};
  color: ${({ $tone, theme }) =>
    $tone === "error" ? theme.colors.error : theme.colors.primaryDark};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 26px;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 244, 236, 0.92));
  box-shadow: 0 12px 28px rgba(40, 53, 61, 0.05);
`;

export const StatValue = styled.div`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const StatLabel = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TabsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

export const TabButton = styled.button`
  ${buttonStyles};
  padding: 12px 18px;
  background: ${({ $active, theme }) =>
    $active
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`
      : "rgba(255, 255, 255, 0.88)"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.textDark};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? "transparent" : "rgba(25, 118, 99, 0.12)"};
  box-shadow: ${({ $active }) =>
    $active ? "0 14px 28px rgba(25, 118, 99, 0.18)" : "0 8px 20px rgba(40, 53, 61, 0.05)"};
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(360px, 0.95fr);
  gap: 24px;

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  border-radius: 28px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 243, 235, 0.92));
  box-shadow: 0 16px 36px rgba(40, 53, 61, 0.06);
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 24px 24px 18px;
  border-bottom: 1px solid rgba(25, 118, 99, 0.08);

  ${({ theme }) => theme.media.sm} {
    flex-direction: column;
  }
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const PanelSubtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export const SearchInput = styled.input`
  ${inputBase};
  width: min(320px, 100%);
`;

export const TableWrap = styled.div`
  overflow: visible;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;
  table-layout: auto;
`;

export const THead = styled.thead`
  background: rgba(25, 118, 99, 0.04);
`;

export const TRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(25, 118, 99, 0.06);
  }
`;

export const TH = styled.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.text};
`;

export const TD = styled.td`
  padding: 16px 24px;
  color: ${({ theme }) => theme.colors.textDark};
  vertical-align: top;
`;

export const ProjectName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 0.95rem;
  line-height: 1.35;
  word-break: break-word;
`;

export const ProjectMeta = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.82rem;
  line-height: 1.45;
  word-break: break-word;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  background: ${({ $tone, theme }) => {
    if ($tone === "featured") return "rgba(236, 171, 19, 0.14)";
    if ($tone === "success") return "rgba(25, 118, 99, 0.12)";
    if ($tone === "warning") return "rgba(236, 171, 19, 0.18)";
    if ($tone === "danger") return "rgba(231, 76, 60, 0.12)";
    return "rgba(41, 163, 92, 0.12)";
  }};
  color: ${({ $tone, theme }) => {
    if ($tone === "featured") return theme.colors.accent;
    if ($tone === "success") return theme.colors.primaryDark;
    if ($tone === "warning") return "#996700";
    if ($tone === "danger") return theme.colors.error;
    return theme.colors.info;
  }};
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 6px;
`;

export const TinyButton = styled.button`
  ${buttonStyles};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-width: 34px;
  height: 34px;
  padding: 0;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  background: ${({ $variant, theme }) =>
    $variant === "danger"
      ? "linear-gradient(135deg, rgba(231, 76, 60, 0.12), rgba(231, 76, 60, 0.06))"
      : $variant === "view"
        ? "linear-gradient(135deg, rgba(236, 171, 19, 0.18), rgba(236, 171, 19, 0.08))"
        : $variant === "edit"
          ? "linear-gradient(135deg, rgba(25, 118, 99, 0.16), rgba(25, 118, 99, 0.08))"
          : $variant === "ghost"
            ? "rgba(255, 255, 255, 0.82)"
            : "rgba(25, 118, 99, 0.08)"};
  color: ${({ $variant, theme }) =>
    $variant === "danger"
      ? theme.colors.error
      : $variant === "view"
        ? "#9a6800"
        : $variant === "edit"
          ? theme.colors.primaryDark
      : $variant === "ghost"
        ? theme.colors.textDark
        : theme.colors.primaryDark};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger"
        ? "rgba(231, 76, 60, 0.14)"
        : $variant === "view"
          ? "rgba(236, 171, 19, 0.24)"
        : "rgba(25, 118, 99, 0.12)"};
  box-shadow: ${({ $variant }) =>
    $variant === "danger"
      ? "0 8px 18px rgba(231, 76, 60, 0.08)"
      : $variant === "view"
        ? "0 10px 20px rgba(236, 171, 19, 0.12)"
        : $variant === "edit"
          ? "0 10px 20px rgba(25, 118, 99, 0.1)"
          : "0 8px 18px rgba(40, 53, 61, 0.05)"};

  svg {
    font-size: 0.88rem;
  }
`;

export const EmptyState = styled.div`
  padding: 28px 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SidePanelBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Input = styled.input`
  ${inputBase};
`;

export const FileInput = styled.input`
  ${inputBase};
  padding: 12px;

  &::file-selector-button {
    margin-right: 12px;
    border: none;
    border-radius: 999px;
    padding: 10px 14px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    cursor: pointer;
  }
`;

export const Select = styled.select`
  ${inputBase};
`;

export const TextArea = styled.textarea`
  ${inputBase};
  resize: vertical;
  min-height: 120px;
`;

export const CheckboxRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textDark};
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  accent-color: ${({ theme }) => theme.colors.primary};
  width: 16px;
  height: 16px;
`;

export const BenefitList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const BenefitCard = styled.div`
  padding: 16px;
  border-radius: 20px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: rgba(255, 255, 255, 0.7);
`;

export const UploadCard = styled.div`
  padding: 16px;
  border-radius: 20px;
  border: 1px dashed rgba(25, 118, 99, 0.2);
  background: rgba(255, 255, 255, 0.72);
`;

export const UploadHint = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.6;
`;

export const UploadPreview = styled.div`
  margin-top: 14px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(25, 118, 99, 0.1);
  background: rgba(255, 255, 255, 0.9);
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-height: 260px;
  object-fit: cover;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(25, 118, 99, 0.08);
`;

export const InsightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const InsightCard = styled.div`
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: rgba(255, 255, 255, 0.76);
`;

export const InsightLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
`;

export const InsightValue = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 1.05rem;
  line-height: 1.6;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ActivityItem = styled.div`
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(25, 118, 99, 0.08);
`;

export const ActivityTitle = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 600;
`;

export const ActivityMeta = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.6;
`;

export const PreviewBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(26, 37, 47, 0.42);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const PreviewModal = styled.div`
  width: min(980px, 100%);
  max-height: 90vh;
  overflow: auto;
  border-radius: 28px;
  border: 1px solid rgba(25, 118, 99, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 243, 235, 0.96));
  box-shadow: 0 24px 64px rgba(40, 53, 61, 0.18);
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  padding: 24px 24px 18px;
  border-bottom: 1px solid rgba(25, 118, 99, 0.08);
`;

export const PreviewTitle = styled.h3`
  margin: 0;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const PreviewMeta = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export const CloseButton = styled.button`
  ${buttonStyles};
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.textDark};
  border: 1px solid rgba(25, 118, 99, 0.12);
`;

export const PreviewBody = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 24px;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr;
  }
`;

export const PreviewImageWrap = styled.div`
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: rgba(255, 255, 255, 0.9);
`;

export const ModalPreviewImage = styled.img`
  width: 100%;
  height: 340px;
  object-fit: cover;
`;

export const PreviewSection = styled.div`
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: rgba(255, 255, 255, 0.74);

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const PreviewSectionTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

export const PreviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export const PreviewStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

export const PreviewStat = styled.div`
  padding: 14px;
  border-radius: 18px;
  background: rgba(248, 244, 236, 0.9);
  border: 1px solid rgba(25, 118, 99, 0.08);
`;

export const PreviewStatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
`;

export const PreviewStatValue = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 600;
  line-height: 1.5;
`;

export const PreviewChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const PreviewChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 9px 12px;
  border-radius: 999px;
  background: rgba(25, 118, 99, 0.08);
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 0.85rem;
  font-weight: 500;
`;
