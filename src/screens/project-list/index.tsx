import { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";

export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const [userList, setUserList] = useState([]);
  const debounceParams = useDebounce(params, 500);
  const {
    isError,
    isLoading,
    error,
    data: projectsList,
  } = useProjects(debounceParams);

  const client = useHttp();

  useMount(() => {
    client("users").then(setUserList);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} list={userList} />
      {isError ? (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        dataSource={projectsList || []}
        userList={userList}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
