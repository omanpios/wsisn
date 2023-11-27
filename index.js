import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const BASE_URL = "https://api.jikan.moe/v4/anime";

app.get("/", (req, res) => {
  try {
    const respose = axios.get(BASE_URL);
  } catch (error) {}
});

app.listen(port, () => {
  `Server running on port: ${port}`;
});
