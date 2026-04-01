import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faStar,
  faArrowRight,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { requestJson } from "../../Services/api";
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
  ProjectCardStage,
  AnimatedProjectCard,
  ProjectCard,
  ProjectImage,
  QualityBadge,
  ProjectInfo,
  ProjectHeaderRow,
  ProjectLabel,
  ProjectTitle,
  ProjectBuilder,
  ProjectLocation,
  BenefitBox,
  BenefitIcon,
  BenefitLabel,
  BenefitAmount,
} from "./Herosection.styles";
import homeHeroContent from "../../data/homeHero.data";
import {
  BENEFIT_RANGE_HEADLINE,
  BENEFIT_RANGE_LABEL,
  MAX_BENEFIT_LABEL,
} from "../../constants/benefits";

const HERO_PROJECT_ROTATION_INTERVAL = 20000;
const HERO_PROJECT_TRANSITION_DURATION = 1200;

const ProjectShowcaseCard = ({ project, animationState, onClick }) => (
  <AnimatedProjectCard
    type="button"
    $animationState={animationState}
    data-state={animationState}
    onClick={onClick}
    aria-label={`View details for ${project.name}`}
    tabIndex={animationState === "exit" ? -1 : 0}
  >
    <ProjectImage>
      <img src={project.image} alt={project.name} />
      <QualityBadge>
        <FontAwesomeIcon icon={faShield} />
        <div>
          <div>Status</div>
          <div>{project.status || "Live"}</div>
        </div>
      </QualityBadge>
    </ProjectImage>

    <ProjectInfo>
      <ProjectHeaderRow>
        <ProjectLabel>
          {project.featured ? "Featured Project" : "Live Project"}
        </ProjectLabel>
      </ProjectHeaderRow>
      <ProjectTitle>{project.name}</ProjectTitle>
      <ProjectBuilder>by {project.builder}</ProjectBuilder>
      <ProjectLocation>
        {[project.location, project.priceRange].filter(Boolean).join(" | ")}
      </ProjectLocation>

      <BenefitBox>
        <BenefitIcon>
          <FontAwesomeIcon icon={faStar} />
        </BenefitIcon>
        <div>
          <BenefitLabel>Your Exclusive Benefit</BenefitLabel>
          <BenefitAmount>
            {project.benefitsWorth || project.totalBenefitValue || MAX_BENEFIT_LABEL}
          </BenefitAmount>
        </div>
      </BenefitBox>
    </ProjectInfo>
  </AnimatedProjectCard>
);

const HeroSection = ({ offsetForHeader = false }) => {
  const history = useHistory();
  const transitionTimeoutRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isRotationPaused, setIsRotationPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const response = await requestJson("/projects");

        if (!isMounted) {
          return;
        }

        setProjects(response.data || []);
        setProjectError("");
        setActiveIndex(0);
        setPreviousIndex(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setProjectError(error.message);
      } finally {
        if (isMounted) {
          setIsLoadingProjects(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const showcaseProjects = useMemo(() => projects, [projects]);

  useEffect(() => {
    if (!showcaseProjects.length) {
      setActiveIndex(0);
      setPreviousIndex(null);
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex >= showcaseProjects.length ? 0 : currentIndex
    );
  }, [showcaseProjects.length]);

  useEffect(() => {
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    if (isRotationPaused || showcaseProjects.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % showcaseProjects.length;
        setPreviousIndex(currentIndex);
        return nextIndex;
      });

      transitionTimeoutRef.current = window.setTimeout(() => {
        setPreviousIndex(null);
      }, HERO_PROJECT_TRANSITION_DURATION);
    }, HERO_PROJECT_ROTATION_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
  }, [isRotationPaused, showcaseProjects.length]);

  const activeProject = showcaseProjects[activeIndex] || null;
  const outgoingProject =
    previousIndex !== null &&
    previousIndex !== activeIndex &&
    showcaseProjects[previousIndex]
      ? showcaseProjects[previousIndex]
      : null;

  const totalProjectsLabel = projects.length ? `${projects.length}+` : "25+";

  const openProject = (projectId) => {
    if (!projectId) {
      return;
    }

    history.push(`/project/${projectId}`);
  };

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
            <HeadingSecondary>
              Get Benefits Worth {BENEFIT_RANGE_HEADLINE}.
            </HeadingSecondary>
          </MainHeading>

          <Description>
            We&apos;re not just brokers. We&apos;re your investment partners.
            Get exclusive pre-sale and post-sale benefits on premium Hyderabad
            projects from modular furniture to home automation, worth{" "}
            <strong>{BENEFIT_RANGE_LABEL}</strong>.
          </Description>

          <StatsContainer>
            <StatItem>
              <StatValue>Upto 3L</StatValue>
              <StatLabel>Max Benefit Value</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{totalProjectsLabel}</StatValue>
              <StatLabel>Curated Projects</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>500+</StatValue>
              <StatLabel>Happy Families</StatLabel>
            </StatItem>
          </StatsContainer>

          <ButtonContainer>
            <ExploreButton type="button" onClick={() => history.push("/projects")}>
              <span>Explore Projects</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </ExploreButton>
            <WhatsAppButton type="button">
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>Talk on WhatsApp</span>
            </WhatsAppButton>
          </ButtonContainer>
        </LeftSection>

        <RightSection>
          <ProjectCardStage
            onMouseEnter={() => setIsRotationPaused(true)}
            onMouseLeave={() => setIsRotationPaused(false)}
            onFocus={() => setIsRotationPaused(true)}
            onBlur={() => setIsRotationPaused(false)}
          >
            {outgoingProject ? (
              <ProjectShowcaseCard
                key={`project-exit-${outgoingProject.id}-${activeIndex}`}
                project={outgoingProject}
                animationState="exit"
                onClick={() => openProject(outgoingProject.id)}
              />
            ) : null}

            {activeProject ? (
              <ProjectShowcaseCard
                key={`project-active-${activeProject.id}`}
                project={activeProject}
                animationState={outgoingProject ? "enter" : "idle"}
                onClick={() => openProject(activeProject.id)}
              />
            ) : (
              <ProjectCard as="div" aria-live="polite" style={{ cursor: "default" }}>
                <ProjectImage>
                  <img
                    src={homeHeroContent.backgroundImage}
                    alt="Heritoria premium project showcase"
                  />
                  <QualityBadge>
                    <FontAwesomeIcon icon={faShield} />
                    <div>
                      <div>{projectError ? "Connection" : "Showcase"}</div>
                      <div>{projectError ? "Retrying" : "Loading"}</div>
                    </div>
                  </QualityBadge>
                </ProjectImage>

                <ProjectInfo>
                  <ProjectHeaderRow>
                    <ProjectLabel>Live Project Showcase</ProjectLabel>
                  </ProjectHeaderRow>
                  <ProjectTitle>
                    {isLoadingProjects ? "Loading premium projects..." : "Projects unavailable"}
                  </ProjectTitle>
                  <ProjectBuilder>
                    {projectError ||
                      "We're pulling the latest project cards from the backend."}
                  </ProjectBuilder>
                  <ProjectLocation>
                    The hero card will automatically rotate as soon as project data arrives.
                  </ProjectLocation>

                  <BenefitBox>
                    <BenefitIcon>
                      <FontAwesomeIcon icon={faStar} />
                    </BenefitIcon>
                    <div>
                      <BenefitLabel>Exclusive Benefits</BenefitLabel>
                      <BenefitAmount>{MAX_BENEFIT_LABEL}</BenefitAmount>
                    </div>
                  </BenefitBox>
                </ProjectInfo>
              </ProjectCard>
            )}
          </ProjectCardStage>
        </RightSection>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
