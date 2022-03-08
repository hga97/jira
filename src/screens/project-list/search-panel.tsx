import { User } from "./list";

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
    <form action="">
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(e) => {
            setParams({
              ...params,
              name: e.target.value,
            });
          }}
        />
        <select
          value={params.personId}
          onChange={(e) => {
            setParams({
              ...params,
              personId: e.target.value,
            });
          }}
        >
          <option value={""}>负责人</option>
          {list.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
