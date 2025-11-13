import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "@/components/ui/error";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/img/IMG-20250908-WA0004.jpg";
import { auth } from "@/firebase";
import {  signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { useAuthContext } from "@/context/AuthContext";
import { useGlobalContext } from "@/context/pageContext";
const SignIn = () => {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser, handleSignIn, signinLoad} = useAuthContext();

const {errorDisplay} = useGlobalContext()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="De GEMS logo" className="h-12 w-12 rounded-full object-cover" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-center text-primary mb-6">Member Sign In</h1>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSignIn(e); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
            name="email"
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input
            name="password"
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your password"
              required
            />
          </div>
          {signinLoad?<Button className="w-full !bg-primary !text-primary-foreground"><div className="loading-spinner "></div></Button>:<Button type="submit" className="w-full !bg-primary !text-primary-foreground">Sign In</Button>}
        </form>
         {errorDisplay && <Error />}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Not a member? <Link to="/members" className="text-primary hover:underline">Visit Members page</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;