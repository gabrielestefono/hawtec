"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export interface LikeItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  color: string;
}

interface LikesState {
  items: LikeItem[];
}

type LikesAction =
  | { type: "TOGGLE_ITEM"; payload: LikeItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "LOAD_LIKES"; payload: LikeItem[] }
  | { type: "CLEAR_LIKES" };

function likesReducer(state: LikesState, action: LikesAction): LikesState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const exists = state.items.some(
        (item) => item.productId === action.payload.productId,
      );
      if (exists) {
        return {
          items: state.items.filter(
            (item) => item.productId !== action.payload.productId,
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId,
        ),
      };
    case "LOAD_LIKES":
      return { items: action.payload };
    case "CLEAR_LIKES":
      return { items: [] };
    default:
      return state;
  }
}

interface LikesContextValue {
  items: LikeItem[];
  itemCount: number;
  toggleItem: (item: LikeItem) => void;
  removeItem: (productId: number) => void;
  isLiked: (productId: number) => boolean;
  clearLikes: () => void;
}

const LikesContext = createContext<LikesContextValue | undefined>(undefined);

export function LikesProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(likesReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hawtec-likes");
      if (saved) {
        dispatch({ type: "LOAD_LIKES", payload: JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hawtec-likes", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const value = useMemo<LikesContextValue>(
    () => ({
      items: state.items,
      itemCount: state.items.length,
      toggleItem: (item) => dispatch({ type: "TOGGLE_ITEM", payload: item }),
      removeItem: (productId) =>
        dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
      isLiked: (productId) =>
        state.items.some((item) => item.productId === productId),
      clearLikes: () => dispatch({ type: "CLEAR_LIKES" }),
    }),
    [state.items],
  );

  return (
    <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
  );
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("useLikes must be used within LikesProvider");
  return ctx;
}
