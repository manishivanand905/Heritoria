import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { requestJson } from "../../../Services/api";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faCalendar,
  faClock,
  faCheck,
  faBuilding,
  faIndianRupeeSign,
  faUtensils,
  faHome,
  faClipboardCheck,
  faCoins,
  faCreditCard,
  faPhone,
  faExternalLinkAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  PageContainer,
  HeroSection,
  HeroImage,
  HeroOverlay,
  HeroContent,
  BackButton,
  StatusBadge,
  ProjectTitle,
  BuilderName,
  ContentSection,
  HeroContainer,
  Container,
  SectionTitle,
  SectionDescription,
  OverviewGrid,
  InfoCard,
  InfoIcon,
  InfoLabel,
  InfoValue,
  BenefitsSection,
  BenefitsGrid,
  BenefitCard,
  BenefitIconWrapper,
  BenefitIcon,
  BenefitContent,
  BenefitTitle,
  BenefitDescription,
  BenefitValue,
  BenefitIncluded,
  TotalBenefitCard,
  TotalBenefitText,
  TotalBenefitValue,
  BenefitBadge,
  BenefitNote,
  SidebarSection,
  SidebarCard,
  PriceLabel,
  PriceValue,
  BenefitsNote,
  ClaimButton,
  ScheduleButton,
  HelpSection,
  HelpText,
  ContactButtons,
  CallButton,
  WhatsAppButton,
  AmenitiesSection,
  AmenitiesList,
  AmenityChip,
  LocationSection,
  LocationAddress,
  MapLink,
  TwoColumnLayout,
  MainContent,
  Sidebar,
  CompanyBadge,
  CompanyIcon,
  CompanyInfo,
  CompanyName,
  CompanyLocation,
  ModalBackdrop,
  ModalCard,
  ModalHeader,
  ModalEyebrow,
  ModalTitle,
  ModalCloseButton,
  ModalDescription,
  PlansGrid,
  PlanCard,
  PlanName,
  PlanPrice,
  PlanDescription,
  PlanFeatureList,
  PlanFeatureItem,
  SelectedPlanSummary,
  SummaryLabel,
  SummaryValue,
  FormSection,
  InputGrid,
  FieldGroup,
  FieldLabel,
  FieldInput,
  FieldSelect,
  FieldTextarea,
  ModalActions,
  PrimaryAction,
  SecondaryAction,
  SuccessCard,
  SuccessTitle,
  SuccessMessage,
  SuccessIcon,
  SlotGrid,
  SlotButton,
  InlineNote,
} from "./Projectdetail.styles";

const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "Rs. 1,999",
    description: "Ideal for first-time buyers who want benefit access.",
    features: [
      "Benefit unlock for this project",
      "Builder pricing support",
      "Documentation guidance",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rs. 4,999",
    description: "Best for families comparing units and negotiating.",
    features: [
      "Everything in Basic",
      "Priority site visit coordination",
      "Shortlist review and negotiation help",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: "Rs. 9,999",
    description: "White-glove support from selection to booking.",
    features: [
      "Everything in Premium",
      "Dedicated relationship manager",
      "Booking strategy and concierge support",
    ],
  },
];

const visitTimeSlots = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "2:00 PM - 3:00 PM",
  "4:00 PM - 5:00 PM",
];

const initialSubscriptionForm = {
  fullName: "",
  phone: "",
  email: "",
  preferredUnit: "",
  notes: "",
};

const initialVisitForm = {
  fullName: "",
  phone: "",
  email: "",
  visitDate: "",
  timeSlot: visitTimeSlots[0],
  guests: "2",
  notes: "",
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [projectError, setProjectError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const scrollTargetRef = useRef(0);
  const scrollAnimationFrameRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0].id);
  const [subscriptionSubmitted, setSubscriptionSubmitted] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [modalError, setModalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionForm, setSubscriptionForm] = useState(
    initialSubscriptionForm
  );
  const [visitForm, setVisitForm] = useState(initialVisitForm);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoadingProject(true);
        const response = await requestJson(`/projects/${id}`);
        setProject(response.data);
        setProjectError("");
      } catch (error) {
        setProjectError(error.message);
      } finally {
        setIsLoadingProject(false);
      }
    };

    loadProject();
  }, [id]);

  useEffect(() => {
    let currentScroll = window.scrollY;
    scrollTargetRef.current = currentScroll;
    setScrollY(currentScroll);

    const updateParallax = () => {
      const delta = scrollTargetRef.current - currentScroll;

      // Ease toward the latest scroll position to avoid jumpy hero movement.
      currentScroll += delta * 0.12;

      if (Math.abs(delta) < 0.1) {
        currentScroll = scrollTargetRef.current;
      }

      setScrollY(currentScroll);
      scrollAnimationFrameRef.current = window.requestAnimationFrame(
        updateParallax
      );
    };

    const handleScroll = () => {
      scrollTargetRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollAnimationFrameRef.current = window.requestAnimationFrame(
      updateParallax
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollAnimationFrameRef.current) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!activeModal) {
      document.body.style.overflow = "";
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  if (isLoadingProject) {
    return (
      <>
        <Header />
        <PageContainer>
          <div style={{ padding: "120px 24px", textAlign: "center" }}>
            Loading project experience...
          </div>
        </PageContainer>
        <Footer />
      </>
    );
  }

  if (!project || projectError) {
    return (
      <>
        <Header />
        <PageContainer>
          <div style={{ padding: "120px 24px", textAlign: "center" }}>
            {projectError || "Project not found"}
          </div>
        </PageContainer>
        <Footer />
      </>
    );
  }

  const handleBack = () => {
    window.history.back();
  };

  const handleOpenSubscription = () => {
    setActiveModal("subscription");
    setSelectedPlan(subscriptionPlans[0].id);
    setSubscriptionSubmitted(false);
    setSubscriptionForm(initialSubscriptionForm);
    setModalError("");
  };

  const handleOpenSiteVisit = () => {
    setActiveModal("siteVisit");
    setVisitSubmitted(false);
    setVisitForm(initialVisitForm);
    setModalError("");
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalError("");
  };

  const handleSubscriptionChange = (event) => {
    const { name, value } = event.target;
    setSubscriptionForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleVisitChange = (event) => {
    const { name, value } = event.target;
    setVisitForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubscriptionSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await requestJson("/requests", {
        method: "POST",
        body: JSON.stringify({
          requestType: "benefitClaim",
          projectId: project.id,
          projectName: project.name,
          builder: project.builder,
          fullName: subscriptionForm.fullName,
          phone: subscriptionForm.phone,
          email: subscriptionForm.email,
          preferredUnit: subscriptionForm.preferredUnit,
          notes: subscriptionForm.notes,
          planId: selectedPlanDetails.id,
          planName: selectedPlanDetails.name,
          planPrice: selectedPlanDetails.price,
        }),
      });

      setSubscriptionSubmitted(true);
      setModalError("");
    } catch (error) {
      setModalError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVisitSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await requestJson("/requests", {
        method: "POST",
        body: JSON.stringify({
          requestType: "siteVisit",
          projectId: project.id,
          projectName: project.name,
          builder: project.builder,
          fullName: visitForm.fullName,
          phone: visitForm.phone,
          email: visitForm.email,
          visitDate: visitForm.visitDate,
          timeSlot: visitForm.timeSlot,
          guests: visitForm.guests,
          notes: visitForm.notes,
        }),
      });

      setVisitSubmitted(true);
      setModalError("");
    } catch (error) {
      setModalError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBenefitIcon = (iconType) => {
    switch (iconType) {
      case "kitchen":
        return faUtensils;
      case "automation":
        return faHome;
      case "inspection":
        return faClipboardCheck;
      default:
        return faCoins;
    }
  };

  const selectedPlanDetails =
    subscriptionPlans.find((plan) => plan.id === selectedPlan) ||
    subscriptionPlans[0];

  return (
    <>
      <Header />
      <PageContainer>
        <HeroSection>
          <HeroImage style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0)` }}>
            <img src={project.image} alt={project.name} />
          </HeroImage>
          <HeroOverlay>
            <HeroContainer>
              <HeroContent>
                <BackButton onClick={handleBack}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Back to Projects
                </BackButton>
                <StatusBadge status={project.status}>{project.status}</StatusBadge>
                <ProjectTitle>{project.name}</ProjectTitle>
                <BuilderName>by {project.builder}</BuilderName>
              </HeroContent>
            </HeroContainer>
          </HeroOverlay>
        </HeroSection>

        <Container>
          <TwoColumnLayout>
            <MainContent>
              <ContentSection>
                <SectionTitle>Project Overview</SectionTitle>
                <SectionDescription>{project.description}</SectionDescription>

                <OverviewGrid>
                  <InfoCard>
                    <InfoIcon>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </InfoIcon>
                    <div>
                      <InfoLabel>Location</InfoLabel>
                      <InfoValue>{project.location}</InfoValue>
                    </div>
                  </InfoCard>

                  <InfoCard>
                    <InfoIcon>
                      <FontAwesomeIcon icon={faCalendar} />
                    </InfoIcon>
                    <div>
                      <InfoLabel>Possession</InfoLabel>
                      <InfoValue>{project.possession}</InfoValue>
                    </div>
                  </InfoCard>

                  <InfoCard>
                    <InfoIcon>
                      <FontAwesomeIcon icon={faBuilding} />
                    </InfoIcon>
                    <div>
                      <InfoLabel>Unit Types</InfoLabel>
                      <InfoValue>{project.unitTypes}</InfoValue>
                    </div>
                  </InfoCard>

                  <InfoCard>
                    <InfoIcon>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                    </InfoIcon>
                    <div>
                      <InfoLabel>Price Range</InfoLabel>
                      <InfoValue>{project.priceRange}</InfoValue>
                    </div>
                  </InfoCard>
                </OverviewGrid>
              </ContentSection>

              <ContentSection>
                <SectionTitle>Your Exclusive Benefits</SectionTitle>
                <SectionDescription>
                  When you buy through Heritoria, you get these additional benefits
                  at no extra cost.
                </SectionDescription>

                <BenefitsSection>
                  <BenefitsGrid>
                    <CompanyBadge>
                      <CompanyIcon>H</CompanyIcon>
                      <CompanyInfo>
                        <CompanyName>Heritoria</CompanyName>
                        <CompanyLocation>New Projects, Hyderabad</CompanyLocation>
                      </CompanyInfo>
                    </CompanyBadge>

                    {project.benefits.map((benefit) => (
                      <BenefitCard key={benefit.id}>
                        <BenefitIconWrapper>
                          <BenefitIcon>
                            <FontAwesomeIcon
                              icon={getBenefitIcon(benefit.icon)}
                            />
                          </BenefitIcon>
                        </BenefitIconWrapper>
                        <BenefitContent>
                          <BenefitTitle>{benefit.title}</BenefitTitle>
                          <BenefitDescription>
                            {benefit.description}
                          </BenefitDescription>
                        </BenefitContent>
                        {benefit.value === "Included" ? (
                          <BenefitIncluded>{benefit.value}</BenefitIncluded>
                        ) : (
                          <BenefitValue>{benefit.value}</BenefitValue>
                        )}
                      </BenefitCard>
                    ))}

                    <TotalBenefitCard>
                      <div>
                        <TotalBenefitText>Total Benefit Value</TotalBenefitText>
                        <BenefitNote>
                          (Note: Guaranteed benefits were provided)
                        </BenefitNote>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <TotalBenefitValue>
                          {project.totalBenefitValue}
                        </TotalBenefitValue>
                        <BenefitBadge>
                          <FontAwesomeIcon icon={faCoins} />
                        </BenefitBadge>
                      </div>
                    </TotalBenefitCard>
                  </BenefitsGrid>
                </BenefitsSection>
              </ContentSection>

              <ContentSection>
                <SectionTitle>Amenities</SectionTitle>
                <AmenitiesSection>
                  <AmenitiesList>
                    {project.amenities.map((amenity, index) => (
                      <AmenityChip key={index}>{amenity}</AmenityChip>
                    ))}
                  </AmenitiesList>
                </AmenitiesSection>
              </ContentSection>

              <ContentSection>
                <SectionTitle>Location</SectionTitle>
                <LocationSection>
                  <LocationAddress>{project.locationAddress}</LocationAddress>
                  <MapLink
                    href={project.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps{" "}
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </MapLink>
                </LocationSection>
              </ContentSection>
            </MainContent>

            <Sidebar>
              <SidebarSection>
                <SidebarCard>
                  <PriceLabel>Price Range</PriceLabel>
                  <PriceValue>{project.priceRange}</PriceValue>
                  <BenefitsNote>
                    + Benefits worth {project.benefitsWorth}
                  </BenefitsNote>

                  <ClaimButton type="button" onClick={handleOpenSubscription}>
                    <FontAwesomeIcon icon={faCoins} /> Claim Benefits
                  </ClaimButton>

                  <ScheduleButton type="button" onClick={handleOpenSiteVisit}>
                    <FontAwesomeIcon icon={faCalendar} /> Schedule Site Visit
                  </ScheduleButton>

                  <HelpSection>
                    <HelpText>Need help deciding?</HelpText>
                    <ContactButtons>
                      <CallButton type="button">
                        <FontAwesomeIcon icon={faPhone} /> Call
                      </CallButton>
                      <WhatsAppButton type="button">
                        <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                      </WhatsAppButton>
                    </ContactButtons>
                  </HelpSection>
                </SidebarCard>
              </SidebarSection>
            </Sidebar>
          </TwoColumnLayout>
        </Container>
      </PageContainer>

      {activeModal === "subscription" && (
        <ModalBackdrop onClick={closeModal}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalEyebrow>Membership Plans</ModalEyebrow>
                <ModalTitle>Choose a benefit subscription</ModalTitle>
                <ModalDescription>
                  Pick the plan that fits your buying journey for {project.name},
                  then share your details to continue to payment.
                </ModalDescription>
              </div>
              <ModalCloseButton type="button" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </ModalCloseButton>
            </ModalHeader>

            {subscriptionSubmitted ? (
              <SuccessCard>
                <SuccessTitle>Subscription details captured</SuccessTitle>
                <SuccessMessage>
                  {subscriptionForm.fullName}, your {selectedPlanDetails.name}
                  {" "}plan request for {project.name} is ready for the next
                  payment step. Connect your payment gateway to charge{" "}
                  {selectedPlanDetails.price}.
                </SuccessMessage>
                <ModalActions>
                  <SecondaryAction type="button" onClick={closeModal}>
                    Close
                  </SecondaryAction>
                </ModalActions>
              </SuccessCard>
            ) : (
              <form onSubmit={handleSubscriptionSubmit}>
                {modalError ? (
                  <InlineNote style={{ color: "#d64545" }}>{modalError}</InlineNote>
                ) : null}
                <PlansGrid>
                  {subscriptionPlans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      type="button"
                      isSelected={selectedPlan === plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <PlanName>{plan.name}</PlanName>
                      <PlanPrice>{plan.price}</PlanPrice>
                      <PlanDescription>{plan.description}</PlanDescription>
                      <PlanFeatureList>
                        {plan.features.map((feature) => (
                          <PlanFeatureItem key={feature}>{feature}</PlanFeatureItem>
                        ))}
                      </PlanFeatureList>
                    </PlanCard>
                  ))}
                </PlansGrid>

                <SelectedPlanSummary>
                  <div>
                    <SummaryLabel>Selected Project</SummaryLabel>
                    <SummaryValue>{project.name}</SummaryValue>
                  </div>
                  <div>
                    <SummaryLabel>Builder</SummaryLabel>
                    <SummaryValue>{project.builder}</SummaryValue>
                  </div>
                  <div>
                    <SummaryLabel>Selected Plan</SummaryLabel>
                    <SummaryValue>{selectedPlanDetails.name}</SummaryValue>
                  </div>
                  <div>
                    <SummaryLabel>Amount to Pay</SummaryLabel>
                    <SummaryValue>{selectedPlanDetails.price}</SummaryValue>
                  </div>
                </SelectedPlanSummary>

                <FormSection>
                  <InputGrid>
                    <FieldGroup>
                      <FieldLabel>Project</FieldLabel>
                      <FieldInput value={project.name} readOnly />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Builder</FieldLabel>
                      <FieldInput value={project.builder} readOnly />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Full Name</FieldLabel>
                      <FieldInput
                        name="fullName"
                        value={subscriptionForm.fullName}
                        onChange={handleSubscriptionChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Phone Number</FieldLabel>
                      <FieldInput
                        type="tel"
                        name="phone"
                        value={subscriptionForm.phone}
                        onChange={handleSubscriptionChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Email Address</FieldLabel>
                      <FieldInput
                        type="email"
                        name="email"
                        value={subscriptionForm.email}
                        onChange={handleSubscriptionChange}
                        placeholder="Enter your email"
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Preferred Unit</FieldLabel>
                      <FieldInput
                        name="preferredUnit"
                        value={subscriptionForm.preferredUnit}
                        onChange={handleSubscriptionChange}
                        placeholder="Example: 3 BHK, east-facing"
                      />
                    </FieldGroup>
                  </InputGrid>

                  <FieldGroup>
                    <FieldLabel>Notes</FieldLabel>
                    <FieldTextarea
                      name="notes"
                      value={subscriptionForm.notes}
                      onChange={handleSubscriptionChange}
                      placeholder="Share any requirements before payment"
                      rows="4"
                    />
                  </FieldGroup>

                  <InlineNote>
                    <FontAwesomeIcon icon={faCreditCard} /> Review your selected
                    plan, fill in your details, and continue to complete the
                    subscription payment securely.
                  </InlineNote>
                </FormSection>

                <ModalActions>
                  <SecondaryAction type="button" onClick={closeModal}>
                    Cancel
                  </SecondaryAction>
                  <PrimaryAction type="submit">
                    <FontAwesomeIcon icon={faCreditCard} />{" "}
                    {isSubmitting ? "Saving..." : "Continue to Payment"}
                  </PrimaryAction>
                </ModalActions>
              </form>
            )}
          </ModalCard>
        </ModalBackdrop>
      )}

      {activeModal === "siteVisit" && (
        <ModalBackdrop onClick={closeModal}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalEyebrow>Site Visit Booking</ModalEyebrow>
                <ModalTitle>Reserve your visit slot</ModalTitle>
                <ModalDescription>
                  Choose your preferred date and time for a guided visit to{" "}
                  {project.name}.
                </ModalDescription>
              </div>
              <ModalCloseButton type="button" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </ModalCloseButton>
            </ModalHeader>

            {visitSubmitted ? (
              <SuccessCard>
                <SuccessIcon>
                  <FontAwesomeIcon icon={faCheck} />
                </SuccessIcon>
                <SuccessTitle>Site visit booked</SuccessTitle>
                <SuccessMessage>
                  Your visit for {project.name} is scheduled on{" "}
                  {visitForm.visitDate} during {visitForm.timeSlot}. Our team
                  will contact {visitForm.fullName} shortly to confirm it.
                </SuccessMessage>
                <ModalActions>
                  <SecondaryAction type="button" onClick={closeModal}>
                    Close
                  </SecondaryAction>
                </ModalActions>
              </SuccessCard>
            ) : (
              <form onSubmit={handleVisitSubmit}>
                {modalError ? (
                  <InlineNote style={{ color: "#d64545" }}>{modalError}</InlineNote>
                ) : null}
                <FormSection>
                  <FieldGroup>
                    <FieldLabel>Available Time Slots</FieldLabel>
                    <SlotGrid>
                      {visitTimeSlots.map((slot) => (
                        <SlotButton
                          key={slot}
                          type="button"
                          isSelected={visitForm.timeSlot === slot}
                          onClick={() =>
                            setVisitForm((current) => ({
                              ...current,
                              timeSlot: slot,
                            }))
                          }
                        >
                          <FontAwesomeIcon icon={faClock} /> {slot}
                        </SlotButton>
                      ))}
                    </SlotGrid>
                  </FieldGroup>

                  <InputGrid>
                    <FieldGroup>
                      <FieldLabel>Full Name</FieldLabel>
                      <FieldInput
                        name="fullName"
                        value={visitForm.fullName}
                        onChange={handleVisitChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Phone Number</FieldLabel>
                      <FieldInput
                        type="tel"
                        name="phone"
                        value={visitForm.phone}
                        onChange={handleVisitChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Email Address</FieldLabel>
                      <FieldInput
                        type="email"
                        name="email"
                        value={visitForm.email}
                        onChange={handleVisitChange}
                        placeholder="Enter your email"
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Visit Date</FieldLabel>
                      <FieldInput
                        type="date"
                        name="visitDate"
                        value={visitForm.visitDate}
                        onChange={handleVisitChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>No. of Visitors</FieldLabel>
                      <FieldSelect
                        name="guests"
                        value={visitForm.guests}
                        onChange={handleVisitChange}
                      >
                        <option value="1">1 visitor</option>
                        <option value="2">2 visitors</option>
                        <option value="3">3 visitors</option>
                        <option value="4">4 visitors</option>
                      </FieldSelect>
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Project</FieldLabel>
                      <FieldInput value={project.name} readOnly />
                    </FieldGroup>
                  </InputGrid>

                  <FieldGroup>
                    <FieldLabel>Special Request</FieldLabel>
                    <FieldTextarea
                      name="notes"
                      value={visitForm.notes}
                      onChange={handleVisitChange}
                      placeholder="Ask for pickup, unit preference, or anything else"
                      rows="4"
                    />
                  </FieldGroup>
                </FormSection>

                <ModalActions>
                  <SecondaryAction type="button" onClick={closeModal}>
                    Cancel
                  </SecondaryAction>
                  <PrimaryAction type="submit">
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    {isSubmitting ? "Booking..." : "Book Site Visit"}
                  </PrimaryAction>
                </ModalActions>
              </form>
            )}
          </ModalCard>
        </ModalBackdrop>
      )}

      <Footer />
    </>
  );
};

export default ProjectDetail;
