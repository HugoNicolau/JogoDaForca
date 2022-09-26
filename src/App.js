import palavras from "./palavras";
import React from "react";

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

  const [botoes, setBotoes] = React.useState(false);
  const [erros, setErros] = React.useState(0);
  const [palavraEscolhida, setPalavra] = React.useState("");
  const [palavraChute, setPalavraChute] = React.useState("");
  const [fimDeJogo, setFimDeJogo] = React.useState(false);
  const [acertos, setAcertos] = React.useState(0);
  const [arrayLetras, setArrayLetras] = React.useState([]);

  function iniciarJogo() {
    if (botoes === false) {
      setBotoes(!botoes);
    }
    setErros(0);
    setAcertos(0);
    setArrayLetras([]);
    setClassesResult("jogo-iniciado");
    setFimDeJogo(false);
    setPalavraChute("");

    let index = Math.floor(Math.random() * palavras.length);
    setPalavra(palavras[index]);
  }

  function marcarLetra(letra) {
    if (letra === "a") {
      const novoArray = [...arrayLetras, letra, "à", "ã", "â", "á"];
      setArrayLetras(novoArray);
    } else if (letra === "e") {
      const novoArray = [...arrayLetras, letra, "é", "è", "ê", "ẽ"];
      setArrayLetras(novoArray);
    } else if (letra === "i") {
      const novoArray = [...arrayLetras, letra, "í", "ì", "î", "ĩ"];
      setArrayLetras(novoArray);
    } else if (letra === "o") {
      const novoArray = [...arrayLetras, letra, "õ", "ô", "ó", "ò"];
      setArrayLetras(novoArray);
    } else if (letra === "u") {
      const novoArray = [...arrayLetras, letra, "ú", "ù", "û", "ũ"];
      setArrayLetras(novoArray);
    } else if (letra === "c") {
      const novoArray = [...arrayLetras, letra, "ç"];
      setArrayLetras(novoArray);
    } else {
      const novoArray = [...arrayLetras, letra];
      setArrayLetras(novoArray);
    }

    if (
      palavraEscolhida
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(letra)
    ) {
      const novoAcerto = acertos + 1;
      setAcertos(novoAcerto);
      if (
        new Set(
          palavraEscolhida.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        ).size === novoAcerto
      ) {
        setClassesResult("jogo-iniciado ganhou");
        setFimDeJogo(true);
      }
    } else {
      const novoErro = erros + 1;
      setErros(novoErro);
      if (novoErro > 5) {
        const novoArrayLetras = [...arrayLetras, ...palavraEscolhida.split("")];
        setArrayLetras(novoArrayLetras);

        setClassesResult("jogo-iniciado perdeu");
        setFimDeJogo(true);
      }
    }
  }

  function verificarLetra(letraClicada, idx, ary) {
    if (arrayLetras.includes(letraClicada)) {
      return `${letraClicada}`;
    }
    if (!arrayLetras.includes(letraClicada)) {
      ary[idx] = "_";

      return " _";
    }
  }

  function chutarPalavra() {
    if (palavraChute === palavraEscolhida) {
      setClassesResult("jogo-iniciado ganhou");
      setArrayLetras(palavraEscolhida);
      setFimDeJogo(true);
    } else {
      setErros(6);

      setClassesResult("jogo-iniciado perdeu");
      const novoArrayLetras = [...arrayLetras, ...palavraEscolhida.split("")];
      setArrayLetras(novoArrayLetras);

      setFimDeJogo(true);
    }
  }
  const [classesResult, setClassesResult] = React.useState("jogo-iniciado");

  function mudarClasseResult() {
    if (erros > 5) {
      setClassesResult("jogo-iniciado perdeu");
    }
  }
  return (
    <div className="container">
      <div className="parte-de-cima">
        <div className="forca">
          <img
            data-identifier="game-image"
            src={`./assets/forca${erros}.png`}
            alt="imagem forca"
          ></img>
        </div>
        <div className="escolher-palavra">
          <button data-identifier="choose-word" onClick={iniciarJogo}>
            Escolher palavra
          </button>
        </div>
        <div data-identifier="word" className={classesResult}>
          {palavraEscolhida
            .split("")
            .map((p, idx, ary) => verificarLetra(p, idx, ary))}
        </div>
      </div>
      <div className="parte-de-baixo">
        <div className="letras">
          {alfabeto.map((a) => (
            <button
              onClick={() => (marcarLetra(a), mudarClasseResult())}
              data-identifier="letter"
              disabled={!botoes || arrayLetras.includes(a) || fimDeJogo}
            >
              {a.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="chutar-resposta">
          Já sei a palavra!
          <input
            placeholder={palavraChute}
            data-identifier="type-guess"
            onChange={(e) => setPalavraChute(e.target.value)}
            disabled={!botoes ? true : false || fimDeJogo}
          />
          <button
            data-identifier="guess-button"
            disabled={!botoes ? true : false|| fimDeJogo}
            onClick={() => chutarPalavra()}
          >
            Chutar!
          </button>
        </div>
      </div>
    </div>
  );
}
