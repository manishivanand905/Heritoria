import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  background: #fafaf9;
`;

// Hero Section Styles
export const HeroSection = styled.section`
  background: #f5f3ef;
  padding: 80px 20px 100px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px 80px;
  }

  @media (max-width: 480px) {
    padding: 50px 16px 70px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff8e6;
  border: 2px solid #f5e6d3;
  color: #f5a623;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 24px;

  svg {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0 0 24px 0;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

export const HeroTitleGreen = styled.span`
  color: #2d9f6f;
`;

export const HeroDescription = styled.p`
  font-size: 18px;
  color: #6b6b6b;
  line-height: 1.7;
  max-width: 900px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 40px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 32px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 28px;
    max-width: 400px;
  }
`;

export const StatCard = styled.div`
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const StatValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #2d9f6f;
  margin-bottom: 8px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

export const StatLabel = styled.div`
  font-size: 16px;
  color: #6b6b6b;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

// Why Invest Section Styles
export const WhyInvestSection = styled.section`
  background: #fafaf9;
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 16px 0;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #6b6b6b;
  text-align: center;
  margin: 0 auto 60px;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 40px;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const FeatureCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e6e0;
  border-radius: 16px;
  padding: 36px 28px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: #d0cec8;
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
  }

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

export const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  background: #d4f4e6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    color: #2d9f6f;
    font-size: 24px;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;

    svg {
      font-size: 22px;
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  line-height: 1.3;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 15px;
  color: #6b6b6b;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Process Section Styles
export const ProcessSection = styled.section`
  background: #f5f3ef;
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  @media (max-width: 480px) {
    padding: 60px 16px;
  }
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 1024px) {
    gap: 60px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

export const ProcessContent = styled.div`
  align-self: center;
`;

export const ProcessList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;

  @media (max-width: 768px) {
    margin-top: 40px;
    gap: 28px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const ProcessItem = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(8px);
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

export const ProcessNumber = styled.div`
  width: 56px;
  height: 56px;
  background: #2d9f6f;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
`;

export const ProcessInfo = styled.div`
  flex: 1;
  padding-top: 8px;

  @media (max-width: 480px) {
    padding-top: 4px;
  }
`;

export const ProcessTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 6px;
  }
`;

export const ProcessDescription = styled.p`
  font-size: 15px;
  color: #6b6b6b;
  line-height: 1.5;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Form Section Styles
export const FormSection = styled.div`
  @media (max-width: 768px) {
    order: -1;
  }
`;

export const FormCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 24px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    position: static;
  }

  @media (max-width: 480px) {
    padding: 32px 24px;
  }
`;

export const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const FormSubtitle = styled.p`
  font-size: 15px;
  color: #6b6b6b;
  line-height: 1.5;
  margin: 0 0 32px 0;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 28px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 2px solid #e8e6e0;
  border-radius: 8px;
  font-size: 15px;
  color: #1a1a1a;
  background: #fafaf9;
  transition: all 0.3s ease;
  font-family: inherit;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border-color: #2d9f6f;
    background: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(45, 159, 111, 0.15);
  }

  &:hover {
    border-color: #c0c0c0;
  }

  @media (max-width: 480px) {
    padding: 9px 14px;
    font-size: 14px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 16px;
  border: 2px solid #e8e6e0;
  border-radius: 8px;
  font-size: 15px;
  color: #1a1a1a;
  background: #fafaf9;
  transition: all 0.3s ease;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2d9f6f;
    background: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(45, 159, 111, 0.15);
  }

  &:hover {
    border-color: #c0c0c0;
  }

  option {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 9px 14px;
    font-size: 14px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 16px;
  border: 2px solid #e8e6e0;
  border-radius: 8px;
  font-size: 15px;
  color: #1a1a1a;
  background: #fafaf9;
  transition: all 0.3s ease;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border-color: #2d9f6f;
    background: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(45, 159, 111, 0.15);
  }

  &:hover {
    border-color: #c0c0c0;
  }

  @media (max-width: 480px) {
    padding: 9px 14px;
    font-size: 14px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #2d9f6f;
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
  margin-bottom: 16px;

  &:hover {
    background: #258c5f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 159, 111, 0.3);
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 14px 20px;
  }
`;

export const SecurityNote = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  background: #f5f3ef;
  border-radius: 8px;
  font-size: 13px;
  color: #6b6b6b;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 14px;
  }
`;

export const SecurityIcon = styled.div`
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    color: #2d9f6f;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    svg {
      font-size: 14px;
    }
  }
`;
