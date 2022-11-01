import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  // different objects that are equal by value
  // 循环更新的原因: 将数组作为引用对象，react对比不是同一个对象，导致无限setData
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；
  // TODO：https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

  useDocumentTitle("项目列表", false);

  // 状态提升, 实现状态共享
  const [params, setParams] = useProjectsSearchParams();

  const {
    isLoading,
    error,
    data: projectsList,
    retry,
  } = useProjects(useDebounce(params, 500));

  const { data: userList } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
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
