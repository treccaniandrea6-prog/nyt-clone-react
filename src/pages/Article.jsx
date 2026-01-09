import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Article() {
  const { encodedUrl } = useParams();

  const url = useMemo(() => {
    try {
      return decodeURIComponent(encodedUrl);
    } catch {
      return "";
    }
  }, [encodedUrl]);

  return (
    <>
      <Header />
      <main className="container page">
        <h1 className="page-title">Article</h1>
        <p className="page-subtitle">Open the full story on NYTimes.</p>

        {url ? (
          <a className="card-link" href={url} target="_blank" rel="noreferrer">
            Read on NYTimes
          </a>
        ) : (
          <p style={{ marginTop: 16, color: "crimson" }}>
            Invalid article URL.
          </p>
        )}
      </main>
    </>
  );
}

export default Article;