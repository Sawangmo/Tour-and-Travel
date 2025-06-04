// controllers/serviceController.js
const Service = require("../models/serviceModel");

exports.getServicesPage = async (req, res) => {
  const services = await Service.getAllServices();
  res.render("pages/services", {
    pageTitle: "Our Services",
    services,
  });
  
};
