import fs from 'fs';
import chalk from 'chalk';

const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).';

//Captura os links do texto.
function getLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const matchLinks = regex.exec(text);
  console.log(matchLinks);
}

getLinks(textoTeste);

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

// openFile('./arquivos/texto.md');
