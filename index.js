import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const BASE_URL = "https://api.jikan.moe/v4";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/random/anime`);
    const result = response.data.data;
    const newTitles = [result];
    res.render("index.ejs", {
      animeList: newTitles,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/", async (req, res) => {
  const request = req.body;
  const sfw = request.sfw;
  const type = request.type;
  const min_score = Number(request.score);
  const status = request.status;
  const rating = request.rating;

  const params = {
    ...(sfw != "" && { sfw: sfw }),
    ...(type != "" && { type: type }),
    ...(min_score != "" && { min_score: min_score }),
    ...(status != "" && { status: status }),
    ...(rating != "" && { rating: rating }),
  };

  try {
    const response = await axios.get(`${BASE_URL}/anime`, { params });
    const animeList = response.data.data;
    if (animeList.length > 0) {
      var newTitles = [];
      for (let i = 0; i < 3; i++) {
        var index = Math.floor(Math.random() * animeList.length);
        newTitles.push(animeList[index]);
        animeList.splice(index, 1);
      }

      res.render("index.ejs", {
        animeList: newTitles,
      });
    } else {
      const error = [
        {
          title: "Try again!",
          title_japanese: "もう一度やり直してください",
          synopsis: "No animes found, try new criteria",
          images: { webp: { image_url: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=996&t=st=1701376098~exp=1701376698~hmac=2b2d0cb5f386f9f21ffb9235cb6e1f2cd198cbbec8cde341abda1207fb04cecc" } },
          score: "",
        },
      ];
      res.render("index.ejs", {
        animeList: error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
app.listen(port, () => {
  console.log(`Server running on port: ${port} - ${new Date()}`);
});
