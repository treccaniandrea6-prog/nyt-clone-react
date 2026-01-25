/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { topStories } from "../api/topStories";

const NewsStateContext = createContext(null);
const NewsActionsContext = createContext(null);

export function useNewsState() {
  const ctx = useContext(NewsStateContext);
  if (!ctx) throw new Error("useNewsState must be used within NewsProvider");
  return ctx;
}

export function useNewsActions() {
  const ctx = useContext(NewsActionsContext);
  if (!ctx) throw new Error("useNewsActions must be used within NewsProvider");
  return ctx;
}

/* Compat hook */
export function useNews() {
  return { ...useNewsState(), ...useNewsActions() };
}

const initialState = {
  articles: [],
  status: "idle", // idle | loading | success | error
  error: "",
  cache: {},       // { [section]: articles[] }
  lastUpdated: {}, // { [section]: timestamp }
};

function newsReducer(state, action) {
  switch (action.type) {
    case "CACHE_HIT": {
      const { section } = action.payload;
      const cached = state.cache[section] || [];
      return {
        ...state,
        status: "success",
        error: "",
        articles: cached,
      };
    }

    case "LOADING":
      return {
        ...state,
        status: "loading",
        error: "",
      };

    case "SUCCESS":
      return {
        ...state,
        status: "success",
        error: "",
        articles: action.payload.articles,
        cache: {
          ...state.cache,
          [action.payload.section]: action.payload.articles,
        },
        lastUpdated: {
          ...state.lastUpdated,
          [action.payload.section]: Date.now(),
        },
      };

    case "ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };

    default:
      return state;
  }
}

export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  const loadSection = useCallback(
    async (section = "home", options = {}) => {
      const { force = false } = options;

      // ✅ CACHE FIRST
      if (!force) {
        const cached = state.cache?.[section];
        if (cached && cached.length > 0) {
          dispatch({ type: "CACHE_HIT", payload: { section } });
          return; // <<< BLOCCA fetch + loading
        }
      }

      // ❌ Niente cache (o refresh forzato) -> fetch
      dispatch({ type: "LOADING" });

      try {
        const articles = await topStories(section);
        dispatch({ type: "SUCCESS", payload: { section, articles } });
      } catch (error) {
        dispatch({
          type: "ERROR",
          payload: error.message || "Errore nel caricamento",
        });
      }
    },
    [state.cache]
  );

  const stateValue = useMemo(
    () => ({
      articles: state.articles,
      status: state.status,
      error: state.error,
      lastUpdated: state.lastUpdated,
    }),
    [state.articles, state.status, state.error, state.lastUpdated]
  );

  const actionsValue = useMemo(
    () => ({
      loadSection,
    }),
    [loadSection]
  );

  return (
    <NewsStateContext.Provider value={stateValue}>
      <NewsActionsContext.Provider value={actionsValue}>
        {children}
      </NewsActionsContext.Provider>
    </NewsStateContext.Provider>
  );
}
