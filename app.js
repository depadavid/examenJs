fetch('https://search.imdbot.workers.dev/')
  .then(response => response.json())
  .then(data => {
    peliculas = data;
    console.log(filtrarPorAno(data));
    console.log(filtrarPorActor(data));
    console.log(filtrarPorRangoIMDb(data));
    console.log(obtenerTitulos(data));
    console.log(obtenerTitulosYAnos(data));
    console.log(obtenerIdentificadoresYTítulos(data));
    console.log(obtenerURLsYTipos(data));
    console.log(obtenerDetallesPeliculas(data));
    mostrarResultados(peliculas); 
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

let peliculas = [];

function mostrarResultados(data) {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';
  data.forEach(pelicula => {
    const li = document.createElement('li');
    li.textContent = `${pelicula["#TITLE"]} (${pelicula["#YEAR"]}) - IMDb: ${pelicula["#RANK"]}`;
    resultsElement.appendChild(li);
  });
}

function applyFilters() {
  let filteredData = peliculas;
  const year = document.getElementById('year').value;
  const actor = document.getElementById('actor').value;
  const titulo = document.getElementById('title').value;
  const imdbMin = document.getElementById('imdbMin').value;
  const imdbMax = document.getElementById('imdbMax').value;

  if (year) {
    filteredData = filtrarPorAno(filteredData, parseInt(year));
  }
  if (actor) {
    filteredData = filtrarPorActor(filteredData, actor);
  }
  if (imdbMin && imdbMax) {
    filteredData = filtrarPorRangoIMDb(filteredData, parseInt(imdbMin), parseInt(imdbMax));
  }

  mostrarResultados(filteredData);
}

