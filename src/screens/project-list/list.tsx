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
    <table>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
      {projectsList.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{userList.find((user) => user.id === item.personId)?.name}</td>
        </tr>
      ))}
    </table>
  );
};
