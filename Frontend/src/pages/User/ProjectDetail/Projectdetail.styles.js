import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  background: #fafaf9;
  min-height: 100vh;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 320px;
  }

  @media (max-width: 480px) {
    height: 280px;
  }
`;

export const HeroImage = styled.div`
  width: 100%;
  height: 120%;
  position: absolute;
  top: -10%;
  left: 0;
  will-change: transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
  display: flex;
  align-items: flex-end;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    padding-bottom: 32px;
  }

  @media (max-width: 480px) {
    padding-bottom: 24px;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BackButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: none;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: end;
  gap: 8px;
  padding: 8px 0;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StatusBadge = styled.div`
  display: inline-block;
  padding: 1px 15px 2px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
  background: ${(props) => {
    if (props.status === "Ready to Move") return "#25d366";
    if (props.status === "Under Construction") return "#197663";
    if (props.status === "Pre-Launch") return "#3498db";
    return "#6b6b6b";
  }};
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 5px 12px;
  }
`;

export const ProjectTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 1024px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const BuilderName = styled.p`
  font-size: 18px;
  color: #e0e0e0;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  padding: 40px 0 80px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 340px;
    gap: 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 0 60px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

export const Sidebar = styled.div`
  @media (max-width: 768px) {
    order: -1;
  }
`;

export const ContentSection = styled.section``;

export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const SectionDescription = styled.p`
  font-size: 16px;
  color: #6b6b6b;
  line-height: 1.6;
  margin: 0 0 28px 0;

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 24px;
  }
`;

export const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: #f5f3ef;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    background: #f0ede7;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #6b6b6b;
    font-size: 18px;
  }
`;

export const InfoLabel = styled.div`
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const BenefitsSection = styled.div`
  margin-top: 24px;
`;

export const BenefitsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

export const CompanyBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

export const CompanyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2d9f6f;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const CompanyInfo = styled.div`
  flex: 1;
`;

export const CompanyName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2px;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const CompanyLocation = styled.div`
  font-size: 13px;
  color: #6b6b6b;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const BenefitCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #fafafa;
    transform: translateX(8px);
  }

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    padding: 20px;
    gap: 12px;
  }
`;

export const BenefitIconWrapper = styled.div`
  flex-shrink: 0;
`;

export const BenefitIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #d4f4e6;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    color: #2d9f6f;
    font-size: 20px;
    transition: all 0.3s ease;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;

    svg {
      font-size: 18px;
    }
  }
`;

export const BenefitContent = styled.div`
  flex: 1;
`;

export const BenefitTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const BenefitDescription = styled.p`
  font-size: 14px;
  color: #6b6b6b;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const BenefitValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #2d9f6f;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const BenefitIncluded = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #2d9f6f;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const TotalBenefitCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 24px;
  background: #fffbf5;
  position: relative;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const TotalBenefitText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #6b6b6b;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const TotalBenefitValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #f5a623;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const BenefitNote = styled.div`
  font-size: 10px;
  color: #6b6b6b;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

export const BenefitBadge = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fff8e6;
  border: 3px solid #fafaf9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 16px;

  svg {
    color: #f5a623;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    margin-left: 12px;

    svg {
      font-size: 20px;
    }
  }
`;

export const AmenitiesSection = styled.div`
  margin-top: 24px;
`;

export const AmenitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const AmenityChip = styled.div`
  padding: 10px 20px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #2d9f6f;
    background: #f8fffe;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const LocationSection = styled.div`
  margin-top: 16px;
`;

export const LocationAddress = styled.p`
  font-size: 16px;
  color: #1a1a1a;
  margin: 0 0 12px 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2d9f6f;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const SidebarSection = styled.div`
  position: sticky;
  top: 24px;

  @media (max-width: 768px) {
    position: static;
  }
`;

export const SidebarCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const PriceLabel = styled.div`
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const PriceValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2d9f6f;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const BenefitsNote = styled.div`
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 20px;
  }
`;

export const ClaimButton = styled.button`
  width: 100%;
  background: #f5a623;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-bottom: 12px;

  &:hover {
    background: #e69512;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 166, 35, 0.4);
  }

  svg {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 14px 20px;
  }
`;

export const ScheduleButton = styled.button`
  width: 100%;
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-bottom: 28px;

  &:hover {
    background: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-2px);
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 12px 20px;
    margin-bottom: 24px;
  }
`;

export const HelpSection = styled.div`
  border-top: 1px solid #f0f0f0;
  padding-top: 24px;

  @media (max-width: 480px) {
    padding-top: 20px;
  }
`;

export const HelpText = styled.p`
  font-size: 14px;
  color: #6b6b6b;
  margin: 0 0 16px 0;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 14px;
  }
`;

export const ContactButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const CallButton = styled.button`
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

export const WhatsAppButton = styled.button`
  background: #25d366;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #20bd5a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.64);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1200;

  @media (max-width: 480px) {
    padding: 16px;
    align-items: flex-end;
  }
`;

export const ModalCard = styled.div`
  width: min(960px, 100%);
  max-height: min(88vh, 920px);
  overflow-y: auto;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.22);

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-height: 92vh;
    padding: 20px;
    border-radius: 20px 20px 0 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ModalEyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2d9f6f;
  margin-bottom: 8px;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 32px;
  line-height: 1.15;
  color: #111827;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

export const ModalDescription = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
  max-width: 640px;
`;

export const ModalCloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #f3f4f6;
  color: #111827;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    background: #e5e7eb;
    transform: rotate(90deg);
  }
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.button`
  text-align: left;
  border: 1px solid
    ${(props) => (props.isSelected ? "#2d9f6f" : "#e5e7eb")};
  background: ${(props) => (props.isSelected ? "#f4fbf7" : "#ffffff")};
  border-radius: 18px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${(props) =>
    props.isSelected ? "0 12px 32px rgba(45, 159, 111, 0.12)" : "none"};

  &:hover {
    border-color: #2d9f6f;
    transform: translateY(-3px);
  }
`;

export const PlanName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
`;

export const PlanPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #2d9f6f;
  margin-bottom: 10px;
`;

export const PlanDescription = styled.p`
  margin: 0 0 14px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
`;

export const PlanFeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PlanFeatureItem = styled.li`
  position: relative;
  padding-left: 18px;
  color: #1f2937;
  font-size: 14px;
  line-height: 1.5;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #2d9f6f;
  }
`;

export const SelectedPlanSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 18px 20px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 6px;
`;

export const SummaryValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const FieldInput = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: #111827;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2d9f6f;
    box-shadow: 0 0 0 3px rgba(45, 159, 111, 0.12);
  }

  &[readonly] {
    background: #f9fafb;
    color: #6b7280;
  }
`;

export const FieldSelect = styled.select`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: #111827;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2d9f6f;
    box-shadow: 0 0 0 3px rgba(45, 159, 111, 0.12);
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: #111827;
  background: #ffffff;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2d9f6f;
    box-shadow: 0 0 0 3px rgba(45, 159, 111, 0.12);
  }
`;

export const InlineNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fffbeb;
  color: #92400e;
  font-size: 14px;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const PrimaryAction = styled.button`
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #2d9f6f, #197663);
  color: #ffffff;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(25, 118, 99, 0.25);
  }
`;

export const SecondaryAction = styled.button`
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #111827;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

export const SuccessCard = styled.div`
  padding: 28px;
  border-radius: 20px;
  background: linear-gradient(180deg, #f4fbf7, #ffffff);
  border: 1px solid #d8f0e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #2d9f6f;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 12px 28px rgba(45, 159, 111, 0.24);

  svg {
    font-size: 24px;
  }
`;

export const SuccessTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 26px;
  color: #111827;
  font-family:
    Playfair Display,
    serif;
`;

export const SuccessMessage = styled.p`
  margin: 0;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.7;
  max-width: 560px;
`;

export const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SlotButton = styled.button`
  border: 1px solid
    ${(props) => (props.isSelected ? "#2d9f6f" : "#d1d5db")};
  border-radius: 14px;
  background: ${(props) => (props.isSelected ? "#f4fbf7" : "#ffffff")};
  color: #111827;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2d9f6f;
    transform: translateY(-2px);
  }
`;
