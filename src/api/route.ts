import { verifyJWTToken } from "./middleware";

module.exports = app => {
  app.use(
    "/api/exercise",
    verifyJWTToken,
    require("./controllers/exercise/router")
  );
  app.use(
    "/api/muscleArea",
    verifyJWTToken,
    require("./controllers/muscle-area/router")
  );
  app.use("/api/user", require("./controllers/user/router"));
};
