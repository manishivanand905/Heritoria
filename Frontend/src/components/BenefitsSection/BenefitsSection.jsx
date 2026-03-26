import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faShield,
  faUsers,
  faCouch,
  faLightbulb,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  BenefitsContainer,
  ContentWrapper,
  SectionLabel,
  MainHeading,
  HeadingText,
  HighlightText,
  Description,
  BenefitsGroup,
  GroupHeader,
  GroupNumber,
  GroupTitle,
  CardsGrid,
  BenefitCard,
  IconWrapper,
  CardTitle,
  CardDescription,
  BenefitValueLabel,
  BenefitValue,
} from "./BenefitsSection.styles";

const BenefitsSection = () => {
  return (
    <BenefitsContainer>
      <ContentWrapper>
        <SectionLabel>WHY BUY THROUGH US</SectionLabel>

        <MainHeading>
          <HeadingText>Benefits Worth </HeadingText>
          <HighlightText>₹5L - ₹12L</HighlightText>
          <HeadingText> on Every Purchase</HeadingText>
        </MainHeading>

        <Description>
          We're not just connecting you to projects. We're adding tangible value
          to your purchase with exclusive benefits you won't get anywhere else.
        </Description>

        {/* Pre-Sale Benefits */}
        <BenefitsGroup>
          <GroupHeader>
            <GroupNumber teal>1</GroupNumber>
            <GroupTitle>Pre-Sale Benefits</GroupTitle>
          </GroupHeader>

          <CardsGrid>
            <BenefitCard teal>
              <IconWrapper teal>
                <FontAwesomeIcon icon={faPercent} />
              </IconWrapper>
              <CardTitle>Bulk Negotiation Power</CardTitle>
              <CardDescription>
                We negotiate directly with developers on volume. You get prices
                individual buyers simply cannot access.
              </CardDescription>
            </BenefitCard>

            <BenefitCard teal>
              <IconWrapper teal>
                <FontAwesomeIcon icon={faShield} />
              </IconWrapper>
              <CardTitle>Builder Verification</CardTitle>
              <CardDescription>
                Every project is vetted for legal compliance, construction
                quality, and builder reputation before listing.
              </CardDescription>
            </BenefitCard>

            <BenefitCard teal>
              <IconWrapper teal>
                <FontAwesomeIcon icon={faUsers} />
              </IconWrapper>
              <CardTitle>Investment Advisory</CardTitle>
              <CardDescription>
                Our experts analyze ROI potential, rental yields, and
                appreciation trends for each project.
              </CardDescription>
            </BenefitCard>
          </CardsGrid>
        </BenefitsGroup>

        {/* Post-Sale Benefits */}
        <BenefitsGroup>
          <GroupHeader>
            <GroupNumber yellow>2</GroupNumber>
            <GroupTitle>Post-Sale Benefits</GroupTitle>
          </GroupHeader>

          <CardsGrid>
            <BenefitCard yellow>
              <IconWrapper yellow>
                <FontAwesomeIcon icon={faCouch} />
              </IconWrapper>
              <CardTitle>Modular Furniture Package</CardTitle>
              <CardDescription>
                Complete modular kitchen, wardrobes, and TV units from premium
                brands — designed for your new home.
              </CardDescription>
              <BenefitValueLabel>BENEFIT VALUE</BenefitValueLabel>
              <BenefitValue>Up to ₹5L</BenefitValue>
            </BenefitCard>

            <BenefitCard yellow>
              <IconWrapper yellow>
                <FontAwesomeIcon icon={faLightbulb} />
              </IconWrapper>
              <CardTitle>Smart Home Automation</CardTitle>
              <CardDescription>
                Automated lighting, AC control, security cameras, and smart
                locks — making your home future-ready.
              </CardDescription>
              <BenefitValueLabel>BENEFIT VALUE</BenefitValueLabel>
              <BenefitValue>Up to ₹3.5L</BenefitValue>
            </BenefitCard>

            <BenefitCard yellow>
              <IconWrapper yellow>
                <FontAwesomeIcon icon={faClipboardCheck} />
              </IconWrapper>
              <CardTitle>Quality Inspection</CardTitle>
              <CardDescription>
                200+ point quality check by certified engineers before handover.
                We ensure you get what you paid for.
              </CardDescription>
              <BenefitValueLabel>BENEFIT VALUE</BenefitValueLabel>
              <BenefitValue>Included</BenefitValue>
            </BenefitCard>
          </CardsGrid>
        </BenefitsGroup>
      </ContentWrapper>
    </BenefitsContainer>
  );
};

export default BenefitsSection;
