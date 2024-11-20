const express = require("express");
const router = express.Router();
const db = require("../db.js");

// 후보 등록 페이지
router.get("/register", (req, res) => {
  res.send(`         
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>후보 등록</title>
        </head>
        <body>
            <h1>후보 등록</h1>
            <form action="/candidates/register" method="POST">
                <input type="text" name="name" placeholder="후보 이름" required>
                <input type="text" name="region" placeholder="지역" required>
                <button type="submit">등록</button>
            </form>
        </body>
        </html>
        `);
});

// 후보 등록 처리
router.post("/register", (req, res) => {
  const { name, region } = req.body;

  // 로그인한 사용자의 지역 정보 가져오기
  const userRegion = req.session.region; // 세션에서 사용자 지역 정보 가져오기

  if (!name || !region) {
    return res.status(400).send("모든 필드를 입력해야 합니다.");
  }

  // 사용자의 지역과 후보 등록 지역 비교
  if (userRegion !== region) {
    console.log(`사용자의 지역: ${userRegion}, 후보 등록 지역: ${region}`); // 콘솔에 지역 정보 출력
    return res.status(403).send("자신의 지역에서만 후보 등록이 가능합니다.");
  }

  const query = "INSERT INTO candidates (name, region) VALUES (?, ?)";
  db.query(query, [name, region], (err) => {
    if (err) {
      return res.status(500).send("후보 등록 실패");
    }
    x;
    res.send("후보 등록 완료");
  });
});

module.exports = router;
