import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import ArticleSkeleton from "../components/ArticleSkeleton";
import SearchBar from "../components/SearchBar";
import { useNews } from "../context/NewsContext";
import { formatTime } from "../utils/formatTime";
import { sliceByCount } from "../utils/pagination";

const INITIAL_COUNT = 9;
const STEP_COUNT = 6;

function Section() {
  const { sectionId } = useParams();
  const { articles, status, error, loadSection, lastUpdated } = useNews();
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    setQuery("");
    setVisibleCount(INITIAL_COUNT);
    loadSection(sectionId);
  }, [sectionId, loadSection]);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;

    return articles.filter((a) => {
      const title = (a.title ?? "").toLowerCase();
      const abs = (a.abstract ?? "").toLowerCase();
      return title.includes(q) || abs.includes(q);
    });
  }, [articles, query]);

  const visibleArticles = useMemo(() => {
    return sliceByCount(filtered, visibleCount);
  }, [filtered, visibleCount]);

  const canLoadMore = visibleCount < filtered.length;

  const updatedLabel = formatTime(lastUpdated?.[sectionId]);

  return (
    <>
      <Header />
      <main className="container page">
        <div className="page-header">
          <div>
            <h1 className="page-title">{sectionId} news</h1>
            <p className="page-subtitle">
              Latest headlines from the NYT Top Stories API.
            </p>
            <p className="page-meta">Last updated: {updatedLabel}</p>
          </div>

          <button
            className="btn"
            type="button"
            onClick={() => loadSection(sectionId, { force: true })}
          >
            Refresh
          </button>
        </div>

        <div style={{ marginTop: 14 }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={`Search in ${sectionId}...`}
          />
        </div>

        {status === "loading" && (
          <section className="grid" style={{ marginTop: 18 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </section>
        )}

        {status === "error" && (
          <p style={{ marginTop: 16, color: "crimson" }}>{error}</p>
        )}

        {status === "success" && filtered.length === 0 && (
          <p style={{ marginTop: 16 }}>
            No results found for <strong>{query}</strong>.
          </p>
        )}

        {status === "success" && filtered.length > 0 && (
          <>
            <section className="grid" style={{ marginTop: 18 }}>
              {visibleArticles.map((a) => (
                <ArticleCard key={a.uri} article={a} />
              ))}
            </section>

            {canLoadMore && (
              <div style={{ marginTop: 18 }}>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setVisibleCount((c) => c + STEP_COUNT)}
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Section;