const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const User = require("../models/User");
const request = require("supertest");
const server = require("../index");

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

describe("Authentication and Authorization flow", () => {
  beforeAll(async () => {
    const user = await User.create({
      username: "dane123",
      password: "password",
    });
  });
  describe("Register", () => {
    it("Should return an error if missing username or password", async (done) => {
      const response = await request(server)
        .post("/register")
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      done();
    });
    it("Should return an error if the user already exists", async (done) => {
      const response = await request(server)
        .post("/register")
        .set("Accept", "application/json")
        .send({ username: "dane123", password: "password" });
      expect(response.status).toBe(400);
      done();
    });
  });
  describe("Login", () => {
    it("Should return an error if the user doesn't exist", async (done) => {
      const response = await request(server)
        .post("/login")
        .set("Accept", "application/json")
        .send({ username: "dane1234", password: "password" });
      expect(response.status).toBe(400);
      done();
    });
  });
});
