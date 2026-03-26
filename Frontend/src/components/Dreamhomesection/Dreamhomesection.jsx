import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
  SectionContainer,
  ContentWrapper,
  LeftContent,
  Heading,
  DreamText,
  Subtext,
  ButtonGroup,
  BrowseButton,
  ScheduleButton,
  RightContent,
  BenefitsCard,
  CardTitle,
  BenefitItem,
  CheckIcon,
  BenefitContent,
  BenefitTitle,
  BenefitDescription,
  WhatsAppButton,
  WhatsAppIcon,
} from "./Dreamhomesection.styles";

const DreamHomeSection = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <LeftContent>
          <Heading>
            Ready to Find Your <DreamText>Dream Home?</DreamText>
          </Heading>
          <Subtext>
            Join 500+ families who've already unlocked exclusive benefits worth
            lakhs. Start your journey today with a quick consultation.
          </Subtext>
          <ButtonGroup>
            <BrowseButton>
              Browse Projects <FontAwesomeIcon icon={faArrowRight} />
            </BrowseButton>
            <ScheduleButton>
              <FontAwesomeIcon icon={faPhone} /> Schedule a Call
            </ScheduleButton>
          </ButtonGroup>
        </LeftContent>

        <RightContent>
          <BenefitsCard>
            <CardTitle>What You'll Get</CardTitle>

            <BenefitItem>
              <CheckIcon>
                <FontAwesomeIcon icon={faCircleCheck} />
              </CheckIcon>
              <BenefitContent>
                <BenefitTitle>Curated Project Access</BenefitTitle>
                <BenefitDescription>
                  25+ verified new projects in Hyderabad
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>

            <BenefitItem>
              <CheckIcon>
                <FontAwesomeIcon icon={faCircleCheck} />
              </CheckIcon>
              <BenefitContent>
                <BenefitTitle>Exclusive Benefits</BenefitTitle>
                <BenefitDescription>
                  Modular furniture, automation & more
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>

            <BenefitItem>
              <CheckIcon>
                <FontAwesomeIcon icon={faCircleCheck} />
              </CheckIcon>
              <BenefitContent>
                <BenefitTitle>Expert Guidance</BenefitTitle>
                <BenefitDescription>
                  Dedicated advisor throughout your journey
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>

            <WhatsAppButton>
              <WhatsAppIcon>
                <FontAwesomeIcon icon={faWhatsapp} />
              </WhatsAppIcon>
              Start WhatsApp Chat
            </WhatsAppButton>
          </BenefitsCard>
        </RightContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default DreamHomeSection;
