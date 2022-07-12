import "./App.css";
import { Authenticated } from "./authenticated-app";
import { UnAuthenticated } from "unauthenticated-app";
import { useAuth } from "context/auth-context";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">{user ? <Authenticated /> : <UnAuthenticated />}</div>
  );
}

export default App;
