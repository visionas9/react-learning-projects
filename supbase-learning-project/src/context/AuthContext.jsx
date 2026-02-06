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

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
