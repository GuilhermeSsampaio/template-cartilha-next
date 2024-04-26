// Importe o componente IndexedDBDataProvider
import IndexedDBDataProvider from "../../components/IndexedDBDataProvider";

// Função para buscar todos os dados necessários para o aplicativo
const apiUrl1 = 'https://api-cartilha-teste.onrender.com/api/autors?populate=*'
const apiUrl2 = 'https://api-cartilha-teste.onrender.com/api/capitulos?populate=*'

export const fetchAllData = async () => {
    try {
        console.log('Iniciando busca e armazenamento de dados...');

        // Utilize o IndexedDBDataProvider diretamente para armazenar os dados localmente
        console.log('Buscando e armazenando dados da primeira API...');
        await IndexedDBDataProvider({ 
            apiUrl: apiUrl1,
            dbName: "api-autores",
            storeName: "autores",
            keyPath: "id"
        });
        console.log('Dados da primeira API armazenados com sucesso.');

        console.log('Buscando e armazenando dados da segunda API...');
        await IndexedDBDataProvider({ 
            apiUrl: apiUrl2,
            dbName: "api-capitulos",
            storeName: "capitulos",
            keyPath: "id"
        });
        console.log('Dados da segunda API armazenados com sucesso.');

        console.log('Busca e armazenamento de dados concluídos.');

        // Aqui você pode continuar com o resto da lógica de busca de dados e retorno

    } catch (error) {
        console.error('Erro ao buscar e armazenar dados:', error);
        // Se ocorrer um erro ao buscar os dados, lança uma exceção para ser tratada no componente
        throw new Error('Erro ao buscar os dados:', error);
    }
};
