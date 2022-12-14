import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils/index";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";

export const ProjectListScreen = () => {
  // different objects that are equal by value
  // 循环更新的原因: 将非状态，非基本类型作为引用对象，重新渲染会被重新定义。
  // React把前一次渲染时的数组和这次渲染的数组中的元素进行对比，发现不一致，React 就会再次调用 effect，导致无限调用。
  // 要点：非状态，非基本类型是不能存放到依赖里。
  // 解决：useMemo（对象或数组）、useCallback（函数） https://react.docschina.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  // TODO：https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js

  useDocumentTitle("项目列表", false);

  // 状态提升, 实现状态共享
  const [params, setParams] = useProjectsSearchParams();

  const {
    isLoading,
    error,
    data: projectsList,
  } = useProjects(useDebounce(params, 500));

  const { data: userList } = useUsers();

  const { open } = useProjectModal();

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel params={params} setParams={setParams} />
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        dataSource={projectsList || []}
        userList={userList || []}
      />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;
