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

  app.put("/api/auth/update-profile/:userId", controller.updateProfileById);

  app.post("/api/auth/signin", controller.signin); // gọi tới đúng logic

  app.get(
    "/api/accounts",
    // [verifyToken, isAdmin],
    controller.listAccounts
  );

  app.get(
    "/api/accounts/:role",
    // [verifyToken, isAdmin],
    controller.listAccountsByRole
  );

  app.get("/api/accounts/user/:userId", controller.getInfoById);

  app.post("/api/auth/signout", controller.signout);
};
