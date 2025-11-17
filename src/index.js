require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const juegosRoutes = require("./routes/juegos");
const reseñasRoutes = require("./routes/reseñas");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/juegos", juegosRoutes);
app.use("/api/reseñas", reseñasRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✔ Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("✔ Servidor backend en http://localhost:" + process.env.PORT);
    });
  })
  .catch((err) => console.error("Error MongoDB:", err));
