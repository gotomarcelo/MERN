import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Colapsavel from "./Colapsavel";

function App() {
  const [tituloSlide, setTitulo] = useState("");
  const [conteudoSlide, setConteudo] = useState("");

  const [newTituloSlide, setNewTituloSlide] = useState("");
  const [newConteudoSlide, setNewConteudoSlide] = useState("");

  const [slideList, setSlideList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) =>
      setSlideList(response.data)
    );
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      tituloSlide: tituloSlide,
      conteudoSlide: conteudoSlide,
    });
    window.location.reload();
  };

  const updateSlide = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newTituloSlide: newTituloSlide,
      newConteudoSlide: newConteudoSlide,
    });
    window.location.reload();
  };

  const deleteSlide = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    window.location.reload();
  };

  return (
    <>
      <body>
        <h1>React To The Future</h1>
        <Colapsavel label="Adicionar Slide">
          <h2>Adicionar Slide</h2>
          <p type="Name:"><input placeholder="Título do slide"
            type="text"
            onChange={(event) => {
              setTitulo(event.target.value);
            }}
          /></p>

          <label>Conteudo:</label>
          <input
            type="text"
            onChange={(event) => {
              setConteudo(event.target.value);
            }}
          />
          <button onClick={addToList}>Add To List</button>
        </Colapsavel>
        <h1>SLIDES</h1>
        {slideList.map((val, key) => {
          return (
            <Colapsavel label={val.tituloSlide} key={key}>
              <h1>{val.tituloSlide}</h1>
              <p>{val.conteudoSlide}</p>
              <input
                type="text"
                placeholder="Novo nome do título"
                onChange={(event) => {
                  setNewTituloSlide(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Atualizar conteudo"
                onChange={(event) => {
                  setNewConteudoSlide(event.target.value);
                }}
              />
              <button onClick={() => updateSlide(val._id)}>Atualizar</button>
              <button onClick={() => deleteSlide(val._id)}>Deletar</button>
            </Colapsavel>
          );
        })}
      </body>
    </>
  );
}

export default App;
