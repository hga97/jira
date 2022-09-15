import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

// TODO: MDN URLSearchParams
// TODO: tuple as const key in string
// TODO: useMemo
// TODO: iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

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
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
