import fs from "fs";
import { criarPost, getTodosPosts, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const dados = await getTodosPosts();
    res.status(200).json(dados);
}

export async function enviarPosts(req, res) {
    const novoPost = req.body;

    try {
        // chamada da função do model
        const postCriado = await criarPost(novoPost);

        // retorno do conteudo vindo do model
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);

        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalName,
        alt: ""
    }

    try {
        // chamada da função do model
        const postCriado = await criarPost(novoPost);


        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);

        // retorno do conteudo vindo do model
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);

        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}


export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;

    // objeto que representa o post vindo da requisição
    const post = {
        imgUrl: urlImg,
        descricao: req.body.descricao,
        alt: req.body.alt
    }


    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        // objeto que representa o post vindo da requisição
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }
        // chamada da função do model
        const postCriado = await atualizarPost(id, post);

        // retorno do conteudo vindo do model
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);

        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}