import { ProjectList } from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";

export const Authenticated = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button
            onClick={() => {
              logout();
            }}
          >
            登出
          </button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const Main = styled.main``;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
