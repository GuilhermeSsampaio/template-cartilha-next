import { useState, useEffect } from "react";

// Componente que realiza o fetch para a pesquisa de capítulos

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  // Função para buscar os capítulos na API
  const fetchData = (value) => {
    fetch("https://api-cartilha-teste.onrender.com/api/capitulos") // URL da API de capítulos
      .then((response) => response.json())
      .then((data) => {
        // Filtra os capítulos com base no valor de busca
        const results = data.data.filter((capitulo) => {
          return (
            value &&
            capitulo.attributes &&
            capitulo.attributes.title &&
            capitulo.attributes.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
        setShowNoResultsMessage(results.length === 0 && value.trim() !== ""); 
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setResults([]);
        setShowNoResultsMessage(true);
      });
  };

  // Função para lidar com a mudança no input de busca
  const handleChange = (value) => {
    setInput(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Configura um timeout para realizar a busca após um intervalo de tempo
    const timeout = setTimeout(() => {
      fetchData(value.toLowerCase());
    }, 50);

    setTypingTimeout(timeout);
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
      {showNoResultsMessage && <div className="results-list"><p className='result-nulo'>Nenhum resultado encontrado para "{input}".</p></div>}
    </div>
  );
};