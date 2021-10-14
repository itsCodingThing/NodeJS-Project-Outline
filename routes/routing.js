const basePath = "/api/v1/";

const masterController = require("../app/controllers/master.controller");
const authController = require("../app/controllers/auth.controller");

const routes = [
  // Master Routing
  {
    method: "GET",
    url: basePath + "master/countries",
    handler: masterController.getCountries,
  },
  {
    method: "GET",
    url: basePath + "master/states/:id",
    handler: masterController.getStateList,
  },
  {
    method: "GET",
    url: basePath + "master/cities/:id",
    handler: masterController.getCityList,
  },

  //User Auth Routing
  {
    method: "POST",
    url: basePath + "auth/login",
    handler: authController.login,
  },
  {
    method: "POST",
    url: basePath + "auth/register",
    handler: authController.register,
  },
];

module.exports = routes;
