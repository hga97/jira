import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  token: string;
}

interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
  list: User[];
}

export const SearchPanel = ({ params, setParams, list }: SearchPanelProps) => {
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
        <Select
          value={params.personId}
          onChange={(personId) => {
            setParams({
              ...params,
              personId,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {list.map((item) => (
            <Select.Option value={item.id} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
