import { useState, useEffect } from "react";
import { List, Project } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";
import { Typography } from "antd";

export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const [userList, setUserList] = useState([]);
  const debounceParams = useDebounce(params, 500);
  const client = useHttp();
  const {
    run,
    isLoding,
    isError,
    error,
    data: projectsList,
  } = useAsync<Project[]>();

  useMount(() => {
    client("users").then(setUserList);
  });

  useEffect(() => {
    const result = cleanObject(debounceParams);
    console.error("调用接口查询", debounceParams);
    run(client("projects", { data: result }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} list={userList} />
      {isError ? (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoding}
        dataSource={projectsList || []}
        userList={userList}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
