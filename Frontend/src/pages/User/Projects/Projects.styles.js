import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #f8f9fa;

  @media (max-width: 768px) {
    padding: 30px 16px;
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 36px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;

    h1 {
      font-size: 28px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 24px;
    }
  }
`;

export const ResultsCount = styled.p`
  font-size: 16px;
  color: #6b6b6b;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const FiltersSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FilterDropdown = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: 180px;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  width: 100%;
  background: ${(props) => (props.isActive ? "#f5a623" : "#ffffff")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#1a1a1a")};
  border: 2px solid ${(props) => (props.isActive ? "#f5a623" : "#e0e0e0")};
  border-radius: 8px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  svg {
    font-size: 14px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${(props) => (props.isActive ? "#e69512" : "#f8f8f8")};
    border-color: ${(props) => (props.isActive ? "#e69512" : "#d0d0d0")};
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 12px 16px;
  }
`;

export const FilterDropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FilterOption = styled.div`
  padding: 12px 20px;
  font-size: 15px;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${(props) => (props.isSelected ? "#fff8e6" : "#ffffff")};
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};

  svg {
    color: #f5a623;
    font-size: 14px;
  }

  &:hover {
    background: #f8f8f8;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ProjectCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f5a623;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    font-size: 12px;
    padding: 5px 10px;
  }
`;

export const ProjectContent = styled.div`
  padding: 24px;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const ProjectLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b6b6b;
  font-size: 15px;
  margin-bottom: 16px;

  svg {
    color: #f5a623;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 14px;
  }
`;

export const ProjectDetails = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    gap: 16px;
    margin-bottom: 14px;
  }
`;

export const ProjectDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b6b6b;
  font-size: 14px;

  svg {
    color: #2d9f6f;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 6px;

    svg {
      font-size: 12px;
    }
  }
`;

export const ProjectPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #2d9f6f;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

export const ProjectStatus = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
  background: ${(props) => {
    if (props.status === "Ready to Move") return "#d4f4e6";
    if (props.status === "Under Construction") return "#fff3cd";
    if (props.status === "Pre-Launch") return "#e8f4fd";
    return "#f0f0f0";
  }};
  color: ${(props) => {
    if (props.status === "Ready to Move") return "#2d9f6f";
    if (props.status === "Under Construction") return "#f5a623";
    if (props.status === "Pre-Launch") return "#3498db";
    return "#6b6b6b";
  }};

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 5px 10px;
    margin-bottom: 14px;
  }
`;

export const ViewButton = styled.button`
  width: 100%;
  background: transparent;
  color: #f5a623;
  border: 2px solid #f5a623;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f5a623;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 166, 35, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 80px 20px;

  p {
    font-size: 18px;
    color: #6b6b6b;
    margin-bottom: 24px;
  }

  button {
    background: #f5a623;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 14px 32px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #e69512;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(245, 166, 35, 0.4);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;

    p {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 40px 16px;

    p {
      font-size: 15px;
    }

    button {
      font-size: 15px;
      padding: 12px 28px;
    }
  }
`;
