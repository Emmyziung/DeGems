import "./App.css";
import Header from "@/components/ui/header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/aboutPage";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import SignIn from "./pages/SignIn";
import Members from "./pages/Members";
import MemberDashboard from "./pages/MemberDashboard";
import ScrollToTop from "./components/ui/scrolltotop";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import PageProvider from "./context/pageContext";
import MobileMenu from "./components/mobilemenu";
import Footer from "./components/ui/footer";



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
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Activities/:id" element={<ActivityDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/members" element={<Members />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
      </Routes>
      <Footer />
     
    </BrowserRouter>
    </PageProvider>
  
    
  );
}

export default App;
