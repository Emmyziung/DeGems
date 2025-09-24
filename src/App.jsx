import "./App.css";
import Header from "@/components/ui/header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/aboutPage";
import ScrollToTop from "./components/ui/scrolltotop";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import PageProvider from "./context/pageContext";
import MobileMenu from "./components/mobilemenu";



function App() {
  return (

    <PageProvider>
    <BrowserRouter>
      <ScrollToTop />
    <Header/>
    <MobileMenu/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/About" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
    </PageProvider>
  
    
  );
}

export default App;
