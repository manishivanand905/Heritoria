import styled from "styled-components";

export const BenefitsContainer = styled.section`
  width: 100%;
  background: #f8f9fa;
  padding: 100px 100px;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0d7d6e;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const MainHeading = styled.h2`
  font-size: 44px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 20px 0;
  line-height: 1.3;
  font-family: "Georgia", serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  @media (max-width: 1024px) {
    font-size: 38px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const HeadingText = styled.span`
  color: #1a1a1a;
`;

export const HighlightText = styled.span`
  color: #d4930d;
`;

export const Description = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #6c757d;
  text-align: center;
  max-width: 800px;
  margin: 0 0 60px 0;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0 0 50px 0;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin: 0 0 40px 0;
  }
`;

export const BenefitsGroup = styled.div`
  width: 100%;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const GroupNumber = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
  background: ${(props) => (props.teal ? "#d1f0ec" : "#fff8e6")};
  color: ${(props) => (props.teal ? "#0d7d6e" : "#d4930d")};

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    font-size: 18px;
  }
`;

export const GroupTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  font-family: "Georgia", serif;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const BenefitCard = styled.div`
  background: ${(props) => (props.teal ? "#ffffff" : "#fffbf0")};
  border: 1px solid ${(props) => (props.teal ? "#e9ecef" : "#ffe8b8")};
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: ${(props) => (props.teal ? "#d1f0ec" : "#fff4d6")};

  svg {
    font-size: 24px;
    color: ${(props) => (props.teal ? "#0d7d6e" : "#d4930d")};
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;

    svg {
      font-size: 22px;
    }
  }
`;

export const CardTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  font-family: "Georgia", serif;

  @media (max-width: 768px) {
    font-size: 19px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const CardDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #6c757d;
  margin: 0 0 20px 0;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BenefitValueLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #999;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
  margin-top: 8px;
`;

export const BenefitValue = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #0d7d6e;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
