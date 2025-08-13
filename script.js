function getResponse(reponse) {
  console.log("Réponse reçue : " + reponse.status);
  reponse.json().then(getJson);
}

function getJson(json) {
  console.log("JSON", json);

  logNoms(json.results);
}

function logNoms(data) {
  console.log("DATA", data);
  for (const element of data) {
    console.log(element.nom);
  }
}

fetch(
  "https://data.orleans-metropole.fr/api/explore/v2.1/catalog/datasets/om-mobilite-parcs-stationnement/records?limit=50"
).then(getResponse);
