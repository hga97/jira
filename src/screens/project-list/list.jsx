export const List = ({projectsList,userList}) => {
  return (
    <table>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
      {projectsList.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{userList.find(user=> user.id === item.personId).name}</td>
        </tr>
      ))}
    </table>
  );
};
