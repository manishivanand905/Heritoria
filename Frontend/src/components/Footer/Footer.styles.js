import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background: #2c3e50;
  color: #ffffff;
`;

export const FooterTop = styled.div`
  padding: 80px 20px 60px;

  @media (max-width: 768px) {
    padding: 60px 16px 40px;
  }
`;

export const FooterWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

export const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #0d7d6e;
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
  }
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const LogoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const LogoSubtitle = styled.div`
  font-size: 13px;
  color: #b0bec5;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CompanyDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #b0bec5;
  margin: 0;
  max-width: 350px;

  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 100%;
  }
`;

export const ColumnTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  font-family: "Georgia", serif;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

export const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FooterLink = styled.a`
  font-size: 15px;
  color: #b0bec5;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  width: fit-content;

  &:hover {
    color: #ffffff;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const ContactIcon = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;

  svg {
    font-size: 16px;
    color: #0d7d6e;
  }
`;

export const ContactText = styled.div`
  font-size: 15px;
  color: #b0bec5;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CTATitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const CTADescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #b0bec5;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const WhatsAppButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #25d366;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: #20ba5a;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 20px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  ${FooterWrapper} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }
`;

export const Copyright = styled.div`
  font-size: 14px;
  color: #90a4ae;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const LegalLink = styled.a`
  font-size: 14px;
  color: #90a4ae;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
