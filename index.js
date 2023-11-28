import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const BASE_URL = "https://api.jikan.moe/v4";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/random/anime`);
    const result = response.data.data;
    res.render("index.ejs", {
      title: result.title,
      title_japanese: result.title_japanese,
      synopsis: result.synopsis,
      image_url: result.images.jpg.image_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/", async (req, res) => {
  const request = req.body;
  console.log(request);
  const sfw = request.sfw;
  const type = request.type;
  const min_score = Number(request.score);
  const status = request.status;
  const rating = request.rating;
  console.log(`Score: ${min_score}`);

  try {
    const response = await axios.get(
      `${BASE_URL}/anime?sfw=${sfw}&type=${type}&status=${status}&rating=${rating}&min_score=${min_score}`
    );
    console.log();
    const randomIndex = Math.floor(Math.random() * response.data.data.length);
    const result = response.data.data[randomIndex];
    res.render("index.ejs", {
      title: result.title,
      title_japanese: result.title_japanese,
      synopsis: result.synopsis,
      image_url: result.images.jpg.image_url,
    });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", {
      title: "result.title",
      title_japanese: "result.title_japanese",
      synopsis: "result.synopsis",
      image_url: "result.images.jpg.image_url",
    });
  }
});
app.listen(port, () => {
  console.log(`Server running on port: ${port} - ${new Date()}`);
});
