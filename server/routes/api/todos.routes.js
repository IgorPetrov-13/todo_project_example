const todosRoute = require('express').Router();
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

todosRoute.get('/', async (req, res) => {
  console.log(res.locals, 'res.locals GET ROADS');
  try {
    const todos = await prisma.todo.findMany({ orderBy: { id: 'desc' } });
    if (todos.length > 0) {
      res.status(200).json(todos);
    } else {
      res.status(404).json({ message: 'nothing found' });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Todo not found' });
      }
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

todosRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (todo) {
      return res.status(200).json(todo);
    } else {
      return res.status(404).json({ message: 'nothing found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todosRoute.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await prisma.todo.findMany({ where: { userId: Number(userId) } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todosRoute.post('/user/:userId', verifyAccessToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }
    const { title, description, isDone = false } = req.body;
    if (!title.trim() || !userId || !description.trim()) {
      return res.status(400).json({ message: 'do not have enough data to create a new task' });
    }
    const newTodo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description: description?.trim(),
        isDone: Boolean(isDone),
        userId
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todosRoute.delete('/:todoId/user/:userId', verifyAccessToken, async (req, res) => {
  const todoId = parseInt(req.params.todoId);
  const userId = parseInt(req.params.userId);

  if (isNaN(todoId) || isNaN(userId)) {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or access denied' });
    }
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    } else {
      await prisma.todo.delete({ where: { id: todoId } });
      res.status(200).json(todo);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todosRoute.put('/:todoId/user/:userId', verifyAccessToken, async (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const userId = parseInt(req.params.userId);

    if (isNaN(todoId) || isNaN(userId)) {
      return res.status(400).json({ message: 'ID must be a number' });
    }

    const { title, isDone, description } = req.body;
    if (!title.trim() || !description.trim()) {
      return res.status(400).json({ message: 'do not have enough data to update a task' });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
        userId: userId,
      },
    });
    if (!todo) {
      return res
        .status(404)
        .json({ message: 'Todo not found or you do not have permission to update it' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId, userId: userId },
      data: { title: title.trim(), description: description?.trim(), isDone: Boolean(isDone) },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = todosRoute;
