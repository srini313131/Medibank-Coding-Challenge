import { useEffect, useReducer, useRef } from "react";
import { Action, Owner, PetWithOwner, PetsState } from "./types";
import { nanoid } from "nanoid";

const getPetsList = (owners: Owner[]) => {
  return owners.reduce((acc, owner) => {
    acc = [
      ...acc,
      ...(owner.pets || []).map((pet) => ({ ...pet, owner, id: nanoid() })),
    ];
    return acc;
  }, [] as PetWithOwner[]);
};
function reducer(state: PetsState, action: Action): PetsState {
  switch (action.type) {
    case "get_owners": {
      return { ...state, status: "loading" };
    }
    case "get_owners_success": {
      return { ...state, status: "loaded", data: action.payload || [] };
    }
    case "get_owners_fail": {
      return { ...state, status: "error", data: [] };
    }
    default:
      return state;
  }
}
const initState: PetsState = {
  data: [],
  status: "init",
  error: null,
};
export function UseFetch(url: string): PetsState {
  const [state, dispatch] = useReducer(reducer, initState);
  const cache = useRef<{ [url: string]: any }>({});
  useEffect(() => {
    let cancelRequest = false;
    async function fetchData() {
      dispatch({ type: "get_owners" });

      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({
          type: "get_owners_success",
          payload: data,
        });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          const pets = getPetsList(data);
          const cats = pets.filter((pet) => pet.type === "Cat");
          cache.current[url] = cats;
          if (!cancelRequest) {
            dispatch({
              type: "get_owners_success",
              payload: cats,
            });
          }
        } catch (error: any) {
          if (!cancelRequest) {
            dispatch({
              type: "get_owners_fail",
              error,
            });
          }
        }
      }
    }
    fetchData();
    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);
  return state;
}
