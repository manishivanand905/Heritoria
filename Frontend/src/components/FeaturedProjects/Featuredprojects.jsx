import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faLocationDot,
  faCalendar,
  faArrowRight,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { requestJson } from "../../Services/api";
import {
  FeaturedSection,
  Container,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  ViewAllButton,
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
} from "./Featuredprojects.styles";

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
          <ViewAllButton to="/projects">
            View All Projects
            <FontAwesomeIcon icon={faArrowRight} />
          </ViewAllButton>
        </SectionHeader>

        <ProjectsGrid>
          <ProjectsTrack>
            {marqueeProjects.map((project, index) => (
              <ProjectSlide key={`${project.id}-${index}`}>
                <ProjectCard>
                  <ProjectMedia>
                    <ProjectImage src={project.image} alt={project.name} />
                    <StatusBadge>{project.status}</StatusBadge>
                    <BenefitBadge>
                      <BenefitIcon>
                        <FontAwesomeIcon icon={faCoins} />
                      </BenefitIcon>
                      <BenefitText>Benefits worth {project.benefitsWorth}</BenefitText>
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
                        <Price>{project.priceRange}</Price>
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
        </ProjectsGrid>
      </Container>
    </FeaturedSection>
  );
};

export default FeaturedProjects;
