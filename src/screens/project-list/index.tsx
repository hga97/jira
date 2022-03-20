import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import { useAuth } from "content/auth-context";

export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const [userList, setUserList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const debounceParams = useDebounce(params, 500);
  const { logout } = useAuth();
  const client = useHttp();

  useMount(() => {
    client("users").then(setUserList);
  });

  useEffect(() => {
    const result = cleanObject(debounceParams);
    console.error("调用接口查询", debounceParams);
    client("projects", { data: result }).then(setProjectsList);
  }, [debounceParams]);

  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        登出
      </button>
      <SearchPanel params={params} setParams={setParams} list={userList} />
      <List projectsList={projectsList} userList={userList} />
    </div>
  );
};
