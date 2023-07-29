const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/users");
// const doctorRoutes = require("./routes/doctors");


const app = express();

app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/auth', authRoutes)
// app.use("/user", userRoutes);
// app.use("/doctor", doctorRoutes);

mongoose
	.connect(
		"mongodb+srv://codecrusaders:codecrusaders@cluster0.3klpegu.mongodb.net/",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		console.log("CONNECTION FOR MONGODB OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO ERROR FOR MONGODB!!!!");
		console.log(err);
	});

// app.use('/',(req, res)=>{
// 	res.send("hello")
// })
app.listen(4000, () => {
	console.log("Listening to port 4000");
});
