const express = require("express");
const Doctor = require("../models/doctor");
const User = require("../models/user");
const mongoose = require("mongoose");

const getDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find().populate("userId", "name email");
		res.json(doctors);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching doctors", error: error.message });
	}
};

const getDoctor = async (req, res) => {
	try {
		const doctor = await Doctor.find({ userId: req.params.id });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}
		console.log(doctor);
		res.status(200).json(doctor);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createDoctor = async (req, res) => {
	try {
		const doctor = await Doctor.find({ userId: req.params.id });
		if (doctor)
			res.status(500).json({ doctor: doctor, error: "Doctor already exists" });
		const newDoctor = new Doctor(req.body);
		await newDoctor.save();
		res.status(201).json(newDoctor);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating doctor", error: error.message });
	}
};

// const createDoctor = async (req, res) => {
// 	const { email, address, speciality } = req.body;

// 	try {
// 		const user = await User.findOne({ email });
// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}
// 		const existingDoctor = await Doctor.findOne({ userId: user._id });
// 		if (existingDoctor) {
// 			return res.status(409).json({ error: "Doctor already exists" });
// 		}
// 		const newDoctor = new Doctor({
// 			userId: user._id,
// 			address,
// 			speciality,
// 		});
// 		await newDoctor.save();
// 		res.status(201).json(newDoctor);
// 	} catch (error) {
// 		res
// 			.status(500)
// 			.json({ message: "Error creating doctor", error: error.message });
// 	}
// };

const editDoctor = async (req, res) => {
	try {
		const doctor = await Doctor.findOne({ userId: req.params.id });

		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		if (req.body.address) {
			doctor.address = req.body.address;
		}

		if (req.body.speciality) {
			doctor.speciality = req.body.speciality;
		}

		const updatedDoctor = await doctor.save();
		res.json(updatedDoctor);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = { getDoctor, createDoctor, editDoctor, getDoctors };
