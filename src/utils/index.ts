import { useEffect, useState } from "react";

// ts类型推断函数返回值为boolean
export const isFalsy = (value: unknown) => {
  return value === 0 ? false : !value;
};

export const cleanObject = (object: Record<string, unknown>) => {
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
