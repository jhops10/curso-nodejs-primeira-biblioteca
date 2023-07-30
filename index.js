import fs from 'fs';
import chalk from 'chalk';


//Gerenciar Erros
function handleError(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório.'));
}

//Abrir o Aqruivo

// Utilizando o método then()

// function openFile(directory) {
//   const encoding = 'utf-8';
//   fs.readFile(directory, encoding, (erro, response) => {
//     if (erro) {
//       handleError(erro);
//     }
//     console.log(chalk.green(response))
//   });
// }


//Utilizando o método async await

async function openFile(directory) {
  try {
    const encoding = 'utf-8';
    const response = await fs.promises.readFile(directory, encoding);
    console.log(chalk.green(response));
  } catch (erro) {
    handleError(erro);
  }
}

openFile('./arquivos/texto.md');