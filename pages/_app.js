import { useEffect, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';
// Importação dos CSS
import "../styles/globals.css";
import "../styles/custom.css";
import "../styles/capitulos.css";

// Impotação do Framework Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-ui-kit/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import IndexedDBDataProvider from "../api/IndexedDBDataProvider";

//importação do Matomo
import { init } from "@socialgouv/matomo-next";

//importação do dotenv para acessar o .env
import dotenv from "dotenv";
import Notification from "../components/Notification";
dotenv.config();

//setando matomo
const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

if (typeof window !== "undefined") {
  init({
    url: MATOMO_URL,
    siteId: MATOMO_SITE_ID,
  });
}

// Função principal do Next.js

function MyApp({ Component, pageProps }) {
  // Registra o Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.error("Erro ao registrar o Service Worker:", error);
        });
    }
  }, []);
  const [capitulos, setCapitulos] = useState([]);
  const [autores, setAutores] = useState([]);

  const capitulosData = IndexedDBDataProvider("https://api-cartilha-teste.onrender.com/api/capitulos?populate=*", "api-cartilha",  "capitulos",  "id");
  const autoresData = IndexedDBDataProvider("https://api-cartilha-teste.onrender.com/api/autors?populate=*", "api-autores",  "autores",  "id");

  useEffect(() => {
    setCapitulos(capitulosData);
  }, [capitulosData]);

  useEffect(() => {
    setAutores(autoresData);
  }, [autoresData]);


  return (
    <>
      <Component {...pageProps} />
      {/* componente que mostra a notificação */}
      <Notification/>
    </>
  )
}

export default MyApp;