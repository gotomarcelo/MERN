const mongoose = require("mongoose");

// Modelamento do banco de dados, o título e o conteúdos são obrigatórios
const SlideSchema = new mongoose.Schema({
  tituloSlide: {
    type: String,
    require: true,
  },
  conteudoSlide: {
    type: String,
    required: true,
  },
});

// criação do Schema
const Slide = mongoose.model("slide", SlideSchema);
module.exports = Slide;
