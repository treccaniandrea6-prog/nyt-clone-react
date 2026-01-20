import { memo } from "react";

const ArticleCard = memo(function ArticleCard({ article }) {
  const imageUrl =
    article.multimedia?.find((m) => m.format === "mediumThreeByTwo440")?.url ||
    article.multimedia?.[0]?.url ||
    "";

  return (
    <article className="card">
      {imageUrl ? (
        <img className="card-image" src={imageUrl} alt={article.title} />
      ) : (
        <div className="card-image card-image--placeholder" />
      )}

      <div className="card-body">
        <p className="card-kicker">{article.section}</p>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-abstract">{article.abstract}</p>

        <a
          className="card-link"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open article
        </a>
      </div>
    </article>
  );
});

export default ArticleCard;