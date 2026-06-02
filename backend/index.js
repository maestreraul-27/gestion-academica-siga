const express = require("express");
const cors = require("cors");

const estudiantesRoutes = require("./routes/estudiantesRoutes");
const profesoresRoutes = require("./routes/profesoresRoutes");
const calificacionesRoutes = require("./routes/calificacionesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bienvenido al Sistema de Gestion Academica");
});

app.use("/estudiantes", estudiantesRoutes);
app.use("/profesores", profesoresRoutes);
app.use("/calificaciones", calificacionesRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});