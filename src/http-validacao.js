function extractLinks(arrLinks) {
  return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function statusCheck(urlList) {
  const arrStatus = await Promise
    .all(
      urlList.map(async (url) => {
        const response = await fetch(url)
        return response.status;
      })
  )
  return arrStatus;
}

export default async function validatedList(linksList) {
  const links = extractLinks(linksList);
  const status = await statusCheck(links);
  return status;
}