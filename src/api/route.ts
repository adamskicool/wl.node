module.exports = app => {
  app.use("/api/exercise", require("./controllers/exercise/router"));
  app.use("/api/muscleArea", require("./controllers/muscle-area/router"));
  app.use("/api/user", require("./controllers/user/router"));
};
