const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
require("jest-sorted");
const endpointsRef = require("../endpoints.json")

const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index.js");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("GET:200 - responds with a 200 status code and an array of topic objects ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ _body }) => {
        expect(_body.topics.length).toBe(3);
        _body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api/", () => {
    test("GET:200 - responds with a 200 status code and an object of availiable endpoint names", () => {
      return request(app)
        .get("/api/")
        .expect(200)
        .then(({_body}) => {
          expect(_body.endpoints);
          const endpointNames = Object.keys(_body.endpoints)
          const endpointNamesRef = Object.keys(endpointsRef)
          expect (endpointNames).toEqual(endpointNamesRef)
          endpointNames.forEach((endpoint) => {
            const endpointProperties = Object.keys(_body.endpoints[endpoint])
            const endpointPropertiesRef = Object.keys(endpointsRef[endpoint])
            expect (endpointProperties).toEqual(endpointPropertiesRef)
          });
        });
    });
  });

describe("general api errors", () => {
  test("GET 404 : BAD REQUEST - responds with a 404 status code, when a non-existant endpoint is tried ", () => {
    return request(app)
      .get("/api/boats")
      .expect(404)
      .then((body) => {
        expect(body._body.msg).toBe("Not Found");
      });
  });
});

// describe('',() => {})