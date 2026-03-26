import styled from "styled-components";

export const PageWrapper = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
`;

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const PageHeader = styled.div`
  margin-bottom: 40px;

  h1 {
    font-size: 36px;
    color: #1a1a1a;
    margin-bottom: 10px;
  }
`;

export const ResultsCount = styled.p`
  color: #666;
  font-size: 16px;
`;

export const FiltersSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

export const FilterDropdown = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

export const FilterButton = styled.button`
  background: transparent;
  color: #333;
  border: 2px solid #e7e2da;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #197663;
    color: #fff;
    border-color: #197663;
  }
`;

export const FilterDropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const FilterOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${(props) => (props.isSelected ? "#f0f9f7" : "transparent")};
  color: ${(props) => (props.isSelected ? "#197663" : "#333")};

  &:hover {
    background: #f0f9f7;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ProjectCard = styled.div`
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    height: 240px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(236, 171, 19, 0.95);
  backdrop-filter: blur(10px);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.813rem;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 4px 12px rgba(236, 171, 19, 0.3);
  z-index: 2;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.438rem 0.875rem;
    font-size: 0.75rem;
  }
`;

export const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const ProjectTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.375rem;
  font-weight: 700;
  color: #0d7d6e;
  margin: 0;
  line-height: 1.3;
  transition: color 0.3s ease;

  ${ProjectCard}:hover & {
    color: #16a085;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ProjectDeveloper = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;
  font-weight: 500;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;

export const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0;

  @media (max-width: 768px) {
    gap: 1.25rem;
    padding: 0;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MetaIcon = styled.span`
  color: #95a5a6;
  font-size: 0.875rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;

export const MetaText = styled.span`
  color: #7f8c8d;
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;

export const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Price = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0d7d6e;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Configuration = styled.div`
  font-size: 0.75rem;
  color: #7f8c8d;
  font-weight: 500;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.688rem;
  }
`;

export const ProjectLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;

  svg {
    color: #95a5a6;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;

export const ProjectDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`;

export const ProjectDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.875rem;
  font-weight: 500;

  svg {
    color: #95a5a6;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;

export const ProjectPrice = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0d7d6e;
  line-height: 1;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ProjectStatus = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.813rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: capitalize;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(22, 160, 133, 0.3);
  background: ${(props) => {
    switch (props.status) {
      case "Ready to Move":
        return "rgba(22, 160, 133, 0.95)";
      case "Under Construction":
        return "rgba(243, 156, 18, 0.95)";
      case "Pre-Launch":
        return "rgba(149, 165, 166, 0.95)";
      default:
        return "rgba(149, 165, 166, 0.95)";
    }
  }};
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 0.438rem 0.875rem;
    font-size: 0.75rem;
  }
`;

export const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 38px;
  width: 80px;
  background: transparent;
  color: #0d7d6e;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.813rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #0d7d6e;
    color: #ffffff;
    border-color: #0d7d6e;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(22, 160, 133, 0.3);
  }

  &:active {
    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    height: 36px;
    width: 75px;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    background: #197663;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background: #155a4a;
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 45px;
  border: 2px solid #e7e2da;
  border-radius: 8px;
  font-size: 16px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #197663;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  pointer-events: none;
`;
