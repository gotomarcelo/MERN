import React, { useState, useRef } from "react";
import "./Colapsavel.css";

function Colapsavel(props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const paiRef = useRef();

  return (
    <div className="colapsavel">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {props.label}
      </button>
      <div 
      className="conteudo-pai" 
      // esse ref muda com o toggle acima, ao clicar, o estilo muda
      ref={paiRef} 
      style={isOpen 
        ?   {
            height: paiRef.current.scrollHeight + "px"
            }
        :   {
            height: "0px"
            }
      }
    >
        <div className="conteudo">{props.children}</div>
      </div>
    </div>
  );
}

export default Colapsavel;
