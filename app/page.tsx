// app/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import RequestPortfolio from "./components/RequestPortfolio";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Trust from "./components/Trust";
import ContactSection from "./components/Contact";
import WhatsappCTA from "./components/WhatsappCTA";
import SplashScreen from "./components/SplashScreen";
import { getSettings } from "./lib/api";

export default async function Home() {
  const cmsData = await getSettings();

  return (
    <SplashScreen>
      <Header cmsData={cmsData} />
      <Hero cmsData={cmsData} />
      <RequestPortfolio cmsData={cmsData} />
      <About cmsData={cmsData} />
      <Portfolio cmsData={cmsData} />
      <Trust cmsData={cmsData} />
      <ContactSection cmsData={cmsData} />
      <WhatsappCTA cmsData={cmsData} />
    </SplashScreen>
  );
}