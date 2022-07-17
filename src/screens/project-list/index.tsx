import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const [userList, setUserList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const debounceParams = useDebounce(params, 500);
  const client = useHttp();

  useMount(() => {
    client("users").then(setUserList);
  });

  useEffect(() => {
    const result = cleanObject(debounceParams);
    console.error("调用接口查询", debounceParams);
    client("projects", { data: result }).then(setProjectsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} list={userList} />
      <List projectsList={projectsList} userList={userList} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
