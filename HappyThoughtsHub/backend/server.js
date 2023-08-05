require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookingRoutes");
const doctorRoutes = require("./routes/doctors");
const fileUpload = require("express-fileupload");
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/doctor", doctorRoutes);
app.use(
	fileUpload({
		useTempFiles: true,
	})
);

console.log("hi");
// connect to db
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("connected to database");
		// listen to port

		app.listen(process.env.PORT, () => {
			console.log("listening for requests on port", process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});
