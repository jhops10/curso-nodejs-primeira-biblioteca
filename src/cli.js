import chalk from 'chalk';
import fs from 'fs';
import openFile from "./index.js";

//Adiciona argumentos no terminal.
const caminho = process.argv;

//Função que mostra lista no console.
function showList(result) {
  console.log(chalk.yellow('Lista de Links'), result)
}

//Função que Processa o Texto.
async function textProcess(argumentos) {
  const caminho = argumentos[2];

  if (fs.lstatSync(caminho).isFile()) {
    const result = await openFile(argumentos[2]);
    showList(result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const files = await fs.promises.readdir(caminho)
    files.forEach( async (fileName) => {
      const list = await openFile(`${caminho}/${fileName}`)
      showList(list);
    });
    console.log(files);
  }
}

textProcess(caminho);