import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  const [newFoodName, setNewFoodName] = useState("");

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) =>
      setFoodList(response.data)
    );
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
    window.location.reload();
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
    window.location.reload();
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>Crud app com o MERN</h1>

      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />

      <label>Dias que eu comi:</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <button onClick={addToList}>Add To List</button>
      <h1>Lista de Comida</h1>
      {foodList.map((val, key) => {
        return (
          <div key={key}>
            <h1>{val.foodName}</h1>
            <h1>{val.daysSinceIAte}</h1>
            <input
              type="text"
              placeholder="Novo nome do alimento"
              onChange={(event) => {
                setNewFoodName(event.target.value);
              }}
            />
            <button onClick={()=> updateFood(val._id)}>Atualizar</button>
            <button onClick={()=> deleteFood(val._id)}>Deletar</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
