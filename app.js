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

