import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarNoBanco from "../config/db_config.js";


// **Conecta ao banco de dados MongoDB usando a função definida em db_config.js**
// A string de conexão é obtida da variável de ambiente STRING_CONEXAO
const conexao = await conectarNoBanco(process.env.STRING_CONEXAO);

// **Função assíncrona para buscar todos os posts do banco de dados**
export  async function getTodosPosts() {
    // Obtém o banco de dados 'imersao-alura' da conexão
    const db = conexao.db('imersao-alura');
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection('posts');
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// **Função para adicionar um post no banco
export async function criarPost(novoPost) {
    const db = conexao.db('imersao-alura');
    const colecao = db.collection('posts');

    return colecao.insertOne(novoPost);
}

// **Função para atualizar um post
export async function atualizarPost(idPost, novoPost) {
    const db = conexao.db('imersao-alura');
    const colecao = db.collection('posts');

    const objId = ObjectId.createFromHexString(idPost);

    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: novoPost});
}