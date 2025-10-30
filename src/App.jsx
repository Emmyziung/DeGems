import "./App.css";
import Header from "@/components/ui/header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/aboutPage";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import SignIn from "./pages/SignIn";
import Members from "./pages/Members";
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ui/scrolltotop";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageProvider from "./context/pageContext";
import MobileMenu from "./components/mobilemenu";
import { useGlobalContext } from "./context/pageContext";
import Footer from "./components/ui/footer";
import { useAuthContext } from "./context/AuthContext";
import DatabaseProvider from "./context/databaseContext";
import LoginRoutes from "./components/routes/LoginRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import AuthContextProvider from "./context/AuthContext";
import AdminContextProvider from "./context/AdminContext";
function App() {



  return (
     <BrowserRouter>
           <DatabaseProvider>
    <PageProvider>

      <AuthContextProvider>
    
   
  
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
        <Route path="/member-dashboard" element={<LoginRoutes><MemberDashboard/></LoginRoutes>} />
        <Route path="/admin" element={<LoginRoutes><AdminRoutes><AdminContextProvider><AdminDashboard/></AdminContextProvider></AdminRoutes></LoginRoutes>} />
      </Routes>
      <Footer />
      
     </AuthContextProvider>
 
  
  
    </PageProvider>
    </DatabaseProvider>
    </BrowserRouter>
    
  );
}

export default App;
