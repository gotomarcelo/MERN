import "./Navbar.css";

function Navbar() {
  return (
    <div id="navbar">
      <ul>
        <li>
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="imagem"
            alt=''
          /> 
        </li>
        <li>
          <a href="https://pt-br.reactjs.org">React</a>
        </li>
        <li>
            <a href="https://github.com/gotomarcelo/slide">Github do Projeto</a>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
