async function FetchApiOffline(apiUrl, dbName, storeName, keyPath) {
    try {
        if (!navigator.onLine) {
            console.log('Você está offline. Recuperando dados do IndexedDB.');
            const storedData = await obterDadosDoIndexedDB(dbName, storeName);
            return storedData;
            
        } else {
            console.log('Você está online. Recuperando dados da API.');
            const response = await fetch(apiUrl);
            if (response.ok) {
                const json = await response.json();
                const data = json.data;
                return data;
            } else {
                throw new Error('Falha na requisição. Código de status: ' + response.status);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        throw error; // Rejeita a Promise com o erro para que seja tratado externamente
    }
}

async function obterDadosDoIndexedDB(dbName, storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = (event) => {
            console.error('Erro ao abrir o banco de dados:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = (event) => {
                const data = event.target.result;
                console.log('Dados recuperados do IndexedDB:', data);
                resolve(data);
            };

            getAllRequest.onerror = (event) => {
                console.error('Erro ao obter os dados do IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(storeName, { keyPath: 'id' });
            objectStore.createIndex('id', 'id', { unique: true });
        };
    });
}

export default FetchApiOffline;