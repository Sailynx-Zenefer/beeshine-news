const {
  checkCommentFormat,
  checkArticleIdExists,
  checkUserNameExists,
  checkVoteObj,
} = require("../utils");

describe("checkCommentFormat()", () => {});

describe("checkArticleIdExists()", () => {
    test("should return true if passed existing article_id", () => {
        checkArticleIdExists(5)
        .then((result) => {
            expect(result).toBe(true)
        })
        
      });
      test("should return false if passed non-existing article_id", () => {
        checkArticleIdExists(99)
        .then((result) => {
            expect(result).toBe(false)
        })
        
      });
      test("should return false if passed invalid article_id", () => {
        checkArticleIdExists('boop')
        .then((result) => {
            expect(result).toBe(false)
        })
        
      });
});

describe("checkUserNameExists()", () => {});

describe("checkVoteObj()", () => {
  test("should return true if passed correctly formatted vote object", () => {
    const testVote = {
      inc_votes: 1,
    };
    expect(checkVoteObj(testVote)).toBe(true)
  });
  test("should return false if passed an incorrectly formatted vote object", () => {
    const testVote2 = {
      inc_voted: 'a',
    };
    expect(checkVoteObj(testVote2)).toBe(false)
  });
});

// const testComment = {
//     "username" : "icellusedkars",
//     "body" : "The cats know what they're doing, I trust them... miaow."
//   }
