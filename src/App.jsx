import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound"; 
import Contact from "./pages/Contact";
import Messages from "./pages/Messages"


function App(){
  return(
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/messages" element={<Messages />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App; 