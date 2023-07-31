import fs from 'fs';
import chalk from 'chalk';


//Captura os links do texto.
function getLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const matchLinks = [...text.matchAll(regex)];
  const results = matchLinks.map(link => ({ [link[1]]: link[2] }));
  return results;
}


//Gerenciar Erros
function handleError(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório.'));
}

//Abrir o Aqruivo
async function openFile(directory) {
  try {
    const encoding = 'utf-8';
    const response = await fs.promises.readFile(directory, encoding);
    console.log(getLinks(response));
  } catch (erro) {
    handleError(erro);
  }
}

openFile('./arquivos/texto.md');
