// app/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import People from "./components/People";
import RequestPortfolio from "./components/RequestPortfolio";
import Trust from "./components/Trust";
import ContactSection from "./components/Contact";
import WhatsappCTA from "./components/WhatsappCTA";
import SplashScreen from "./components/SplashScreen";
import ScreenshotProtection from "./components/ScreenshotProtection";
import { getSettings } from "./lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cmsData = await getSettings();

  return (
    <SplashScreen>
      <Header cmsData={cmsData} />
      <Hero cmsData={cmsData} />
      <ScreenshotProtection>
        <Portfolio cmsData={cmsData} />
      </ScreenshotProtection>
      <About cmsData={cmsData} />
      <People cmsData={cmsData} />
      <RequestPortfolio cmsData={cmsData} />
      <Trust cmsData={cmsData} />
      <ContactSection cmsData={cmsData} />
      <WhatsappCTA cmsData={cmsData} />
    </SplashScreen>
  );
}