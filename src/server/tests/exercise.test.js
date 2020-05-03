const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const Exercise = require("../models/Exercise");
const { allExercise } = require("../controllers/exercise.controller");
const { mockedRequest, mockedResponse } = require("./mocks");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Exercise routes", () => {
  it("Should return a 200 status code and an array of exercises", async (done) => {
    const req = mockedResponse();
    const res = mockedResponse();
    await allExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    done();
  });
});
