import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../connection/connection";

export default class Job extends Model {}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { sequelize }
);

Job.sync({ alter: { drop: false } });
