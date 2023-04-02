const express = require("express");
const router = express.Router();
const team = require("../controllers/team.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  router.get(
    "/team/all",
    [auth.verifyToken, auth.isSuperUser, auth.isAdmin],
    team.findAll
  );
  router.post(
    "/team/add",
    [auth.verifyToken, auth.isSuperUser, auth.isAdmin],
    team.create
  );
  router.get(
    "/team/:id",
    [auth.verifyToken, auth.isSuperUser, auth.isAdmin],
    team.findById
  );
  router.put(
    "/team/edit/:id",
    [auth.verifyToken, auth.isSuperUser, auth.isAdmin],
    team.update
  );
  router.delete(
    "/team/delete/:id",
    [auth.verifyToken, auth.isSuperUser, auth.isAdmin],
    team.delete
  );
  app.use(router);
};
