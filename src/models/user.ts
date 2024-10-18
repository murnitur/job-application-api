import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../connection/connection";

export default class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: { msg: "Enter a valid email address." } },
      unique: {
        name: "email",
        msg: "This email address is already in use.",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

User.sync({ alter: { drop: false } });
