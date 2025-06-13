const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define("appointment", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s-]+$/,
      len: {
        args: [8, Infinity],
        msg: "Full name must be at least 8 characters long (excluding spaces)",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
      isAfter: {
        args: [new Date().toISOString().split("T")[0]], 
      },
      isValidDate(value) {
        const date = new Date(value);
        return date.getDay() !== 0; 
      },
    },
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
      isValidTime(value) {
        if (!value) return false;

        const [hours, minutes, seconds] = value.split(":").map(Number);

        return (
          seconds === 0 &&
          (minutes === 0 || minutes === 30) &&
          hours >= 8 &&
          hours <= 20 &&
          !(hours === 20 && minutes !== 0)
        );
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/,
      len: [3, 25],
    },
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[A-Za-z0-9]{9}$/,
      isValidCode(value) {
        if (!/^[A-Za-z0-9]{9}$/.test(value)) {
          throw new Error("Invalid code format");
        }
      },
    },
  },
});

module.exports = Appointment;
