import { Routes, Route } from "react-router-dom";
import { IntroAnimation } from "@/components/IntroAnimation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { GlyphBackground } from "@/components/GlyphBackground";
import { MouseParallax } from "@/components/MouseParallax";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Stats } from "@/sections/Stats";
import { Contact } from "@/sections/Contact";
import { AllProjects } from "@/pages/AllProjects";

const Home = () => (
  <div className="min-h-screen overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Stats />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <SmoothScroll>
      <IntroAnimation />
      <GlyphBackground />
      <MouseParallax />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
      </Routes>
    </SmoothScroll>
  );
}

export default App;
