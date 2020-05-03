const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const User = require("../models/User");
const { register, login } = require("../controllers/user.controller");
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

describe("Authentication and Authorization flow", () => {
  beforeAll(async () => {
    await User.create({
      username: "dane123",
      password: "password",
    });
  });
  describe("Registration", () => {
    it("Should 400 if the username or password is missing from the body", async (done) => {
      const req = mockedRequest({ username: "dane1234" });
      const res = mockedResponse();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Missing username or password",
      });
      done();
    });
    it("Should 400 if the user already exists", async (done) => {
      const req = mockedRequest({ username: "dane123", password: "password" });
      const res = mockedResponse();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "User already exists",
      });
      done();
    });
    it("Should 201 if everything is okay", async (done) => {
      const req = mockedRequest({ username: "dane1234", password: "password" });
      const res = mockedResponse();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      done();
    });
  });
  describe("Login", () => {
    it("Should 400 if the user does not exist", async (done) => {
      const req = mockedRequest({
        username: "dane12345",
        password: "password",
      });
      const res = mockedResponse();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "No one with that username exists",
      });
      done();
    });
    it("Should 400 if password is incorrect", async (done) => {
      const req = mockedRequest({
        username: "dane1234",
        password: "passworddd",
      });
      const res = mockedResponse();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 400,
        message: "Invalid username or password",
      });
      done();
    });
    it("Should 200 if everything is okay", async (done) => {
      const req = mockedRequest({
        username: "dane1234",
        password: "password",
      });
      const res = mockedResponse();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toBeTruthy();
      done();
    });
  });
});
