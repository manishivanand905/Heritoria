import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowRight,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  HeroContainer,
  ContentWrapper,
  LeftSection,
  RightSection,
  BadgeWrapper,
  Badge,
  MainHeading,
  HeadingPrimary,
  HeadingSecondary,
  Description,
  StatsContainer,
  StatItem,
  StatValue,
  StatLabel,
  ButtonContainer,
  ExploreButton,
  WhatsAppButton,
  ProjectCard,
  ProjectImage,
  QualityBadge,
  ProjectInfo,
  ProjectLabel,
  ProjectTitle,
  ProjectLocation,
  BenefitBox,
  BenefitIcon,
  BenefitLabel,
  BenefitAmount,
} from "./Herosection.styles";
import homeHeroContent from "../../data/homeHero.data";

const HeroSection = ({ offsetForHeader = false }) => {
  return (
    <HeroContainer
      $backgroundImage={homeHeroContent.backgroundImage}
      $offsetForHeader={offsetForHeader}
    >
      <ContentWrapper>
        <LeftSection>
          <BadgeWrapper>
            <Badge>
              <FontAwesomeIcon icon={faStar} />
              <span>Exclusive Partner Benefits</span>
            </Badge>
          </BadgeWrapper>

          <MainHeading>
            <HeadingPrimary>Buy New Projects.</HeadingPrimary>
            <HeadingSecondary>Get Benefits Worth Lakhs.</HeadingSecondary>
          </MainHeading>

          <Description>
            We&apos;re not just brokers. We&apos;re your investment partners. Get
            exclusive pre-sale and post-sale benefits on premium Hyderabad
            projects from modular furniture to home automation, worth{" "}
            <strong>Rs 5L - Rs 12L</strong>.
          </Description>

          <StatsContainer>
            <StatItem>
              <StatValue>Rs 8.5L+</StatValue>
              <StatLabel>Avg. Benefit Value</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>25+</StatValue>
              <StatLabel>Curated Projects</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>500+</StatValue>
              <StatLabel>Happy Families</StatLabel>
            </StatItem>
          </StatsContainer>

          <ButtonContainer>
            <ExploreButton>
              <span>Explore Projects</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </ExploreButton>
            <WhatsAppButton>
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>Talk on WhatsApp</span>
            </WhatsAppButton>
          </ButtonContainer>
        </LeftSection>

        <RightSection>
          <ProjectCard>
            <ProjectImage>
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                alt="Luxury living room"
              />
              <QualityBadge>
                <FontAwesomeIcon icon={faShield} />
                <div>
                  <div>Quality</div>
                  <div>Assured</div>
                </div>
              </QualityBadge>
            </ProjectImage>

            <ProjectInfo>
              <ProjectLabel>Featured Project</ProjectLabel>
              <ProjectTitle>Prestige High Fields</ProjectTitle>
              <ProjectLocation>Gachibowli • Rs 1.2 Cr - Rs 2.8 Cr</ProjectLocation>

              <BenefitBox>
                <BenefitIcon>
                  <FontAwesomeIcon icon={faStar} />
                </BenefitIcon>
                <div>
                  <BenefitLabel>Your Exclusive Benefit</BenefitLabel>
                  <BenefitAmount>Rs 8.5 Lakhs</BenefitAmount>
                </div>
              </BenefitBox>
            </ProjectInfo>
          </ProjectCard>
        </RightSection>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
