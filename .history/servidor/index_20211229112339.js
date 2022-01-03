const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

const SlideModel = require("./models/Slide.js");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.zh8gi.mongodb.net/slide?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const tituloSlide = req.body.tituloSlide;
  const conteudoSlide = req.body.conteudoSlide;

  const slide = new SlideModel({ tituloSlide: tituloSlide, conteudoSlide: conteudoSlide });

  try {
    await slide.save();
    res.send("Dados Inseridos");
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  SlideModel.find({}, (error, result) => {
    if (error) {
      res.send(error);
    }

    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newTituloSlide = req.body.newTituloSlide;
  const id = req.body.id;

  try {
    await SlideModel.findById(id, (error, updatedSlide) => {
      updatedSlide.tituloSlide = newTituloSlide;
      updatedSlide.save();
      res.send("Atualizado");
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await SlideModel.findByIdAndRemove(id).exec();
  res.send("deletado")
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001.");
});
