import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

// TODO: MDN URLSearchParams get获取到的值是字符串
// TODO: useMemo
// TODO: iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

// 第一
// const a = <K>(key: K[]) => {
//   console.log(key);
// };
// // const a: <string | number>(key: (string | number)[]) => void
// a(["asd", 1]);

// 第二
// const a = <K extends string>(key: K[]) => {
//   console.log(key);
// };
// const a: <"asd" | "asdasd">(key: ("asd" | "asdasd")[]) => void
// a(["asd", 'asdasd']);

// 第三
// type a = {
//   num: number;
//   str: string;
// };
// type b = keyof a
// const a: b = 'str'

// 第四
// const a: (string | number)[]
// const a: readonly ["11", 1]
// const a = ['11', 1] as const

// 第五
// type Person = 'name' | 'age'

// type Tname = {
//   name: string;
//   age: string;
// }
// type Tname = {
//     [key in Person]:string;
// }
