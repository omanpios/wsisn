import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const BASE_URL = "https://api.jikan.moe/v4/anime";

app.get("/", async (req, res) => {
  const sfw = false;
  const type = "tv";
  const min_score = 7;
  const status = "complete";
  const rating = "r17";

  try {
    const response = await axios.get(
      `${BASE_URL}?sfw=${sfw}&type=${type}&min_score=${min_score}&status=${status}&rating=${rating}`
    );
    const result = response.data.data[1];
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

app.listen(port, () => {
  console.log(`Server running on port: ${port} - ${new Date()}`);
});
