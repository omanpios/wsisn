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
    const randomAnime = await getRandomAnime(`${BASE_URL}/random/anime`);
    res.render("index.ejs", {
      animeList: randomAnime,
    });
  } catch (error) {
    handleError(error)
  }
});

app.post("/", async (req, res) => {
  const params = getParamsFromRequest(req);
  try {
    const animeList = await getAnimeList(`${BASE_URL}/anime`, params);
    const pickedAnimes = pickThreeRandomAnimesFromList(animeList);
    res.render("index.ejs", {
      animeList: pickedAnimes,
    });
  } catch (error) {
    handleError(error)
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port} - ${new Date()}`);
});

function getParamsFromRequest(req) {
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
  return params;
}

async function getAnimeList(url, params) {
  const response = await axios.get(url, { params });
  const animeList = response.data.data;
  return animeList;
}

async function getRandomAnime(url) {
  const response = await axios.get(url);
  const randomAnime = [response.data.data];
  return randomAnime;
}

function pickThreeRandomAnimesFromList(animeList) {
  var selectedAnimes = [];
  if (animeList.length > 0) {
    for (let i = 0; i < animeList.length; i++) {
      if (i == 3) {
        break;
      }
      var index = Math.floor(Math.random() * animeList.length);
      selectedAnimes.push(animeList[index]);
      animeList.splice(index, 1);
    }
  }
  return selectedAnimes;
}

function handleError(error) {
  console.log(error);
  res.status(500);
}
