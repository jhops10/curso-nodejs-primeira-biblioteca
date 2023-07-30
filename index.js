import fs from 'fs';
import chalk from 'chalk';

function handleError(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório.'));
}

function readFile(directory) {
  const encoding = 'utf-8';
  fs.readFile(directory, encoding, (erro, response) => {
    if (erro) {
      handleError(erro);
    }
    console.log(chalk.green(response))
  });
}

readFile('./arquivos/texto.md');