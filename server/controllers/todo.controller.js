import Todo from '../models/todo.js';

export const addTodo = async (req, res) => {
    try {
        const todo = await Todo.create({ ...req.body, userId: req.user.userId });
        if (todo) {
            return res.status(201).send({
                statusCode: 201,
                msg: 'todo added successfully'
            })
        }
        else res.status(400).send({
            statusCode: 400,
            msg: 'Something went wrong'
        })
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}).lean();

        res.status(200).send({
            statusCode: 200,
            msg: 'todo fetched',
            todos
        })
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const getUserTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.userId }).lean();
        if (todos) {
            res.status(200).send({
                statusCode: 200,
                msg: 'User todos fetched',
                todos
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const id = req.params.todoId

        const editedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

        if (editedTodo) {
            return res.status(201).send({
                statusCode: 201,
                msg: 'Todo is updated'
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const removeTodo = async (req, res) => {
    try {
        const id = req.params.todoId;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            return res.status(204).send({
                statusCode: 204,
                msg: 'Todo deleted successfully'
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}
