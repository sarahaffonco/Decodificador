const botaoCriptografar = document.querySelector(".botao-criptografar");
const botaoDescriptografar = document.querySelector(".botao-descriptografar");
const botaoCopiar = document.querySelector(".botao-copiar");

const regexCaractereEspecial = /[A-Z]/;
const regexAcentuacao = /[áàãâéèêíïóôõöúüç]/i;

function verificarCaracteres(texto) {
  return regexCaractereEspecial.test(texto) || regexAcentuacao.test(texto);
}

function criptografarMensagem() {
  const textoOriginal = document.querySelector(".insercao-mensagem").value;

  if (verificarCaracteres(textoOriginal)) {
    alert("🚫 Não são permitidas letras maiúsculas e acentuadas! 🚫");
    return;
  }

  if (textoOriginal.trim() === "") {
    return;
  }

  const mapaSubstituicao = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  const mensagemCriptografada = textoOriginal
    .split("")
    .map((letra) => mapaSubstituicao[letra] || letra)
    .join("");

  atualizaResultado(mensagemCriptografada);
}

function descriptografarMensagem() {
  const textoCriptografado = document.querySelector(".insercao-mensagem").value;

  if (verificarCaracteres(textoCriptografado)) {
    alert(" Não são permitidas letras maiúsculas e acentuadas! ");
    return;
  }

  const mapaDescriptografia = new Map([
    ["ai", "a"],
    ["enter", "e"],
    ["imes", "i"],
    ["ober", "o"],
    ["ufat", "u"],
  ]);

  const mensagemDescriptografada = textoCriptografado
    .match(/(ai|enter|imes|ober|ufat)|./gi)
    .map((sequencia) => mapaDescriptografia.get(sequencia) || sequencia)
    .join("");

  atualizaResultado(mensagemDescriptografada);
}

function atualizaResultado(resultado) {
  document.querySelector(".aviso-texto").textContent = resultado;
}

function copiarMensagem() {
  const textoParaCopiar = document.querySelector(".aviso-texto").textContent;

  navigator.clipboard
    .writeText(textoParaCopiar)
    .then(() => {
      showToast("Texto copiado ");
      limparCampo();
    })
    .catch((error) => {
      console.error(`Erro ao copiar o texto: ${error}`);
    });
}

function limparCampo() {
  document.querySelector(".insercao-mensagem").value = "";
  document.querySelector(".aviso-texto").textContent
}