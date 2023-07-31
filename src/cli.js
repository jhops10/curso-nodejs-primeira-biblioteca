import chalk from 'chalk';
import fs from 'fs';
import openFile from "./index.js";

//Adiciona argumentos no terminal.
const caminho = process.argv;

//Função que mostra lista no console.
function showList(result, identificador = "") {
  console.log(
    chalk.yellow('Lista de Links'),
    chalk.black.bgGreen(identificador),
    result)
}

//Função que Processa o Texto.
async function textProcess(argumentos) {
  const caminho = argumentos[2];

  //Tratamento de Erro
  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('Arquivo ou diretório não existe!'));
      return; //Para interromper o restante do erro, e passar apenas o console.log.
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const result = await openFile(argumentos[2]);
    showList(result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const files = await fs.promises.readdir(caminho)
    files.forEach( async (fileName) => {
      const list = await openFile(`${caminho}/${fileName}`)
      showList(list, fileName);
    });
    console.log(files);
  }
}

textProcess(caminho);