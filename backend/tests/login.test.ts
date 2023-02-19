import expressApp from "../src/server";
import request from "supertest";
import mongoose from "mongoose";
import config from "../src/config";
import { UserModel } from "../src/models/UserModel";

// Credentials for user test user
const username = "SampleUser0001";
const password = "Password#123";
const email = "sample.user@gmail.com";

let userAuthToken = "";

describe("Login Route", () => {
  it("Returns 200 (OK) alongside user object, token when correct credentials", async () => {
    const response = await request(expressApp)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ username, password });

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toBeTruthy();
  });

  it("Returns 400 (Bad Request) when incorrect credentials", async () => {
    const response = await request(expressApp)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ username, password: password + "1" });

    expect(response.status).toEqual(400);
  });

  it("Returns 400 (Bad Request) when user not found", async () => {
    const response = await request(expressApp)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ username: username + "xyz", password });

    expect(response.status).toEqual(400);
  });

  it("Returns 400 (Bad Request) when validation fails", async () => {
    const response = await request(expressApp)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ username });

    expect(response.status).toEqual(400);
  });

  it("Returns 400 (Bad Request) when user is already logged in", async () => {
    const response = await request(expressApp)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userAuthToken}`)
      .send({ username, password });

    expect(response.status).toEqual(400);
  });
});

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.MONGO_URI);

  // User Creation
  const newUser = await request(expressApp)
    .post("/api/auth/register")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send({ username, password, email });

  // Login user and store the token
  const response = await request(expressApp)
    .post("/api/auth/login")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send({ username, password });

  userAuthToken = response.body.token;
});

/* Closing database connection after each test. */
afterAll(async () => {
  // Delete sample user
  await UserModel.deleteOne({
    username,
    email,
  });

  await mongoose.connection.close();
});
