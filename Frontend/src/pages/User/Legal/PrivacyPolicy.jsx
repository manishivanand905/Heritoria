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

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
  color: #4a4a4a;
  
  li {
    line-height: 1.7;
    margin-bottom: 8px;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <Container>
        <BackButton to="/">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
        </BackButton>
        <Title>Privacy Policy</Title>
        <DateText>Effective Date: April 14, 2026</DateText>

        <Text>
          Welcome to Heritoria. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </Text>

        <SectionTitle>1. Data We Collect</SectionTitle>
        <Text>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</Text>
        <List>
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
        </List>

        <SectionTitle>2. How We Use Your Data</SectionTitle>
        <Text>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</Text>
        <List>
          <li>To provide and maintain our services to you as an investor or home buyer.</li>
          <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
          <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance).</li>
          <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
        </List>

        <SectionTitle>3. Data Security</SectionTitle>
        <Text>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
        </Text>

        <SectionTitle>4. Data Retention</SectionTitle>
        <Text>
          We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </Text>

        <SectionTitle>5. Your Legal Rights</SectionTitle>
        <Text>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
        </Text>

        <SectionTitle>6. Contact Us</SectionTitle>
        <Text>
          If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager at: <strong>hello@heritoria.in</strong>
        </Text>
      </Container>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
