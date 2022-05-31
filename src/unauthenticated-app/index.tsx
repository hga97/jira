import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import { Card, Button } from "antd";

export const UnAuthenticated = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <Register /> : <Login />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "去登录" : "去注册"}
        </Button>
      </Card>
    </div>
  );
};
