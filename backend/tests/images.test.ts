import expressApp from "../src/server";
import request from "supertest";
import mongoose from "mongoose";
import config from "../src/config";

let userAuthToken = "";

describe("Get all images Route", () => {
  it("Returns 200 (OK) when user is logged in", async () => {
    const response = await request(expressApp)
      .get("/api/images")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userAuthToken}`);

    expect(response.status).toEqual(200);
  });

  it("Returns 401 (Unauthorized) when user is not logged in", async () => {
    const response = await request(expressApp)
      .get("/api/images")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(401);
  });

  it("Returns 200 (OK) when user is logged in and paginated and gets correct number of records", async () => {
    const response = await request(expressApp)
      .get("/api/images?limit=2&page=1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userAuthToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.images.length).toEqual(2);
  });
});

beforeAll(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.MONGO_URI);

  // Login user and store the token
  const response = await request(expressApp)
    .post("/api/auth/login")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send({ username: "ShaderOX", password: "Password#123" });

  userAuthToken = response.body.token;
});

/* Closing database connection after each test. */
afterAll(async () => {
  await mongoose.connection.close();
});
