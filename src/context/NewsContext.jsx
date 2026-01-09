import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { fetchTopStories } from "../api/topStories";

const NewsContext = createContext(null);

const initialState = {
  section: "home",
  articles: [],
  status: "idle", // idle | loading | success | error
  error: "",
  cache: {}, // { [sectionId]: articles[] }
  lastUpdated: {}, // { [sectionId]: number (Date.now()) }
};

function reducer(state, action) {
  switch (action.type) {
    case "news/loading":
      return {
        ...state,
        status: "loading",
        error: "",
        section: action.payload,
        articles: [],
      };

    case "news/success": {
      const { section, articles, ts } = action.payload;
      return {
        ...state,
        status: "success",
        error: "",
        section,
        articles,
        cache: {
          ...state.cache,
          [section]: articles,
        },
        lastUpdated: {
          ...state.lastUpdated,
          [section]: ts,
        },
      };
    }

    case "news/error":
      return {
        ...state,
        status: "error",
        error: action.payload,
        articles: [],
      };

    default:
      return state;
  }
}

export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cacheRef = useRef(initialState.cache);
  const updatedRef = useRef(initialState.lastUpdated);

  cacheRef.current = state.cache;
  updatedRef.current = state.lastUpdated;

  const loadSection = useCallback(async (section = "home", options = {}) => {
    const { force = false } = options;

    // Serve from cache unless force refresh is requested
    const cached = cacheRef.current?.[section];
    const cachedTs = updatedRef.current?.[section];

    if (!force && cached) {
      dispatch({
        type: "news/success",
        payload: { section, articles: cached, ts: cachedTs ?? Date.now() },
      });
      return;
    }

    try {
      dispatch({ type: "news/loading", payload: section });
      const data = await fetchTopStories(section);
      const articles = data.results ?? [];
      dispatch({
        type: "news/success",
        payload: { section, articles, ts: Date.now() },
      });
    } catch (err) {
      dispatch({
        type: "news/error",
        payload:
          "Failed to load stories for this section. Check your API key and try again.",
      });
    }
  }, []);

  const value = useMemo(() => {
    return {
      section: state.section,
      articles: state.articles,
      status: state.status,
      error: state.error,
      lastUpdated: state.lastUpdated,
      loadSection,
    };
  }, [state.section, state.articles, state.status, state.error, state.lastUpdated, loadSection]);

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be used inside NewsProvider");
  return ctx;
}