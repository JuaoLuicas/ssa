import { useRef } from "react";
import About from "./assets/components/About";
import Contact from "./assets/components/Contact";
import Header from "./assets/components/Header";
import Products from "./assets/components/Products";

function App() {

  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  function scrollToComponent(ref) {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } 
  }
  
  return (
    <main className="w-full h-full overflow-y-auto">
      <Header 
      scrollToAbout={() => scrollToComponent(aboutRef)}
      scrollToProducts={() => scrollToComponent(productsRef)}
      scrollToContact={() => scrollToComponent(contactRef)}/>
      <About ref={aboutRef}/>
      <Products ref={productsRef}/>
      <Contact ref={contactRef}/>
    </main>
  );
}

export default App;
