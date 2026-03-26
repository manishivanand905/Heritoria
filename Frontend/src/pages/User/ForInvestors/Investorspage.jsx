import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { requestJson } from "../../../Services/api";
import {
  faArrowTrendUp,
  faClock,
  faUsers,
  faShieldAlt,
  faIndianRupeeSign,
  faBuilding,
  faCheckCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  PageContainer,
  HeroSection,
  Container,
  Badge,
  HeroTitle,
  HeroTitleGreen,
  HeroDescription,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  WhyInvestSection,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  ProcessSection,
  TwoColumnLayout,
  ProcessContent,
  ProcessList,
  ProcessItem,
  ProcessNumber,
  ProcessInfo,
  ProcessTitle,
  ProcessDescription,
  FormSection,
  FormCard,
  FormTitle,
  FormSubtitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  SubmitButton,
  SecurityNote,
  SecurityIcon,
} from "./Investorspage.styles";

const InvestorsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    budget: "",
    timeline: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await requestJson("/investors", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setFeedback({
        type: "success",
        text: "Your investment consultation request has been captured. Our team will reach out within 24 hours.",
      });
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        budget: "",
        timeline: "",
        notes: "",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { value: "12-15%", label: "Avg. Annual Returns" },
    { value: "₹100 Cr+", label: "Investments Facilitated" },
    { value: "150+", label: "Active Investors" },
  ];

  const features = [
    {
      icon: faArrowTrendUp,
      title: "Early Access Advantage",
      description:
        "Get first pick of prime units before public launch. Early buyers often see 15-20% appreciation by possession.",
    },
    {
      icon: faClock,
      title: "Pre-Launch Pricing",
      description:
        "Access exclusive pre-launch rates that are typically 10-15% lower than post-launch prices.",
    },
    {
      icon: faUsers,
      title: "Bulk Deal Power",
      description:
        "Investing in multiple units? We negotiate better terms and additional discounts for portfolio buyers.",
    },
    {
      icon: faShieldAlt,
      title: "Due Diligence Support",
      description:
        "Our team verifies builder credentials, legal compliance, and project viability before recommendation.",
    },
    {
      icon: faIndianRupeeSign,
      title: "ROI Analysis",
      description:
        "Get detailed analysis of expected rental yields, capital appreciation, and break-even projections.",
    },
    {
      icon: faBuilding,
      title: "Portfolio Management",
      description:
        "From acquisition to rental management to exit — we support your entire investment journey.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery Call",
      description:
        "Understand your investment goals, risk appetite, and timeline",
    },
    {
      number: "02",
      title: "Curated Shortlist",
      description:
        "Receive handpicked projects matching your investment criteria",
    },
    {
      number: "03",
      title: "Due Diligence",
      description: "Full legal, financial, and market analysis for each option",
    },
    {
      number: "04",
      title: "Negotiation & Booking",
      description: "We secure the best deal and handle all paperwork",
    },
    {
      number: "05",
      title: "Post-Purchase Support",
      description: "Rental management, resale assistance, and ongoing advisory",
    },
  ];

  return (
    <>
      <Header />
      <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Badge>
            <FontAwesomeIcon icon={faArrowTrendUp} /> For Smart Investors
          </Badge>
          <HeroTitle>
            Invest in Hyderabad's
            <br />
            <HeroTitleGreen>Fastest Growing Market</HeroTitleGreen>
          </HeroTitle>
          <HeroDescription>
            Hyderabad's real estate market has delivered consistent 12-15%
            annual appreciation. With our exclusive partnerships and early
            access deals, we help investors maximize returns while minimizing
            risk.
          </HeroDescription>

          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </Container>
      </HeroSection>

      {/* Why Invest With Us Section */}
      <WhyInvestSection>
        <Container>
          <SectionTitle>Why Invest With Us</SectionTitle>
          <SectionSubtitle>
            We're not just brokers — we're your investment partners with skin in
            the game.
          </SectionSubtitle>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  <FontAwesomeIcon icon={feature.icon} />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </WhyInvestSection>

      {/* Investment Process Section */}
      <ProcessSection>
        <Container>
          <TwoColumnLayout>
            <ProcessContent>
              <SectionTitle>Our Investment Process</SectionTitle>
              <SectionSubtitle>
                We've streamlined real estate investment to make it as simple as
                possible for busy professionals and seasoned investors alike.
              </SectionSubtitle>

              <ProcessList>
                {processSteps.map((step, index) => (
                  <ProcessItem key={index}>
                    <ProcessNumber>{step.number}</ProcessNumber>
                    <ProcessInfo>
                      <ProcessTitle>{step.title}</ProcessTitle>
                      <ProcessDescription>
                        {step.description}
                      </ProcessDescription>
                    </ProcessInfo>
                  </ProcessItem>
                ))}
              </ProcessList>
            </ProcessContent>

            <FormSection>
              <FormCard>
                <FormTitle>Start Your Investment Journey</FormTitle>
                <FormSubtitle>
                  Fill the form below and our investment team will reach out
                  within 24 hours.
                </FormSubtitle>

                {feedback ? (
                  <SecurityNote
                    style={{
                      marginBottom: "20px",
                      color: feedback.type === "error" ? "#d64545" : undefined,
                    }}
                  >
                    <SecurityIcon>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </SecurityIcon>
                    {feedback.text}
                  </SecurityNote>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <FormGrid>
                    <FormGroup>
                      <Label>Full Name *</Label>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Your name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Phone Number *</Label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </FormGrid>

                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGrid>
                    <FormGroup>
                      <Label>Investment Budget *</Label>
                      <Select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select budget</option>
                        <option value="under50L">Under ₹50 Lakhs</option>
                        <option value="50L-1Cr">₹50 Lakhs - ₹1 Cr</option>
                        <option value="1Cr-2Cr">₹1 Cr - ₹2 Cr</option>
                        <option value="2Cr-5Cr">₹2 Cr - ₹5 Cr</option>
                        <option value="above5Cr">Above ₹5 Cr</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>Investment Timeline</Label>
                      <Select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">
                          Immediate (0-3 months)
                        </option>
                        <option value="short">Short-term (3-6 months)</option>
                        <option value="medium">
                          Medium-term (6-12 months)
                        </option>
                        <option value="long">Long-term (12+ months)</option>
                      </Select>
                    </FormGroup>
                  </FormGrid>

                  <FormGroup>
                    <Label>Additional Notes</Label>
                    <TextArea
                      name="notes"
                      placeholder="Tell us about your investment goals, preferred areas, or any specific requirements..."
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                    />
                  </FormGroup>

                  <SubmitButton type="submit">
                    {isSubmitting ? "Submitting..." : "Get Investment Consultation"}{" "}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </SubmitButton>

                  <SecurityNote>
                    <SecurityIcon>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </SecurityIcon>
                    Your information is secure and will only be used to contact
                    you about investment opportunities.
                  </SecurityNote>
                </form>
              </FormCard>
            </FormSection>
          </TwoColumnLayout>
        </Container>
      </ProcessSection>
    </PageContainer>
    <Footer />
    </>
  );
};

export default InvestorsPage;
