import { useEffect, useState } from "react";

// ts类型推断函数返回值为boolean
export const isFalsy = (value: unknown) => {
  return value === 0 ? false : !value;
};

export const cleanObject = (object: Record<string, unknown>) => {
  // 传进来的obj有可能是想保留的值
  // 故不要随意更改对象、数组的值
  // 返回一个新的给他们，新旧值都不影响
  const result = { ...object };
  for (const key in result) {
    if (isFalsy(result[key])) {
      delete result[key];
    }
  }
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// export const debounce = (callback, delay) => {
//   let time = null;
//   return (...args) => {
//     if (time) {
//       clearTimeout(time);
//     }

//     time = setTimeout(() => {
//       callback(...args);
//     }, delay);
//   };
// };

export const useDebounce = <V>(value: V, delay: number) => {
  // 状态（响应式：页面跟着更改）
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      console.error("debounce---");
      setDebounceValue(value);
    }, delay);

    // 每次在上一个useEffect处理完以后再运行
    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  const add = (item: T) => setValue([...value, item]);
  const clear = () => setValue([]);
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };

  return { value, setValue, add, clear, removeIndex };
};
