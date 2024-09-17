import express from "express";
import cors from "cors";
import { sample_Porks, sample_tags } from "./data";


const app = express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/porks", (req,res) => {
    res.send(sample_Porks);
})

app.get("/api/porks/search/:serchTerm", (req, res) => {
    const searchTerm = req.params.serchTerm;
    const porks = sample_Porks
    .filter(pork => pork.name.toLowerCase()
    .includes(searchTerm.toLowerCase()));
    res.send(porks);
})

app.get("/api/porks/tags", (req, res) => {
    res.send(sample_tags);
})

app.get("/api/porks/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const porks = sample_Porks
    .filter(pork => pork.tags?.includes(tagName));
    res.send(porks);
})

app.get("/api/porks/:porkId", (req, res) => {
    const porkId = req.params.porkId;
    const pork = sample_Porks.find(pork => pork.id == porkId);
    res.send(pork);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
