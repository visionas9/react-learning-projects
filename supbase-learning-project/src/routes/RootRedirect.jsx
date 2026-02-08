import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RootRedirect() {
  const { session } = useAuth();

  // Still checking session (undefined = loading)
  if (session === undefined) {
    return <h1>Loading...</h1>;
  }

  // Redirect based on session state
  return session ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />;
}
