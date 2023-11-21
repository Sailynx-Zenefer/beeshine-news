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
          const endpointsStr = JSON.stringify(_body.endpoints)
          const endpointsStrRef = JSON.stringify(endpointsRef)
          expect (endpointsStr).toEqual(endpointsStrRef)
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    test("GET:200 - responds with a 200 status code and an article matching the supplied article id", () => {
      return request(app)
        .get("/api/articles/5")
        .expect(200)
        .then(({_body : {article}}) => {
          expect(article.length).toBe(1);
          expect(typeof article[0].article_id).toBe("number");
          expect(typeof article[0].title).toBe("string");
          expect(typeof article[0].topic).toBe("string");
          expect(typeof article[0].author).toBe("string");
          expect(typeof article[0].body).toBe("string");
          expect(typeof article[0].created_at).toBe("string");
          expect(typeof article[0].votes).toBe("number");
          expect(typeof article[0].article_img_url).toBe("string");
        });
    });
    test("GET:404 - responds with a 404 status code and relevant error message when supplied with a non-existant article_id", () => {
      return request(app)
        .get("/api/articles/99")
        .expect(404)
        .then(({_body}) => {
          expect(_body.msg).toBe("Article with that Id does not exist!")
        });
    });
    test("GET:400 - responds with a 400 status code and relevant error message when supplied with an invalid article_id", () => {
      return request(app)
        .get("/api/articles/;DROP TABLE articles;")
        .expect(400)
        .then(({_body}) => {
          expect(_body.msg).toBe("Bad Request: Invalid Input")
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
