const express = require("express");
const port = process.env.PORT || 5001 || 5002 || 5432;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/expenses", require("./v1/routes/expensesRoutes"));
app.use("/api/v1/users", require("./v1/routes/usersRoutes"));

app.use(errorHandler);
app.listen(port, () =>
  console.log(`Servidor de API "Expenses Control" corriendo en puerto: ${port}`)
);
