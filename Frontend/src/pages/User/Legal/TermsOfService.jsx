import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 40px 20px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 50px 60px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0d7d6e;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 30px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-4px);
  }
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #1a1a1a;
  margin-bottom: 15px;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DateText = styled.p`
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  color: #0d7d6e;
  font-size: 1.5rem;
  margin-top: 35px;
  margin-bottom: 15px;
`;

const Text = styled.p`
  color: #4a4a4a;
  line-height: 1.7;
  margin-bottom: 15px;
`;

const TermsOfService = () => {
  return (
    <PageWrapper>
      <Container>
        <BackButton to="/">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </BackButton>
        <Title>Terms of Service</Title>
        <DateText>Effective Date: April 14, 2026</DateText>

        <Text>
          Welcome to Heritoria. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
        </Text>

        <SectionTitle>1. Use of Our Services</SectionTitle>
        <Text>
          Heritoria provides a platform to discover and invest in premium heritage residential projects. You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
        </Text>

        <SectionTitle>2. Property Listings and Information</SectionTitle>
        <Text>
          While we strive to provide accurate and up-to-date information regarding property listings, prices, floor plans, and benefits, we do not warrant the completeness or accuracy of the information provided on our platform. Property availability, pricing, and project details are subject to change without prior notice based on the developer's discretion.
        </Text>

        <SectionTitle>3. User Accounts</SectionTitle>
        <Text>
          Some areas of our website may require you to register for an account. You must provide accurate and complete information and keep your account credentials secure. You are fully responsible for all activities that occur under your account. We reserve the right to suspend or terminate your account if we suspect any fraudulent, abusive, or illegal activity.
        </Text>

        <SectionTitle>4. Intellectual Property Rights</SectionTitle>
        <Text>
          All content, trademarks, logos, design, and intellectual property found on Heritoria are owned by us or our licensors. You may not reproduce, distribute, modify, or create derivative works of any material from our website without our explicit written consent.
        </Text>

        <SectionTitle>5. Limitation of Liability</SectionTitle>
        <Text>
          To the fullest extent permitted by applicable law, Heritoria shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the website or inability to access the properties listed.
        </Text>

        <SectionTitle>6. Third-Party Links</SectionTitle>
        <Text>
          Our website may contain links to third-party web sites or services that are not owned or controlled by Heritoria. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
        </Text>

        <SectionTitle>7. Changes to These Terms</SectionTitle>
        <Text>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms.
        </Text>

        <SectionTitle>8. Contact Us</SectionTitle>
        <Text>
          If you have any questions about these Terms, please contact us at: <strong>hello@heritoria.in</strong>
        </Text>
      </Container>
    </PageWrapper>
  );
};

export default TermsOfService;
