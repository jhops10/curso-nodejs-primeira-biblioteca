import chalk from 'chalk';

function extractLinks(arrLinks) {
  return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function statusCheck(urlList) {
  const arrStatus = await Promise
    .all(
      urlList.map(async (url) => {
        try {
          const response = await fetch(url)
          return response.status;
        } catch (erro) {
          return handleError(erro);
        }
      })
  )
  return arrStatus;
}

function handleError(erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return 'Link não Encontrado'
  } else {
    return 'Ocorreu algum erro'
  }
}

export default async function validatedList(linksList) {
  const links = extractLinks(linksList);
  const status = await statusCheck(links);

  return linksList.map((object, index) => ({
    ...object,
    status: status[index]
  }))
}