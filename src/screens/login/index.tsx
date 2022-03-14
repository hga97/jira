const url = process.env.REACT_APP_API_URL;

export const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const login = (params: { username: string; password: string }) => {
      fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }).then(async (res) => {
        if (res.status === 200) {
        }
      });
    };
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
    // console.log(event.currentTarget.elements[0].value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">提交</button>
    </form>
  );
};
