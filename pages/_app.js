import { useEffect } from "react";
import { fetchAllData } from "../lib/api"; // Substitua 'fetchAllData' pelo método que recupera todos os dados necessários

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css";
import "../styles/custom.css";
import "../styles/capitulos.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-ui-kit/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { init } from "@socialgouv/matomo-next";
import dotenv from "dotenv";
import Notification from "../components/Notification";
dotenv.config();

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

if (typeof window !== "undefined") {
  init({
    url: MATOMO_URL,
    siteId: MATOMO_SITE_ID,
  });
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const fetchDataAndStoreInIndexedDB = async () => {
      try {
        // Busca os dados necessários para todo o aplicativo
        const allData = await fetchAllData(); // Método para buscar todos os dados necessários
        
        // Armazena os dados no IndexedDB
        // (Você precisará adaptar esta parte para integrá-la com o seu IndexedDBDataProvider)
        // Exemplo:
        // await seuIndexedDBDataProvider.updateDataLocally(allData);
      } catch (error) {
        console.error('Erro ao buscar e armazenar dados:', error);
      }
    };

    fetchDataAndStoreInIndexedDB();
  }, []);

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

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
      <Notification />
    </>
  );
}

export default MyApp;
