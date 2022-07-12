import { ProjectList } from "screens/project-list";
import { useAuth } from "context/auth-context";

export const Authenticated = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        {" "}
        登出{" "}
      </button>
      <ProjectList />
    </div>
  );
};
