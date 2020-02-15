import {
  createConnection,
  Connection,
  getRepository,
  Repository
} from "typeorm";
import { getAllExercises } from "../../src/api/controllers/exercise/service";
import { Exercise } from "../../src/entity/Exercise";

let connection: Connection, respository: Repository<Exercise>;

describe("exercise services", () => {
  beforeEach(async () => {
    connection = await createConnection();
    respository = getRepository(Exercise);
  });

  afterEach(async () => {
    await connection.close();
  });

  describe("getAllExercises", () => {
    it("works", () => {
      expect(true).toBeTruthy();
    });
  });
});
