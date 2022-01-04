import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Colapsavel from "./Colapsavel";
import "./Popup"

function App() {
  const [tituloSlide, setTitulo] = useState("");
  const [conteudoSlide, setConteudo] = useState("");

  const [newTituloSlide, setNewTituloSlide] = useState("");
  const [newConteudoSlide, setNewConteudoSlide] = useState("");

  const [slideList, setSlideList] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
          <form class="form">
            <h2>Adicionar Slide</h2>
            <p className="p" type="Título:">
              <input
                className="entrada"
                placeholder="Título do slide"
                type="text"
                onChange={(event) => {
                  setTitulo(event.target.value);
                }}
              />
            </p>

            <p className="p" type="Conteúdo:">
              <textarea
                cols="40"
                rows="5"
                className="entrada"
                placeholder="Conteúdo do slide"
                type="text"
                onChange={(event) => {
                  setConteudo(event.target.value);
                }}
              />
            </p>
            <button className="button" onClick={addToList}>
              Add To List
            </button>
          </form>
        </Colapsavel>
        <h1>SLIDES</h1>
        <input
          type="button"
          value="Click to Open Popup"
          onClick={togglePopup}
        />
        {isOpen && (
          <Popup
            content={
              <>
                <b>Design your Popup</b>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <button>Test button</button>
              </>
            }
            handleClose={togglePopup}
          />
        )}
        {slideList.map((val, key) => {
          return (
            <Colapsavel label={val.tituloSlide} key={key}>
              <h2>{val.tituloSlide}</h2>
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
              <button className="button" onClick={() => updateSlide(val._id)}>
                Atualizar
              </button>
              <button className="button" onClick={() => deleteSlide(val._id)}>
                Deletar
              </button>
            </Colapsavel>
          );
        })}
      </body>
    </>
  );
}

export default App;
