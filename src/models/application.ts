import { Model, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../connection/connection";
import Job from "./job";

export default class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    applicant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicant_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    applicantion_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize }
);

Application.belongsTo(Job, { foreignKey: "job_id" });

Application.sync({ alter: { drop: false } });
