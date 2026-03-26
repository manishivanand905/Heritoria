import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faCheck,
  faChevronDown,
  faMapMarkerAlt,
  faStar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import DreamHomeSection from "../../../components/Dreamhomesection/Dreamhomesection";
import {
  PageWrapper,
  PageContainer,
  FiltersSection,
  FilterDropdown,
  FilterButton,
  FilterDropdownContent,
  FilterOption,
  ProjectsGrid,
  ProjectCard,
  ProjectImage,
  FeaturedBadge,
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
  NoResults,
  PageHeader,
  ResultsCount,
  SearchContainer,
  SearchInput,
  SearchIcon,
} from "./ProjectsPage.styles";
import {
  budgetFilters,
  getAreaFilters,
  statusFilters,
} from "../../../data/projectFilters";
import { requestJson } from "../../../Services/api";

const ProjectsPage = () => {
  const history = useHistory();
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [budgetOpen, setBudgetOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const response = await requestJson("/projects");
        setProjectsData(response.data || []);
        setLoadError("");
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const areaFilters = useMemo(() => getAreaFilters(projectsData), [projectsData]);

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          project.name.toLowerCase().includes(query) ||
          project.builder.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Budget filter
      const budgetFilter = budgetFilters.find((f) => f.id === selectedBudget);
      if (budgetFilter && budgetFilter.value) {
        const [min, max] = budgetFilter.value;
        if (project.budgetValue < min || project.budgetValue > max) {
          return false;
        }
      }

      // Status filter
      const statusFilter = statusFilters.find((f) => f.id === selectedStatus);
      if (
        statusFilter &&
        statusFilter.value &&
        project.status !== statusFilter.value
      ) {
        return false;
      }

      // Area filter
      const areaFilter = areaFilters.find((f) => f.id === selectedArea);
      if (areaFilter && areaFilter.value && project.area !== areaFilter.value) {
        return false;
      }

      return true;
    });
  }, [
    areaFilters,
    projectsData,
    searchQuery,
    selectedArea,
    selectedBudget,
    selectedStatus,
  ]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "budget") {
      setSelectedBudget(value);
      setBudgetOpen(false);
    } else if (filterType === "status") {
      setSelectedStatus(value);
      setStatusOpen(false);
    } else if (filterType === "area") {
      setSelectedArea(value);
      setAreaOpen(false);
    }
  };

  const getSelectedLabel = (filterId, filters) => {
    const filter = filters.find((f) => f.id === filterId);
    return filter ? filter.label : filters[0].label;
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <PageContainer>
        <PageHeader>
          <h1>New Projects</h1>
          <ResultsCount>
            Explore {projectsData.length}+ curated residential projects in Hyderabad with exclusive
            benefits
          </ResultsCount>
        </PageHeader>

        <FiltersSection>
          {/* Search Input */}
          <SearchContainer>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search by project name, builder, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          {/* Budget Filter */}
          <FilterDropdown>
            <FilterButton
              onClick={() => {
                setBudgetOpen(!budgetOpen);
                setStatusOpen(false);
                setAreaOpen(false);
              }}
              isActive={selectedBudget !== "all"}
            >
              {getSelectedLabel(selectedBudget, budgetFilters)}
              <FontAwesomeIcon icon={faChevronDown} />
            </FilterButton>
            <FilterDropdownContent isOpen={budgetOpen}>
              {budgetFilters.map((filter) => (
                <FilterOption
                  key={filter.id}
                  onClick={() => handleFilterChange("budget", filter.id)}
                  isSelected={selectedBudget === filter.id}
                >
                  {selectedBudget === filter.id && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                  {filter.label}
                </FilterOption>
              ))}
            </FilterDropdownContent>
          </FilterDropdown>

          {/* Status Filter */}
          <FilterDropdown>
            <FilterButton
              onClick={() => {
                setStatusOpen(!statusOpen);
                setBudgetOpen(false);
                setAreaOpen(false);
              }}
              isActive={selectedStatus !== "all"}
            >
              {getSelectedLabel(selectedStatus, statusFilters)}
              <FontAwesomeIcon icon={faChevronDown} />
            </FilterButton>
            <FilterDropdownContent isOpen={statusOpen}>
              {statusFilters.map((filter) => (
                <FilterOption
                  key={filter.id}
                  onClick={() => handleFilterChange("status", filter.id)}
                  isSelected={selectedStatus === filter.id}
                >
                  {selectedStatus === filter.id && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                  {filter.label}
                </FilterOption>
              ))}
            </FilterDropdownContent>
          </FilterDropdown>

          {/* Area Filter */}
          <FilterDropdown>
            <FilterButton
              onClick={() => {
                setAreaOpen(!areaOpen);
                setBudgetOpen(false);
                setStatusOpen(false);
              }}
              isActive={selectedArea !== "all"}
            >
              {getSelectedLabel(selectedArea, areaFilters)}
              <FontAwesomeIcon icon={faChevronDown} />
            </FilterButton>
            <FilterDropdownContent isOpen={areaOpen}>
              {areaFilters.map((filter) => (
                <FilterOption
                  key={filter.id}
                  onClick={() => handleFilterChange("area", filter.id)}
                  isSelected={selectedArea === filter.id}
                >
                  {selectedArea === filter.id && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                  {filter.label}
                </FilterOption>
              ))}
            </FilterDropdownContent>
          </FilterDropdown>
        </FiltersSection>

        {isLoading ? (
          <NoResults>
            <p>Loading premium projects...</p>
          </NoResults>
        ) : loadError ? (
          <NoResults>
            <p>{loadError}</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </NoResults>
        ) : filteredProjects.length === 0 ? (
          <NoResults>
            <p>No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedBudget("all");
                setSelectedStatus("all");
                setSelectedArea("all");
              }}
            >
              Clear Filters
            </button>
          </NoResults>
        ) : (
          <ProjectsGrid>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectImage src={project.image} alt={project.name} />
                {project.featured && (
                  <FeaturedBadge>
                    <FontAwesomeIcon icon={faStar} /> Featured
                  </FeaturedBadge>
                )}

                <ProjectContent>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <ProjectDeveloper>by {project.builder}</ProjectDeveloper>

                  <ProjectMeta>
                    <MetaItem>
                      <MetaIcon>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                      </MetaIcon>
                      <MetaText>
                        {project.location} • {project.status}
                      </MetaText>
                    </MetaItem>
                  </ProjectMeta>

                  <ProjectFooter>
                    <PriceRange>
                      <Price>{project.budget}</Price>
                      <Configuration>
                        {project.bhk} • {project.size}
                      </Configuration>
                    </PriceRange>
                    <ViewButton onClick={() => history.push(`/project/${project.id}`)}>View</ViewButton>
                  </ProjectFooter>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </PageContainer>
      </PageWrapper>
      <DreamHomeSection />
      <Footer />
    </>
  );
};

export default ProjectsPage;
