const express = require("express");
const router = express.Router();
const team = require("../controllers/team.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  router.get("/team/all", [auth.verifyToken, auth.isUser], team.findAll);
  router.post("/team/add", [auth.verifyToken, auth.isUser], team.create);
  router.get("/team/:id", [auth.verifyToken, auth.isUser], team.findById);
  router.put("/team/edit/:id", [auth.verifyToken, auth.isUser], team.update);
  router.delete(
    "/team/delete/:id",
    [auth.verifyToken, auth.isUser],
    team.delete
  );
  app.use(router);
};
