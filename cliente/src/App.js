import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Colapsavel from "./Colapsavel";
import Popup from "./Popup";
import Navbar from "./Navbar";

function App() {
  // States de mudança das notas
  const [tituloSlide, setTitulo] = useState("");
  const [conteudoSlide, setConteudo] = useState("");

  const [newTituloSlide, setNewTituloSlide] = useState("");
  const [newConteudoSlide, setNewConteudoSlide] = useState("");

  const [slideList, setSlideList] = useState([]);

  // useEffect para atualização automática quando há alterações
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) =>
      setSlideList(response.data)
    );
  }, []);
  // função add
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      tituloSlide: tituloSlide,
      conteudoSlide: conteudoSlide,
    });
  };
  // Função atualizar
  const updateSlide = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newTituloSlide: newTituloSlide,
      newConteudoSlide: newConteudoSlide,
    });
  };
  // Função deletar
  const deleteSlide = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <>

      <Navbar />
      
      <body className="body1">
        <h1>REACT TO THE FUTURE</h1>
        <Colapsavel label="Adicionar Nota">
          <form className="form">
            <h2>Adicionar Nota</h2>
            <p className="p" type="Título:">
              <input
                className="entrada"
                placeholder="Título da nota"
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
                placeholder="Conteúdo da nota"
                type="text"
                onChange={(event) => {
                  setConteudo(event.target.value);
                }}
              />
            </p>
            <button className="button4" onClick={addToList}>
              Adicionar Nota
            </button>
          </form>
        </Colapsavel>

        <h1>Notas</h1>
        {slideList.map((val, key) => {
          return (
            <Colapsavel label={val.tituloSlide} key={key}>
              <form className="form2">
                <h2>{val.tituloSlide}</h2>
                <p>{val.conteudoSlide}</p>
                <Popup>
                  <div>
                    <h2>Configuração Nota: {val.tituloSlide}</h2>
                    <p className="p" type="Novo Título:">
                      <textarea
                        className="entrada"
                        type="text"
                        placeholder="Novo nome do título"
                        onChange={(event) => {
                          setNewTituloSlide(event.target.value);
                        }}
                      >
                        {val.tituloSlide}
                      </textarea>
                    </p>
                    <p className="p" type="Novo Conteúdo:">
                      <textarea
                        cols="40"
                        rows="5"
                        className="entrada"
                        type="text"
                        placeholder="Atualizar conteudo"
                        onChange={(event) => {
                          setNewConteudoSlide(event.target.value);
                        }}
                      >
                        {val.conteudoSlide}
                      </textarea>
                    </p>

                    <button
                      className="button"
                      onClick={() => updateSlide(val._id)}
                    >
                      Atualizar
                    </button>
                    <button
                      className="button3"
                      onClick={() => deleteSlide(val._id)}
                    >
                      Deletar
                    </button>
                  </div>
                </Popup>
              </form>
            </Colapsavel>
          );
        })}
      </body>
    </>
  );
}

export default App;
