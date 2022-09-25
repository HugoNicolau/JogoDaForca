import palavras from "./palavras";
import React from "react"

export default function App() {
  const alfabeto = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

console.log("teste")
const [botoes, setBotoes] = React.useState(false)
const [erros, setErros] = React.useState(0)
const [palavraEscolhida, setPalavra] = React.useState("")
let arrayPalavra = []
function iniciarJogo(){
    setBotoes(!botoes)
    setErros(0)

    alert("fui clicado")
   let index =  Math.floor(Math.random() * palavras.length);
   setPalavra(palavras[index])
    arrayPalavra=palavraEscolhida;
    console.log(arrayPalavra)

}
function marcarLetra(letra){
alert(letra);
}

  return (
    <div className="container">
      <div className="parte-de-cima">
        <div className="forca">
          <img src={`./assets/forca${erros}.png`} alt="imagem forca"></img>
        </div>
        <div className="escolher-palavra">
          <button onClick={iniciarJogo}>Escolher palavra</button>
        </div>
        <div className="jogo-iniciado">{palavraEscolhida.split("").map((p)=> " _")}</div>
      </div>
      <div className="parte-de-baixo">
        <div className="letras">
            {alfabeto.map((a) => <button onClick={()=> (marcarLetra(a), setErros(erros+1))} disabled={!botoes ? true : false}>{a.toUpperCase()}</button>)}
        </div>
        <div className="chutar-resposta">
            Já sei a palavra! 
        <input placeholder="" disabled={!botoes ? true : false}/>
			<button disabled={!botoes ? true : false} onClick={()=> alert("Fui clicado")}>Chutar!</button>
        </div>
      </div>
    </div>
  );
}
