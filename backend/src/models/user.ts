import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import { UUIDTypes } from 'uuid';

export interface UserInstance extends Model {
  id: UUIDTypes;
  username: string;
  email: string;
  password: string;
}


const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default User;