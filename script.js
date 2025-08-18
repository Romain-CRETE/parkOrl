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

function calculTauxRemplissage(nbPlaceDispo, nbPlace) {
  if (nbPlaceDispo === null) {
    return null;
  } else {
    return Math.round((1 - nbPlaceDispo / nbPlace) * 100);
  }
}

function updateTable(parkingList) {
  console.log("updateTable", parkingList);

  let html = "";

  for (const parking of parkingList) {
    let nbPlaceDispo = parking.nb_places_disponibles;
    let nbPlace = parking.nb_places;

    let calcul = calculTauxRemplissage(nbPlaceDispo, nbPlace);
    //let pourcentage = Math.round(calcul)

    html += "<tr>";
    html += "<td>" + parking.nom + "</td>";
    html += "<td>" + parking.etat_equipement + "</td>";
    html +=
      "<td>" +
      formatPourcentage(calcul) +
      " " +
      formatProgressBar(calcul) +
      "</td>";
    html += "</tr>";
  }

  // for (let i = 1; i <= parkingList.length; i++) {
  //   const parking = parkingList[i - 1];
  //   html += "<tr><td>" + parking.nom + "</td><td>Ouvert</td></tr>";
  // }

  document.getElementById("parkingList").innerHTML = html;
}

function formatPourcentage(value) {
  if (value === null) {
    return "NA";
  } else {
    return value + "%";
  }
}
//naIfnull(2);
//naIfnull(null);
//console.log(test);

//console.log(naIfull));

//console.log(naIfull(null));

//function x(a, b) {
//  return (a * 100) / b;
//}

//let resultat = x(168, 410);
//console.log(resultat)

function formatProgressBar(value) {
  if (value === null) {
    return "";
  } else {
    return '<progress max="100"  value="' + value + '"/>';
  }
}

fetch(API_ORL).then(getResponse);
