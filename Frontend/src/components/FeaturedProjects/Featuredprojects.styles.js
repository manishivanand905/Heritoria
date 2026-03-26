import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const marqueeScroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

export const FeaturedSection = styled.section`
  padding: 100px 100px;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 60px 1rem;
  }

  @media (max-width: 480px) {
    padding: 40px 1rem;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const SectionLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #16a085;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 2.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: #ffffff;
  color: #2c3e50;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.938rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;

  svg {
    font-size: 0.875rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: #16a085;
    color: #16a085;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    svg {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
`;

export const ProjectsGrid = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  &:hover > div {
    animation-play-state: paused;
  }
`;

export const ProjectsTrack = styled.div`
  display: flex;
  align-items: stretch;
  gap: 2rem;
  width: max-content;
  animation: ${marqueeScroll} 22s linear infinite;
  will-change: transform;

  @media (max-width: 768px) {
    gap: 1.25rem;
    animation-duration: 18s;
  }
`;

export const ProjectSlide = styled.div`
  flex: 0 0 380px;

  @media (max-width: 1024px) {
    flex-basis: 340px;
  }

  @media (max-width: 768px) {
    flex-basis: 300px;
  }
`;

export const ProjectCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  animation: ${fadeInUp} 0.6s ease-out backwards;
  animation-delay: calc(var(--index) * 0.1s);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const ProjectMedia = styled.div`
  position: relative;
  overflow: hidden;
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

export const StatusBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(22, 160, 133, 0.95);
  backdrop-filter: blur(10px);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.813rem;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 4px 12px rgba(22, 160, 133, 0.3);
  z-index: 2;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.438rem 0.875rem;
    font-size: 0.75rem;
  }
`;

export const BenefitBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.625rem 1rem;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.3s ease;
  width: fit-content;

  ${ProjectCard}:hover & {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    top: auto;
    right: auto;
    height: 38px;
    min-height: 38px;
    padding: 0 0.875rem;
    bottom: 0.875rem;
    max-width: calc(100% - 2rem);
    box-sizing: border-box;
    overflow: hidden;
    gap: 0.375rem;
  }

  @media (max-width: 480px) {
    height: 38px;
    min-height: 38px;
    bottom: 0.75rem;
    left: 0.75rem;
    padding: 0 0.75rem;
    max-width: calc(100% - 1.5rem);
    overflow: hidden;
  }
`;

export const BenefitIcon = styled.span`
  color: #f39c12;
  font-size: 1rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const BenefitText = styled.span`
  color: #2c3e50;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1;
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
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;

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

export const ViewButtonIcon = styled.span`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  ${ViewButton}:hover & {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    font-size: 0.813rem;
  }
`;
