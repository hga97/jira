import { useCallback, useReducer } from "react";

// useReducer 知识点

// 1、useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，
// 并返回当前的 state 以及与其配套的 dispatch 方法。

// 2、在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，
// 或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，
// 因为你可以向子组件传递 dispatch 而不是回调函数 。

// 3、React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
// 这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent } = action;

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) {
        return state;
      }

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
      if (future.length) {
        return state;
      }

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      if (newPresent === present) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }

  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const set = useCallback(
    (newPresent: T) =>
      dispatch({
        type: UNDO,
        newPresent,
      }),
    []
  );

  const reset = useCallback(
    (newPresent: T) =>
      dispatch({
        type: RESET,
        newPresent,
      }),
    []
  );

  const undo = useCallback(
    () =>
      dispatch({
        type: UNDO,
      }),
    []
  );

  const redo = useCallback(
    () =>
      dispatch({
        type: REDO,
      }),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
