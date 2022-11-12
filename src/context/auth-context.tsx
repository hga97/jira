import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading, FullPageErrorFallBack } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap, selectUser } from "store/auth.slice";
import * as authStore from "store/auth.slice";

export interface AuthFrom {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthFrom) => Promise<void>;
      register: (form: AuthFrom) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isIdle, isLoading, isError, run, error } = useAsync<User | null>();
  const dispatch: (...args: any) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }

  return <>{children}</>;
};

export const useAuth = () => {
  const dispatch: (...args: any) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthFrom) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthFrom) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
