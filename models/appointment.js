const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define("appointment", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s-]+$/,
      isValidFullName(value) {
        if (!value || typeof value !== "string") {
          throw new Error("Full name is required");
        }
        
        if (value.trim() === "") {
          throw new Error("Name cannot be empty");
        }

        if (value.replace(/\s/g, "").length < 8) {
          throw new Error("Name must contain at least 8 characters");
        }
        
        const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s-]+$/;
        if (!regex.test(value)) {
          throw new Error("Only letters, spaces and hyphens are allowed");
        }
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: {
        msg: "Enter a valid email address"
      },
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
      isValidDate(value) {
        if (!value) {
          throw new Error("Date is required");
        }

        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(value)) {
          throw new Error("Date must have YYYY-MM-DD format");
        }

        const [year, month, day] = value.split('-').map(Number);

        if (month < 1 || month > 12) {
          throw new Error("Month must be between 01 and 12");
        }

        if (day < 1 || day > 31) {
          throw new Error("Day must be between 01 and 31");
        }

        const lastDayOfMonth = new Date(year, month, 0).getDate();
        if (day > lastDayOfMonth) {
          throw new Error("Day is not valid for the selected month");
        }

        const inputDate = new Date(value + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (inputDate < tomorrow) {
          throw new Error("Date must be at least 1 day in advance from today");
        }

        if (inputDate.getDay() === 0 || inputDate.getDay() === 6) {
          throw new Error("Appointments can only be scheduled Monday to Friday");
        }
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
        if (!value) {
          throw new Error("Time is required");
        }

        const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (!regex.test(value)) {
          throw new Error("Time must have HH:MM:SS format");
        }

        const [hours, minutes, seconds] = value.split(':').map(Number);

        if (seconds !== 0) {
          throw new Error("Seconds must be 00");
        }

        if (minutes !== 0) {
          throw new Error("Minutes must be 00");
        }

        if (hours < 8 || hours > 20 || (hours > 14 && hours < 16)) {
          throw new Error("Service hours are 08:00 to 14:00 and 16:00 to 20:00");
        }
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
      len: {
        args: [3, 40], 
        msg: "Service must be between 3 and 40 characters"
      },
      isValidService(value) {
        if (!value || typeof value !== "string") {
          throw new Error("You must select a service");
        }

        const trimmedService = value.trim();

        if (trimmedService === "") {
          throw new Error("You must select a valid service");
        }

        if (trimmedService.length < 3) {
          throw new Error("Service must have at least 3 characters");
        }

        if (trimmedService.length > 40) {
          throw new Error("Service cannot have more than 40 characters");
        }

        const regex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/;
        if (!regex.test(value)) {
          throw new Error("Service can only contain letters and spaces");
        }
      },
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