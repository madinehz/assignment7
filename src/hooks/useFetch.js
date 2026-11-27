import { useEffect, useReducer } from "react";

const initialState = { loading: true, error: null, data: null };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { loading: true, error: null, data: null };
    case "FETCH_SUCCESS":
      return { loading: false, error: null, data: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: action.payload, data: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function useFetch(fetcher, deps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    fetcher()
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) => dispatch({ type: "FETCH_ERROR", payload: error }));
  }, deps);

  return state;
}