import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "types/project";

interface SearchPanelProps {
  params: Partial<Pick<Project, "name" | "personId">>;
  setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="项目名"
          value={params.name}
          onChange={(e) => {
            setParams({
              ...params,
              name: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={params.personId}
          onChange={(personId) => {
            setParams({
              ...params,
              personId,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
