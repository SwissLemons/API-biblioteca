const express = require("express")
const coisa = express()
coisa.use(express.json())

let livros = []
let autores = []
let livrosId = 1
let autoresId = 1

// validacoes

const validarAutores = (autor) => {
    const erros = [];
    if (!autor.nome || autor.nome.length < 3 || autor.nome.length > 100) {
        erros.push("O nome do autor deve ter entre 3 e 100 caracteres.");
    }
    return erros;
};

const validarLivros = (livro) => {
    const erros = [];
    if (!livro.titulo || livro.titulo.length < 3 || livro.titulo.length > 150) {
        erros.push("O título do livro deve ter entre 3 e 150 caracteres.");
    }
    return erros;
};

// autores

coisa.get('/autores', (req, res) =>{
    res.json(autores)
})

coisa.post('/autores', (req, res) =>{
    const erros = validarAutores(req.body);
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    const novoAutor = { id: autoresId++, ...req.body };
    
    autores.push(novoAutor);
    res.status(201).json({ message: 'Autor cadastrado com sucesso' });
})

// livros pelos autores

coisa.get('/autores/:id/livros', (req, res) =>{
    const autorId = parseInt(req.params.id)
    const autor = autores.find((a) => a.id === autorId)
    if (!autor) {
        return res.status(404).json({ error: "Autor não encontrado." })
    }
    res.json(autor.livros)
})

coisa.post('/autores/:id/livros', (req, res) =>{
    const autorId = parseInt(req.params.id)
    const autor = autores.find((a) => a.id === autorId)
    if (!autor) {
        return res.status(404).json({ error: "Autor não encontrado." })
    }

    const erros = validarLivros(req.body);
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    const novoLivro = { id: livrosId++, ...req.body };
    
    livros.push(novoLivro);
    res.status(201).json({ message: 'Livro cadastrado com sucesso' });
})

coisa.listen(3000, () =>{
    console.log("Servidor aberto na porta 3000")
})