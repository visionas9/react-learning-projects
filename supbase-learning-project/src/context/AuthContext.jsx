//Session state (user info, token, etc.) is stored in the AuthContext.
// This allows us to easily access and update the session state across the entire application without prop drilling.
import React, { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // Fetch the current session from Supabase when the component mounts
    async function fetchSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSession();

    // Listen for changes in the authentication state (e.g., user signs in or out)
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    });
  }, []);

  async function signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.log("Error signing in:", error);
        return { success: false, error };
      }
      console.log("Sign-in successful:", data);
      return { success: true, data };
    } catch (error) {
      console.log("Error signing in:", error);
      return { success: false, error: "An error occurred while signing in." };
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log("Error signout:", error);
        return { success: false, error };
      }
      return { success: true };
    } catch (error) {
      console.log("Error signing out:", error);
      return { success: false, error: "An error occurred while signing out." };
    }
  }

  async function signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Error signing up:", error);
        return { success: false, error };
      }
      console.log("Sign-up successful:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Error signing up:", error);
      return { success: false, error: "An error occurred while signing up." };
    }
  }

  return (
    <AuthContext.Provider
      value={{ session, setSession, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
