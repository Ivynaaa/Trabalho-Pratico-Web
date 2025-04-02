const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Aplicar o middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rota para ler todas as tarefas do usuário autenticado
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }); // Filtrando pelo userId
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Rota para criar uma nova tarefa
router.post('/', async (req, res) => { // http://localhost:3000/tasks
  try {
    const { title, description, status, deadline } = req.body;

    const newTask = new Task({
      title,
      description,
      status: status || 'pendente',
      deadline: deadline ? new Date(deadline) : null,
      user: req.userId, // Associando a tarefa ao userId do usuário autenticado
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Rota para atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        deadline: req.body.deadline ? new Date(req.body.deadline) : null,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).send('Tarefa não encontrada');
    }

    // Verificar se a tarefa pertence ao usuário autenticado
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Rota para deletar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send('Tarefa não encontrada');
    }

    // Verificar se a tarefa pertence ao usuário autenticado
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

module.exports = router;
