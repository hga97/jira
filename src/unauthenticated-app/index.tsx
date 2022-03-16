import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";

export const UnAuthenticated = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "去登录" : "去注册"}
      </button>
    </div>
  );
};
