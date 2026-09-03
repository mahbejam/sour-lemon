import CinematicHero from "@/components/CinematicHero";
import WhySourLemon from "@/components/sections/WhySourLemon";
import UseCases from "@/components/sections/UseCases";
import Industries from "@/components/sections/Industries";
import PlatformArchitecture from "@/components/sections/PlatformArchitecture";
import AIAgents from "@/components/sections/AIAgents";
import ProductPreview from "@/components/sections/ProductPreview";
import BusinessImpact from "@/components/sections/BusinessImpact";
import SuccessStories from "@/components/sections/SuccessStories";
import BookDemo from "@/components/sections/BookDemo";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <CinematicHero />
      <WhySourLemon />
      <div id="use-cases"><UseCases /></div>
      <div id="industries"><Industries /></div>
      <div id="platform"><PlatformArchitecture /></div>
      <div id="agents"><AIAgents /></div>
      <div id="preview"><ProductPreview /></div>
      <div id="impact"><BusinessImpact /></div>
      <div id="stories"><SuccessStories /></div>
      <div id="book-demo"><BookDemo /></div>
      <Footer />
    </main>
  );
}
