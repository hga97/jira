import { useEffect, useRef, useState } from "react";

// ts类型推断函数返回值为boolean
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: Record<string, unknown>) => {
  // 传进来的obj有可能是想保留的值1
  // 故不要随意更改对象、数组的值
  // 返回一个新的给他们，新旧值都不影响
  const result = { ...object };
  for (const key in result) {
    if (isVoid(result[key])) {
      delete result[key];
    }
  }
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // ref 对象在组件的整个生命周期内持续存在
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
    console.log(title, "title");
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //闭包，获取到的是第一次进来的值
        // 如果指定依赖的话，获取到的就是新的值, 而且没指定依赖会告警
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
