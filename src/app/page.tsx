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
      <UseCases />
      <Industries />
      <PlatformArchitecture />
      <AIAgents />
      <ProductPreview />
      <BusinessImpact />
      <SuccessStories />
      <BookDemo />
      <Footer />
    </main>
  );
}
