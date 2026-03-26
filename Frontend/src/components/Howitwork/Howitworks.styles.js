import styled from "styled-components";

export const HowItWorksSection = styled.section`
  background: linear-gradient(135deg, #0d7d6e 100%, #3a9186 100%);
  padding: 100px 100px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const Subtitle = styled.p`
  color: #f5a623;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 12px;
    letter-spacing: 1.5px;
  }
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 20px;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }
`;

export const StepCard = styled.div`
  flex: 1;
  text-align: center;
  max-width: 380px;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    max-width: 500px;
    width: 100%;
  }
`;

export const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid #f5a623;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  background: transparent;
  transition: all 0.3s ease;

  svg {
    font-size: 48px;
    color: #f5a623;
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(245, 166, 35, 0.1);
    transform: scale(1.05);

    svg {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border-width: 2.5px;

    svg {
      font-size: 40px;
    }
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;

    svg {
      font-size: 36px;
    }
  }
`;

export const StepNumber = styled.div`
  color: #f5a623;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const StepTitle = styled.h3`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.3;
  font-family:
    Playfair Display,
    serif;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const StepDescription = styled.p`
  color: #ffffffb3;
  font-size: 12px;
  line-height: 1.7;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ConnectorLine = styled.div`
  width: 80px;
  height: 3px;
  background: #f5a623;
  margin-top: 60px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;
