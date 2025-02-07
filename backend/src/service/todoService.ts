import { Identifier } from "sequelize";
import { TodoInterface } from "../interfaces/todoInterface";
import Todo from "../models/todo";
import Fs from 'node:fs/promises'
import { UUIDTypes } from "uuid";

const todoService = {
    getTodos: async (ownerId: UUIDTypes) => {
        return await Todo.findAll({ where: { ownerId } });
    },

    getTodoById: async (id: UUIDTypes) => {
        return await Todo.findByPk(id as Identifier);
    },

    createTodo: async (todo: Omit<TodoInterface, 'id'>) => {
        return await Todo.create(todo);
    },

    completeTodo: async (id: UUIDTypes) => {
        const todo = await Todo.findByPk(id as Identifier);
        if (!todo) {
            throw new Error('Todo not found');
        }
        todo.completed = !todo.completed;
        await todo.save();
        return todo;
    },

    deleteTodo: async (id: UUIDTypes) => {
        const todo = await Todo.findByPk(id as Identifier);
        if (!todo) {
            throw new Error('Todo not found');
        }
        for(var i = 0; i < todo.filepaths.length; i++){
            await Fs.unlink(todo.filepaths[i]);
        }
        if (!todo) {
            throw new Error('Todo not found');
        }
        await todo.destroy();
        return { success: true };
    }
};

export default todoService;