const mongoose = require("mongoose");

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

const Slide = mongoose.model("slide", SlideSchema);
module.exports = Slide;
