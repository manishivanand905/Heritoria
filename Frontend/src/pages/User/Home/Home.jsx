import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import HeroSection from "../../../components/Hero/Herosection";
import BenefitsSection from "../../../components/BenefitsSection/BenefitsSection";
import FeaturedProjects from "../../../components/FeaturedProjects/Featuredprojects";
import HowItWorks from "../../../components/Howitwork/Howitworks";
import DreamHomeSection from "../../../components/Dreamhomesection/Dreamhomesection";

const Home = () => {
  return (
    <div>
      <Header transparent />
      <HeroSection offsetForHeader />
      <BenefitsSection />
      <FeaturedProjects />
      <HowItWorks />
      <DreamHomeSection />
      <Footer />
      {/* Other sections will be added here */}
    </div>
  );
};

export default Home;
