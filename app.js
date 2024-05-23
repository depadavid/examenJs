fetch('https://search.imdbot.workers.dev/?q=action')
.then(response => response.json())
.then(data => {
  console.log(filtrarPorAno(data, 2024));
  console.log(filtrarPorActor(data, "Keanu Reeves"));
  console.log(filtrarPorRangoIMDb(data, 1000, 5000));
  console.log(obtenerTitulos(data));
  console.log(obtenerTitulosYAnos(data));
  console.log(obtenerIdentificadoresYTítulos(data));
  console.log(obtenerURLsYTipos(data));
  console.log(obtenerDetallesPeliculas(data));
})
.catch(error => console.error('Error:', error));

function filtrarPorAno(data, ano) {
  return data.filter(pelicula => pelicula["#YEAR"] === ano);
}

function filtrarPorActor(data, actor) {
  return data.filter(pelicula => pelicula["#ACTORS"].includes(actor));
}

function filtrarPorRangoIMDb(data, rangoMin, rangoMax) {
  return data.filter(pelicula => pelicula["#RANK"] >= rangoMin && pelicula["#RANK"] <= rangoMax);
}

function obtenerTitulos(data) {
  return data.map(pelicula => pelicula["#TITLE"]);
}
function obtenerTitulosYAnos(data) {
  return data.map(pelicula => ({ titulo: pelicula["#TITLE"], ano: pelicula["#YEAR"] }));
}

function obtenerIdentificadoresYTítulos(data) {
  return data.map(pelicula => ({ id: pelicula["#IMDB_ID"], titulo: pelicula["#TITLE"] }));
}

function obtenerURLsYTipos(data) {
  return data.map(pelicula => ({ url: pelicula["#IMDB_URL"], tipo: pelicula["#TYPE"] }));
}

function obtenerDetallesPeliculas(data) {
  return data.filter(pelicula => pelicula["#TYPE"] === "movie")
             .map(pelicula => ({ titulo: pelicula["#TITLE"], ano: pelicula["#YEAR"], tipo: pelicula["#TYPE"] }));
}


