require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const heroesRoutes = require("./routes/heroes");

app.use(cors(process.env.FRONTEND_URL));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", heroesRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
