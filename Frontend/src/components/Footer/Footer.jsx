import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  FooterContainer,
  FooterTop,
  FooterWrapper,
  FooterColumn,
  LogoSection,
  LogoIcon,
  LogoText,
  LogoTitle,
  LogoSubtitle,
  CompanyDescription,
  ColumnTitle,
  LinksList,
  FooterLink,
  ContactItem,
  ContactIcon,
  ContactText,
  CTASection,
  CTADescription,
  WhatsAppButton,
  FooterBottom,
  Copyright,
  LegalLinks,
  LegalLink,
} from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterWrapper>
          {/* Company Info */}
          <FooterColumn>
            <LogoSection>
              <LogoIcon>H</LogoIcon>
              <LogoText>
                <LogoTitle>Heritoria</LogoTitle>
                <LogoSubtitle>Heritage Projects • Hyderabad</LogoSubtitle>
              </LogoText>
            </LogoSection>
            <CompanyDescription>
              Your trusted partner for premium heritage residential projects in
              Hyderabad. We bring you exclusive benefits worth lakhs on every
              purchase.
            </CompanyDescription>
          </FooterColumn>

          {/* Quick Links */}
          <FooterColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <LinksList>
              <FooterLink href="#projects">View Projects</FooterLink>
              <FooterLink href="#investors">For Investors</FooterLink>
              <FooterLink href="#benefits">Our Benefits</FooterLink>
              <FooterLink href="#works">How It Works</FooterLink>
            </LinksList>
          </FooterColumn>

          {/* Contact Us */}
          <FooterColumn>
            <ColumnTitle>Contact Us</ColumnTitle>
            <LinksList>
              <ContactItem>
                <ContactIcon>
                  <FontAwesomeIcon icon={faLocationDot} />
                </ContactIcon>
                <ContactText>
                  Financial District, Gachibowli,
                  <br />
                  Hyderabad - 500032
                </ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FontAwesomeIcon icon={faPhone} />
                </ContactIcon>
                <ContactText>+91 98765 43210</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FontAwesomeIcon icon={faEnvelope} />
                </ContactIcon>
                <ContactText>hello@heritoria.in</ContactText>
              </ContactItem>
            </LinksList>
          </FooterColumn>

          {/* Get Started */}
          <FooterColumn>
            <ColumnTitle>Get Started</ColumnTitle>
            <CTASection>
              <CTADescription>
                Ready to find your dream home? Talk to our experts today.
              </CTADescription>
              <WhatsAppButton>
                <FontAwesomeIcon icon={faWhatsapp} />
                <span>Chat on WhatsApp</span>
              </WhatsAppButton>
            </CTASection>
          </FooterColumn>
        </FooterWrapper>
      </FooterTop>

      <FooterBottom>
        <FooterWrapper>
          <Copyright>
            All rights reserved. © 2025 by Heritoria
            <br />
            Powered and secured by Kommu Tech & Marketing Pvt.Ltd
          </Copyright>
          <LegalLinks>
            <LegalLink href="#privacy">Privacy Policy</LegalLink>
            <LegalLink href="#terms">Terms of Service</LegalLink>
          </LegalLinks>
        </FooterWrapper>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
