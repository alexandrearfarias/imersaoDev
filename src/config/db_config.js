import { MongoClient } from "mongodb";

export default async function conectarNoBanco(stringConexao) {
    let mongoClient;
    
    try {
        mongoClient = new MongoClient(stringConexao);

        console.log('conectando ao banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao banco com sucesso.');

        return mongoClient;
    } catch (error) {
        console.error('Erro ao conectar com o banco.', error);
        process.exit();
    }
}