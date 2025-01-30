import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import { UUIDTypes } from 'uuid';

export interface TodoInstance extends Model {
    id: UUIDTypes;
    title: string;
    description: string;
    completed: boolean;
    ownerId: string;
    filepaths: string[];
}

const Todo = sequelize.define<TodoInstance>('Todo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    ownerId: {
        type: DataTypes.UUID,
        allowNull: false
    },

    filepaths: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('filepaths');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value: string[]) {
            this.setDataValue('filepaths', JSON.stringify(value));
        }
    }
});

export default Todo;