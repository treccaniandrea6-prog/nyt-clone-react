function ArticleSkeleton() {
  return (
    <article className="card">
      <div className="card-image card-skeleton" />
      <div className="card-body">
        <div className="skeleton-line skeleton-line--small" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-line--medium" />
      </div>
    </article>
  );
}

export default ArticleSkeleton;