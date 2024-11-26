import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {atualizarNovoPost, enviarPosts, listarPosts, uploadImagem} from '../controller/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

// Configurações usadas para o arquivo não ser nomeado com um monte de caractere aleatorio 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// em outros S.O não precisa dessa config adicional
/// so colocar const upload = multer({dest:"./uploads"})
const upload = multer({storage: storage});

const routes = (app) => {
    // **Middleware para interpretar requisições JSON**
    app.use(express.json());

    app.use(cors(corsOptions));

    // **Rota para buscar todos os posts**
    app.get('/posts',listarPosts);
    
    // **Rota para enviar um post**
    app.post('/posts',enviarPosts);

    // **Rota para fazer upload de uma imagem
    app.post('/upload', upload.single("imagem"), uploadImagem);

    app.put('/upload/:id', atualizarNovoPost);
}

export default routes;