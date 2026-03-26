import styled from "styled-components";

export const SectionContainer = styled.section`
  width: 100%;
  background: linear-gradient(135deg, #e8ecf1 0%, #ffffff 100%);
  padding: 10px 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 16px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  gap: 60px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 50px;
  }

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

export const LeftContent = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }
`;

export const Heading = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 16px;
  }
`;

export const DreamText = styled.span`
  color: #2d9f6f;
`;

export const Subtext = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #6b6b6b;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 28px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 24px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
`;

export const BrowseButton = styled.button`
  background: #f5a623;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 166, 35, 0.3);

  &:hover {
    background: #e69512;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 166, 35, 0.4);
  }

  svg {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 14px 28px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 13px 24px;
  }
`;

export const ScheduleButton = styled.button`
  background: #ffffff;
  color: #1a1a1a;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 14px 28px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 13px 24px;
  }
`;

export const RightContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 520px;

  @media (max-width: 1024px) {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const BenefitsCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 380px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 18px;
    border-radius: 10px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 18px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
    margin-bottom: 16px;
  }
`;

export const BenefitItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  align-items: flex-start;

  &:last-of-type {
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 18px;
    }
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 14px;

    &:last-of-type {
      margin-bottom: 16px;
    }
  }
`;

export const CheckIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #d4f4e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    color: #2d9f6f;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;

    svg {
      font-size: 16px;
    }
  }
`;

export const BenefitContent = styled.div`
  flex: 1;
`;

export const BenefitTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 3px;
  }
`;

export const BenefitDescription = styled.p`
  font-size: 13px;
  color: #6b6b6b;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const WhatsAppButton = styled.button`
  width: 100%;
  background: #25d366;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);

  &:hover {
    background: #20bd5a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 11px 18px;
  }
`;

export const WhatsAppIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    svg {
      font-size: 18px;
    }
  }
`;
