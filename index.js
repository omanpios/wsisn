import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const BASE_URL = "https://api.jikan.moe/v4/anime";

app.get("/", async (req, res) => {
  const sfw = false;
  const type = "movie";
  const min_score = 8;
  const status = "complete";
  const rating = "rx";

  try {
    const response = await axios.get(
      `${BASE_URL}?sfw=${sfw}&type=${type}&min_score=${min_score}&status=${status}&rating=${rating}`
    );
    const result = response.data.data;
    res.render("index.ejs", {
      title: result[0].title,
      title_japanese: result[0].title_japanese,
      synopsis: result[0].synopsis,
      image_url: result[0].images.jpg.image_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port} - ${new Date()}`);
});
