function extractLinks(arrLinks) {
  return arrLinks.map((objLink) => Object.values(objLink).join())
}

export default function validatedList(linksList) {
  return extractLinks(linksList);
}