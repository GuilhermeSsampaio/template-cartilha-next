// mostra os resultados da busca
export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
    >
      {result.attributes.title}
    </div>
  );
};