import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCreditCard,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import {
  HowItWorksSection,
  Container,
  Header,
  Subtitle,
  Title,
  Description,
  StepsContainer,
  StepCard,
  IconCircle,
  StepNumber,
  StepTitle,
  StepDescription,
  ConnectorLine,
} from "./Howitworks.styles";
import { howItWorksData } from "../../data/Howitworksdata";

const HowItWorks = () => {
  const iconMap = {
    search: faSearch,
    creditCard: faCreditCard,
    key: faKey,
  };

  return (
    <HowItWorksSection>
      <Container>
        <Header>
          <Subtitle>SIMPLE PROCESS</Subtitle>
          <Title>How It Works</Title>
          <Description>
            From discovery to keys in hand — we make buying your dream home
            straightforward.
          </Description>
        </Header>

        <StepsContainer>
          {howItWorksData.map((step, index) => (
            <React.Fragment key={step.id}>
              <StepCard>
                <IconCircle>
                  <FontAwesomeIcon icon={iconMap[step.icon]} />
                </IconCircle>
                <StepNumber>{step.number}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
              {index < howItWorksData.length - 1 && <ConnectorLine />}
            </React.Fragment>
          ))}
        </StepsContainer>
      </Container>
    </HowItWorksSection>
  );
};

export default HowItWorks;
