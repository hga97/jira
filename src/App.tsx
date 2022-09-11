import "./App.css";
import { Authenticated } from "./authenticated-app";
import { UnAuthenticated } from "unauthenticated-app";
import { useAuth } from "context/auth-context";
import { ErrorBoundary } from "components/error-Boundary";
import { FullPageErrorFallBack } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <Authenticated /> : <UnAuthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
