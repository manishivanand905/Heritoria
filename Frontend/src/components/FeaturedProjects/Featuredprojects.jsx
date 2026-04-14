import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faLocationDot,
  faCalendar,
  faArrowRight,
  faCoins,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { requestJson } from "../../Services/api";
import {
  FeaturedSection,
  Container,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  ViewAllButton,
  ViewAllButtonWrapper,
  ProjectsGrid,
  ProjectsTrack,
  ProjectSlide,
  ProjectCard,
  ProjectMedia,
  ProjectImage,
  StatusBadge,
  BenefitBadge,
  BenefitIcon,
  BenefitText,
  ProjectContent,
  ProjectTitle,
  ProjectDeveloper,
  ProjectMeta,
  MetaItem,
  MetaIcon,
  MetaText,
  ProjectFooter,
  PriceRange,
  Price,
  Configuration,
  ViewButton,
  ViewButtonIcon,
  NextArrowButton,
} from "./Featuredprojects.styles";
import { BENEFIT_RANGE_LABEL } from "../../constants/benefits";
import { ensurePriceRangeDisplay } from "../../utils/currencyFormatting";

const FeaturedProjects = () => {
  const history = useHistory();
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const response = await requestJson("/projects");
        setFeaturedProjects(response.data || []);
      } catch (error) {
        console.error("Failed to load featured projects:", error.message);
      }
    };

    loadFeaturedProjects();
  }, []);

  const trackRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPosRef = React.useRef(0);
  const isTransitioningRef = React.useRef(false);
  
  const isTouchedRef = React.useRef(false);
  const touchStartXRef = React.useRef(0);
  const touchCurrentTranslateRef = React.useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || featuredProjects.length === 0) return;

    let animationId;
    let lastTime = performance.now();

    const scroll = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered && !isTransitioningRef.current && !isTouchedRef.current) {
        // Adjust speed here: approximately 50px per second
        scrollPosRef.current += delta * 0.05;

        // Calculate maximum scroll based on original items to allow seamless loop
        const totalWidth = track.scrollWidth;
        const halfWidth = totalWidth / 2;

        if (scrollPosRef.current >= halfWidth) {
          scrollPosRef.current -= halfWidth;
        }
        track.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, featuredProjects]);

  const handleTouchStart = (e) => {
    isTouchedRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchCurrentTranslateRef.current = scrollPosRef.current;
    
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e) => {
    if (!isTouchedRef.current || !trackRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - touchStartXRef.current;
    let nextPos = touchCurrentTranslateRef.current - deltaX;
    
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    
    if (nextPos >= halfWidth) {
      nextPos -= halfWidth;
      touchStartXRef.current = currentX;
      touchCurrentTranslateRef.current = nextPos;
    } else if (nextPos < 0) {
      nextPos += halfWidth;
      touchStartXRef.current = currentX;
      touchCurrentTranslateRef.current = nextPos;
    }
    
    scrollPosRef.current = nextPos;
    track.style.transform = `translateX(-${nextPos}px)`;
  };

  const handleTouchEnd = () => {
    isTouchedRef.current = false;
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (!track || isTransitioningRef.current) return;

    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    const cardElement = cards[0];
    const cardWidth = cardElement.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
    const itemWidth = cardWidth + gap;

    // Calculate the next snap position
    let nextPos = Math.ceil((scrollPosRef.current + 1) / itemWidth) * itemWidth;

    isTransitioningRef.current = true;
    track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(-${nextPos}px)`;

    setTimeout(() => {
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (nextPos >= halfWidth) {
          nextPos -= halfWidth;
          track.style.transition = "none";
          track.style.transform = `translateX(-${nextPos}px)`;
        }
        scrollPosRef.current = nextPos;
        isTransitioningRef.current = false;
        track.style.transition = "none";
      }
    }, 450);
  };


  const marqueeProjects =
    featuredProjects.length > 0
      ? [...featuredProjects, ...featuredProjects]
      : [];

  return (
    <FeaturedSection>
      <Container>
        <SectionHeader>
          <div>
            <SectionLabel>FEATURED PROJECTS</SectionLabel>
            <SectionTitle>Handpicked for You</SectionTitle>
          </div>
        </SectionHeader>

        <ProjectsGrid
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <ProjectsTrack ref={trackRef}>
            {marqueeProjects.map((project, index) => (
              <ProjectSlide key={`${project.id}-${index}`}>
                <ProjectCard onClick={() => history.push(`/project/${project.id}`)}>
                  <ProjectMedia>
                    <ProjectImage src={project.image} alt={project.name} />
                    <StatusBadge>{project.status}</StatusBadge>
                    <BenefitBadge>
                      <BenefitIcon>
                        <FontAwesomeIcon icon={faCoins} />
                      </BenefitIcon>
                      <BenefitText>
                        Benefits worth {BENEFIT_RANGE_LABEL}
                      </BenefitText>
                    </BenefitBadge>
                  </ProjectMedia>

                  <ProjectContent>
                    <ProjectTitle>{project.name}</ProjectTitle>
                    <ProjectDeveloper>by {project.builder}</ProjectDeveloper>

                    <ProjectMeta>
                      <MetaItem>
                        <MetaIcon>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </MetaIcon>
                        <MetaText>{project.location}</MetaText>
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon>
                          <FontAwesomeIcon icon={faCalendar} />
                        </MetaIcon>
                        <MetaText>{project.possession}</MetaText>
                      </MetaItem>
                    </ProjectMeta>

                    <ProjectFooter>
                      <PriceRange>
                        <Price>{ensurePriceRangeDisplay(project.priceRange)}</Price>
                        <Configuration>{project.unitTypes || project.bhk}</Configuration>
                      </PriceRange>
                      <ViewButton onClick={() => history.push(`/project/${project.id}`)}>
                        View
                        <ViewButtonIcon>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </ViewButtonIcon>
                      </ViewButton>
                    </ProjectFooter>
                  </ProjectContent>
                </ProjectCard>
              </ProjectSlide>
            ))}
          </ProjectsTrack>
          <NextArrowButton onClick={handleNext} $isVisible={isHovered}>
            <FontAwesomeIcon icon={faChevronRight} />
          </NextArrowButton>
        </ProjectsGrid>

        <ViewAllButtonWrapper>
          <ViewAllButton to="/projects">
            View All Projects
            <FontAwesomeIcon icon={faArrowRight} />
          </ViewAllButton>
        </ViewAllButtonWrapper>
      </Container>
    </FeaturedSection>
  );
};

export default FeaturedProjects;
