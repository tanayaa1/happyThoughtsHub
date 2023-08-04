const express = require("express");
const Doctor = require("../models/doctor");
const User = require("../models/user");
const mongoose = require("mongoose");

const getDoctor = async (req, res) => {
	try {
		const doctor = await Doctor.find({ userId: req.params.id });
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}
		res.status(200).json(doctor);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createDoctor = async (req, res) => {
	const doctor = await Doctor.find({ userId: req.params.id });
	if (doctor) res.status(500).json({ error: "Doctor already exists" });
	else
		try {
			const doctor = new Doctor(req.body);
			await doctor.save();
			res.status(201).json(doctor);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
};

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


module.exports = { getDoctor, createDoctor, editDoctor };
