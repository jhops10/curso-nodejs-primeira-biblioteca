import chalk from 'chalk';
import fs from 'fs';
import openFile from "./index.js";
import validatedList from './http-validacao.js';

//Adiciona argumentos no terminal.
const caminho = process.argv;

//Função que mostra lista no console.
async function showList(validated, result, identificador = "") {
  if (validated) {
    console.log(
      chalk.yellow('Lista Validada'),
      chalk.black.bgGreen(identificador),
      await validatedList(result));
  } else {
    console.log(
      chalk.yellow('Lista de Links'),
      chalk.black.bgGreen(identificador),
      result)
  }
}

//Função que Processa o Texto.
async function textProcess(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';


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
    showList(valida, result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const files = await fs.promises.readdir(caminho)
    files.forEach( async (fileName) => {
      const list = await openFile(`${caminho}/${fileName}`)
      showList(valida, list, fileName);
    });
    console.log(files);
  }
}

textProcess(caminho);


// [gatinho salsicha](http://gatinhosalsicha.com.br/)