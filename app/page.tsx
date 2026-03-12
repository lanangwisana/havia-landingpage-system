import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Trust from "./components/Trust";
import ContactSection from "./components/Contact";
import WhatsappCTA from "./components/WhatsappCTA";
import { getSettings } from "./lib/api";

export default async function Home() {
  const cmsData = await getSettings();

  return (
    <>
      <Header cmsData={cmsData} />
      <Hero cmsData={cmsData} />
      <About cmsData={cmsData} />
      <Portfolio cmsData={cmsData} />
      <Trust cmsData={cmsData} />
      <ContactSection cmsData={cmsData} />
      <WhatsappCTA cmsData={cmsData} />
    </>
  );
}