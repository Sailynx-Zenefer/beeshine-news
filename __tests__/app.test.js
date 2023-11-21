const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
require("jest-sorted");
const endpointsRef = require("../endpoints.json");

const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index.js");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("GET /api/", () => {
  test("GET:200 - responds with a 200 status code and an object of availiable endpoint names", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ _body }) => {
        expect(_body.endpoints);
        const endpointsStr = JSON.stringify(_body.endpoints);
        const endpointsStrRef = JSON.stringify(endpointsRef);
        expect(endpointsStr).toEqual(endpointsStrRef);
      });
  });
});

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

describe("GET /api/articles", () => {
  test("GET:200 - responds with a 200 status code and an array of articles with the correct information", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ _body: { articles } }) => {
        expect(articles.length).toBe(5);
        expect(articles).toBeSorted("created_at",{descending: true });
        articles.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("GET:200 - responds with a 200 status code and an article matching the supplied article id", () => {
    return request(app)
      .get("/api/articles/5")
      .expect(200)
      .then(({ _body: { article } }) => {
        expect(article.length).toBe(1);
        expect(article[0].article_id).toBe(5);
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
      .then(({ _body }) => {
        expect(_body.msg).toBe("Article with that Id does not exist!");
      });
  });
  test("GET:400 - responds with a 400 status code and relevant error message when supplied with an invalid article_id", () => {
    return request(app)
      .get("/api/articles/;DROP TABLE articles;")
      .expect(400)
      .then(({ _body }) => {
        expect(_body.msg).toBe("Bad Request: Invalid Input");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("GET:200 - responds with a 200 status code and an array of comments matching the supplied article id", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then(({ _body: { comments } }) => {
        expect(comments.length).toBe(2);
        expect(comments).toBeSorted("created_at",{descending: true });
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });
  test("GET:404 - responds with a 404 status code and relevant error message when supplied with a non-existant article_id", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ _body }) => {
        expect(_body.msg).toBe("Article with that Id does not exist, nor are there any comments with a matching article Id!");
      });
  });

  test("GET:404 - responds with a 404 status code and relevant error message when no comments are found for existing article_id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(404)
      .then(({ _body }) => {
        expect(_body.msg).toBe("There are no comments for an article with that Id!",);
      });
  });

  test("GET:400 - responds with a 400 status code and relevant error message when supplied with an invalid article_id", () => {
    return request(app)
      .get("/api/articles/;DROP TABLE comments;/comments")
      .expect(400)
      .then(({ _body }) => {
        expect(_body.msg).toBe("Bad Request: Invalid Input");
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
