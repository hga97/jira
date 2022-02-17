export const SearchPanel = ({ params, setParams, list }) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={params.value}
          onChange={(e) => {
            setParams({
              ...params,
              name: e.target.value,
            });
          }}
        />
        <select
          value={params.id}
          onChange={(e) => {
            setParams({
              ...params,
              personId: e.target.value,
            });
          }}
        >
          <option value={''}>负责人</option>
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
