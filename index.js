const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const { json } = require("body-parser");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
	res.send("we are at home");
});

//mongoose connection
mongoose.connect(
	process.env.DB_CONNECTION,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
	() => {
		console.log("connected to DB");
	}
);

//port
app.listen(3000);
