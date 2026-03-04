import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Trust from "./components/Trust";
import ContactSection from "./components/Contact";
import WhatsappCTA from "./components/WhatsappCTA";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Trust />
      <ContactSection />
      <WhatsappCTA />
    </>
  );
}