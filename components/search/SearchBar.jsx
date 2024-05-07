import { useState, useEffect } from "react";
import FetchApiOffline from "../../api/FetchApiOffline"; // Certifique-se de importar o componente FetchApiOffline corretamente

// Componente que realiza a pesquisa de capítulos
export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  // Função para lidar com a mudança no input de busca
  const handleChange = async (value) => {
    setInput(value);
    try {
      const data = await FetchApiOffline(
        "https://api-cartilha-teste.onrender.com/api/capitulos",
        "api-cartilha",
        "capítulos",
        false
      );
      const results = data.filter((capitulo) => {
        return (
          value &&
          capitulo.attributes &&
          capitulo.attributes.title &&
          capitulo.attributes.title.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results);
      setShowNoResultsMessage(results.length === 0 && value.trim() !== "");
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setResults([]);
      setShowNoResultsMessage(true);
    }
  };

  // Limpa os resultados e a mensagem de nenhum resultado ao mudar o input
  useEffect(() => {
    setResults([]);
    setShowNoResultsMessage(false);
  }, [input]);

  return (
    <div className="input-wrapper">
      <i id="search-icon" className="fas fa-search"></i>
      <input
        className="navbar-input"
        placeholder="Buscar"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {showNoResultsMessage && (
        <div className="results-list">
          <p className="result-nulo">Nenhum resultado encontrado para "{input}".</p>
        </div>
      )}
    </div>
  );
};
