const request = require("supertest");
const app = require("../src/index");

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTcyOGYwMDkxZjAwMjc2ZGNhYTQ4NCIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzIzNjQ2MjA1LCJleHAiOjE3MjQyNTEwMDV9.r3W06qJORteNIRS3HgYawm00KX4DFENoaNx2KzkNBm4";

const ADMIN_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc2OTZkNzMxNGQxZTAzZTI3MjQzOSIsImVtYWlsIjoiYmlqYXlhQHNvZnQuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTcyMzY0Njc5OCwiZXhwIjoxNzI0MjUxNTk4fQ.9G6NN3tcZym0sb3QSc9zD4-G5clwmhiUaZ3YEXPTmOM";
describe("Api Test Collection", () => {
  // * -------------------- Authentication Tests ------------------------- * //
  describe("Authentication Tests", () => {
    // Test case 1 (/)
    it("GET / | Response text", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("Welcome to Sangeet Backend"); // Default Response
    });

    // Register API (post)
    it("POST /api/auth/register | Response with message", async () => {
      const response = await request(app).post("/api/auth/register").send({
        firstName: "Bijaya",
        lastName: "Majhi",
        email: "bijaya@gmail.com",
        password: "password",
      });

      if (!response.body.success) {
        expect(response.statusCode).toBe(400);
      } else {
        // expect(response.body.message).toEqual("User Registered Successfully!"); // For reference
        expect(response.statusCode).toBe(200);
      }
    });

    // Test login function
    it("POST /api/auth/login | Response with message", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "bijaya@gmail.com",
        password: "password",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty("accessToken"); // Assuming you return a token on successful login
    });
  });

  // * -------------------- Genre Tests ------------------------- * //
  describe("Genre Tests", () => {
    it("POST /api/genre | Response text", async () => {
      const response = await request(app)
        .post("/api/genre")
        .set("Authorization", `Bearer ${ADMIN_ACCESS_TOKEN}`)
        .send({
          name: "Hip Pop",
        }); // Only Admin has permission to create genre
      if (!response.body.success) {
        expect(response.statusCode).toBe(401);
      } else {
        expect(response.body.data.message).toEqual("Genre has been created.");
        expect(response.statusCode).toBe(200);
      }
    });
  });

  // * -------------------- Song Tests ------------------------- * //
  describe("Song Tests", () => {
    it("GET /api/song | Response text", async () => {
      const response = await request(app)
        .get("/api/song")
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      if (!response.body.success) {
        expect(response.statusCode).toBe(400);
      } else {
        expect(response.statusCode).toBe(200);
      }
    });
  });

  // * -------------------- Artist Tests ------------------------- * //
  describe("Artist Tests", () => {
    it("GET /api/artist | Response text", async () => {
      const response = await request(app)
        .get("/api/artist")
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      if (!response.body.success) {
        expect(response.statusCode).toBe(400);
      } else {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty("artist");
      }
    });
  });

  // * -------------------- User Tests ------------------------- * //
  describe("User Tests", () => {
    it("PATCH /api/user/change-password | Response text", async () => {
      const response = await request(app)
        .patch("/api/user/change-password")
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
        .send({
          oldPassword: "password",
          newPassword: "password",
        });
      if (!response.body.success) {
        expect(response.statusCode).toBe(400);
      } else {
        expect(response.body.data.message).toEqual(
          "User Password has been updated."
        );
        expect(response.statusCode).toBe(200);
      }
    });
  });

  // * -------------------- User Favorite Song Tests ------------------------- * //
  describe("User Favorite Song Tests", () => {
    it("POST /api/user/favorite | Response text", async () => {
      const response = await request(app)
        .post("/api/user/favorite")
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
        .send({
          songId: "66b8a16411a3db6121164b3f", // Valid Song Id
        });
      if (!response.body.success) {
        expect(response.statusCode).toBe(400);
      } else {
        expect(response.body.data.message).toEqual(
          "Song has been added to the favorite."
        );
        expect(response.statusCode).toBe(200);
      }
    });

    it("GET /api/user/favorite | Response text", async () => {
      const response = await request(app)
        .get("/api/user/favorite")
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

      if (!response.body.success) {
        expect(response.statusCode).toBe(400);
      } else {
        expect(response.body.data).toHaveProperty("favorite");
        expect(response.statusCode).toBe(200);
      }
    });
  });

  // * -------------------- User Playlist Tests ------------------------- * //
  describe("User Playlist Tests", () => {
    it("PATCH /api/user/playlist | Response text", async () => {
      const response = await request(app)
        .post("/api/user/playlist")
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
        .send({
          name: "My-playlist",
        });
      if (!response.body.success) {
        expect(response.statusCode).toBe(401);
      } else {
        expect(response.body.data.message).toEqual(
          "Playlist has been created."
        );
        expect(response.statusCode).toBe(201);
      }
    });
  });
});
