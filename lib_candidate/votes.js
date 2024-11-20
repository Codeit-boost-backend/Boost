const express = require("express");
const router = express.Router();
const db = require("../db"); // db 연결 모듈

// 지역 선택 페이지
router.get("/", (req, res) => {
  // 모든 지역 목록을 가져오는 쿼리
  const query = "SELECT DISTINCT region FROM candidates";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("지역 조회 실패");
    }

    // 지역 목록을 HTML 테이블로 생성
    let regionRows = results
      .map(
        (region) => `
        <tr>
            <td><a href="/votes/${region.region}">${region.region}</a></td>
        </tr>
    `
      )
      .join("");

    // 최종 HTML 응답
    res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>투표하기 - 지역 선택</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>투표할 지역을 선택하세요</h1>
            <table>
                <thead>
                    <tr>
                        <th>지역</th>
                    </tr>
                </thead>
                <tbody>
                    ${regionRows}
                </tbody>
            </table>
        </body>
        </html>
     `);
  });
});

// 특정 지역의 후보 페이지
router.get("/:region", (req, res) => {
  const region = req.params.region;

  // 특정 지역의 후보 조회
  const query = "SELECT * FROM candidates WHERE region = ?";
  db.query(query, [region], (err, results) => {
    if (err) {
      return res.status(500).send("후보 조회 실패");
    }

    // 후보 목록을 HTML로 생성
    let candidateCheckboxes = results
      .map(
        (candidate) => `
            <div>
                <input type="checkbox" name="candidateIds" value="${candidate.id}" id="candidate${candidate.id}">
                <label for="candidate${candidate.id}">${candidate.name}</label>
            </div>
        `
      )
      .join("");

    // 최종 HTML 응답
    res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>${region} 지역 투표하기</title>
        </head>
        <body>
            <h1>${region} 지역 투표하기</h1>
            <form action="/votes" method="POST">
                ${candidateCheckboxes}
                <button type="submit">투표</button>
            </form>
        </body>
        </html>
    `);
  });
});

// 투표 처리
router.post("/", (req, res) => {
  let { candidateIds } = req.body; // let으로 변경

  // 후보자가 선택되지 않았거나 candidateIds가 존재하지 않을 경우 처리
  if (!candidateIds) {
    return res.status(400).send("후보를 선택해야 합니다.");
  }

  // 후보자가 하나만 선택된 경우에도 정상 처리
  if (!Array.isArray(candidateIds)) {
    candidateIds = [candidateIds]; // 배열이 아닌 경우 배열로 변환
  }

  // DB에 투표 저장 로직 추가 필요
  // 예시: candidateIds 배열을 사용하여 DB에 투표 기록을 저장하는 로직을 추가하세요.

  res.send("투표 완료");
});

module.exports = router;
