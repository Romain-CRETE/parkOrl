const API_ORL =
  "https://data.orleans-metropole.fr/api/explore/v2.1/catalog/datasets/om-mobilite-parcs-stationnement/records?limit=50";

function getResponse(reponse) {
  console.log("Réponse reçue : " + reponse.status);
  reponse.json().then(getJson);
}

function getJson(json) {
  console.log("JSON", json);

  //logNoms(json.results);
  updateTable(json.results);
}

function logNoms(parkingList) {
  console.log("logNoms", parkingList);
  for (const parking of parkingList) {
    console.log(parking.nom);
  }
}

function updateTable(parkingList) {
  console.log("updateTable", parkingList);

  let html = "";

  for (const parking of parkingList) {
    html += "<tr><td>" + parking.nom + "</td><td>Ouvert</td></tr>";
  }

  // for (let i = 1; i <= parkingList.length; i++) {
  //   const parking = parkingList[i - 1];
  //   html += "<tr><td>" + parking.nom + "</td><td>Ouvert</td></tr>";
  // }

  document.getElementById("parkingList").innerHTML = html;
}

fetch(API_ORL).then(getResponse);
