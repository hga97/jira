import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // different objects that are equal by value
  // 循环更新的原因: 将数组作为引用对象，react对比不是同一个对象，导致无限setData
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；
  // TODO：https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

  const [params, setParams] = useUrlQueryParam(["name", "personId"]);
  const debounceParams = useDebounce(params, 500);

  const {
    isError,
    isLoading,
    error,
    data: projectsList,
  } = useProjects(debounceParams);

  const { data: userList } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        params={params}
        setParams={setParams}
        list={userList || []}
      />
      {isError ? (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        dataSource={projectsList || []}
        userList={userList || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
