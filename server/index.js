const express = require('express');
const cors = require("cors");
const databaseConfiguration = require("./config/DataBase.js");
const routes = require("./routes/routes")
const bodyParser = require("body-parser")


const dotenv = require("dotenv");


const app = express();

dotenv.config();


const PORT = process.env.PORT || 4001; 
databaseConfiguration();


app.use(cors());

app.use(express.json({ extended: false }));
app.use(bodyParser.json());




app.get("/", (req, res) =>
  res.send("The server is up and running")
);



app.use('/api', routes);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));