import { Table } from "antd";

interface IFProject {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export interface User {
  id: number;
  name: string;
  token: string;
}

interface IFList {
  projectsList: IFProject[];
  userList: User[];
}

export const List = ({ projectsList, userList }: IFList) => {
  return (
    <Table
      columns={[
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render(personId) {
            return userList.find((user) => user.id === personId)?.name;
          },
        },
      ]}
      dataSource={projectsList}
    />
  );
};
