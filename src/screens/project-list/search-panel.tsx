import { User } from "./list";
import { Form, Input, Select } from "antd";

interface IFParams {
  name: string;
  personId: string;
}

interface IFSearchPanel {
  params: IFParams;
  setParams: (params: IFParams) => void;
  list: User[];
}

export const SearchPanel = ({ params, setParams, list }: IFSearchPanel) => {
  return (
    <Form action="">
      <Form.Item>
        <Input
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
