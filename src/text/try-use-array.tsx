import { useArray } from "../utils/index";

interface Person {
  name: string;
  age: number;
}

export const TextUseArray = () => {
  const persons: Person[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  return (
    <div>
      <div
        onClick={() => {
          add({ name: "sad", age: 12 });
        }}
      >
        添加一项
      </div>
      <div
        onClick={() => {
          clear();
        }}
      >
        清空
      </div>
      <div
        onClick={() => {
          removeIndex(0);
        }}
      >
        删除一项
      </div>
      {value.map((item) => (
        <div key={item.name}>
          <span>{item.name}</span>
          <span>{item.age}</span>
        </div>
      ))}
    </div>
  );
};
