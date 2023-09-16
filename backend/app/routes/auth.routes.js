const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const Schedule = require("../models/schedule.model");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.put(
    "/api/auth/update-profile",
    [authJwt.verifyToken],
    controller.updateProfile
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
