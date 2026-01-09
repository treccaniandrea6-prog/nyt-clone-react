function SearchBar({ value, onChange, placeholder = "Search articles..." }) {
  return (
    <div className="search">
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
      />
    </div>
  );
}

export default SearchBar;