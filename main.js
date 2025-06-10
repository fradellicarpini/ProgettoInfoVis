//selezione del contenitore svg e di altezza e larghezza
const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

//creazione contenitore per l'asse x
const axisGroup = svg.append("g")
  .attr("transform", `translate(0, ${height - 40})`);

//colori dei petali
const petalColors = [
    "lightblue",
    "pink",
    "lightsalmon",
    "plum",
    "red",
    "limegreen",
    "gray",
    "fuchsia",
    "indigo",
    "deeppink"
  ];
  
// Carica i dati
d3.json("data.json").then(data => {
  drawFlowers(data);
});
let dataGlobal, v1Scale, v2Scale, v3Scale, v4Scale, xScale, centerY;


function drawFlowers(data) {

  centerY = height / 2;

 //scale lineari che scalano il valore di ogni variabile in un intervallo di pixels
  v1Scale = d3.scaleLinear().domain(d3.extent(data, d => d.v1)).range([5, 25]);
  v2Scale = d3.scaleLinear().domain(d3.extent(data, d => d.v2)).range([30, 100]);
  v3Scale = d3.scaleLinear().domain(d3.extent(data, d => d.v3)).range([4, 15]);
  v4Scale = d3.scaleLinear().domain(d3.extent(data, d => d.v4)).range([4, 18]);

  xScale = d3.scaleLinear().domain([0, (data.length - 1)]).range([60, width - 60]);

  dataGlobal = data;

  const flowerGroup = svg.selectAll(".flower")
    .data(data,d => d.id)
    .join("g")
    .attr("class", "flower")
    .attr("transform", (d, i) => {
        const stem = v2Scale(d.v2);
        const offsetY = 100 - stem; 
        return `translate(${xScale(i)}, ${centerY})`;
    });

  // Gambo
  flowerGroup.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", d => v2Scale(d.v2))
    .attr("stroke", "green")
    .attr("stroke-width", 3)
    .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 1)
          .html(`(v2, ${d.v2.toFixed(2)})`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
    .on("mousemove", (event) => {
        d3.select("#tooltip")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
    .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      })
    .on("click", (event, d) => updateFlowerPositions("v2"));


  // Foglia 
  flowerGroup.append("ellipse")
    .attr("cx", d => {
        const stem = v2Scale(d.v2);
        console.log(`id: ${d.id}, v2: ${d.v2}, stem: ${stem}`);

        if (stem < 58) {
        return 6;
        } else if (stem >= 58 && stem < 86) {
        return 10.5;
        } else {
        return 14;
        }
    })
    .attr("cy", d => {
        const stem = v2Scale(d.v2);
        return stem < 58 ? 20 : stem / 2;
    })
    .attr("rx", d => v3Scale(d.v3))
    .attr("ry", d => v3Scale(d.v3) * 0.4)
    .attr("fill", "green")
    .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 1)
          .html(`(v3, ${d.v3.toFixed(2)})`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
    })
    .on("mousemove", (event) => {
        d3.select("#tooltip")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
    })
    .on("click", (event, d) => updateFlowerPositions("v3"));


  // Petali (4 orientati a croce)
  flowerGroup.selectAll(".petal")
    .data(d => {
        const size = v1Scale(d.v1);
        return [0, 72, 144, 216, 288].map(angle => ({ angle, size }));
    })
    .join("ellipse")
    .attr("class", "petal")
    .attr("rx", d => d.size * 1.2)  // più larghi
    .attr("ry", d => d.size * 0.4)  // più stretti
    .attr("transform", d => {
        const rad = d.angle * Math.PI / 180;
        const x = Math.cos(rad) * (d.size + 5);
        const y = Math.sin(rad) * (d.size + 5);
        return `translate(${x}, ${y}) rotate(${d.angle})`;
    })
    .attr("fill", function(_, i, nodes) {
        const flowerId = d3.select(nodes[i].parentNode).datum().id;
        return petalColors[flowerId - 1];  // -1 perché l'array parte da 0
      })
    .attr("filter", "url(#glow)")
    .on("mouseover", function(event, d) {
        const datum = d3.select(this.parentNode).datum();  // Recupera i dati originali del fiore
        d3.select("#tooltip")
          .style("opacity", 1)
          .html(`(v1, ${datum.v1.toFixed(2)})`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
    .on("mousemove", function(event) {
        d3.select("#tooltip")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
    .on("mouseout", function() {
        d3.select("#tooltip").style("opacity", 0);
      })
    .on("click", () => updateFlowerPositions("v1"));


  // Bocciolo
  flowerGroup.append("circle")
    .attr("cy", 0)
    .attr("r", d => v4Scale(d.v4))
    .attr("fill", "yellow")
    .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 1)
          .html(`(v4, ${d.v4.toFixed(2)})`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mousemove", (event) => {
        d3.select("#tooltip")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      })
    .on("click", (event, d ) => updateFlowerPositions("v4"));
    
// Asse X iniziale con ID
const initialAxis = d3.axisBottom(xScale)
  .tickValues(data.map((_, i) => i))
  .tickFormat((d, i) => data[i].id);

axisGroup.call(initialAxis);

// Etichetta asse
svg.selectAll(".axis-label").remove();
svg.append("text")
  .attr("class", "axis-label")
  .attr("x", width / 2)
  .attr("y", height - 10)
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .text("Coordinata X: ID");

}


function updateFlowerPositions(variable) {
    console.log("Funzione chiamata con:", variable);

    const extent = d3.extent(dataGlobal, d => d[variable]);
    const xScaleNew = d3.scaleLinear().domain(extent).range([60, width - 60]);
  
    // Aggiorna la posizione dei fiori
    svg.selectAll(".flower")
      .transition()
      .duration(1000)
      .attr("transform", d => {
        const offsetY = 100 - v2Scale(d.v2);
        return `translate(${xScaleNew(d[variable])}, ${centerY + offsetY})`;  
      });
  
    const uniqueValues = Array.from(new Set(dataGlobal.map(d => d[variable]))).sort(d3.ascending);
    console.log("Valori unici per", variable, ":", uniqueValues);

    const axis = d3.axisBottom(xScaleNew)
        .tickValues(uniqueValues)
        .tickFormat(d3.format(".2f"));
      
  
    axisGroup.transition()
      .duration(1000)
      .call(axis);
  
    // Aggiorna o crea l’etichetta della variabile selezionata
    svg.selectAll(".axis-label").remove();
  
    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text(`Coordinata X: ${variable}`);  
  }
  


function resetPositions() {
    svg.selectAll(".flower")
      .transition()
      .duration(1000)
      .attr("transform", (d, i) => {
        const offsetY = 100 - v2Scale(d.v2);
        return `translate(${xScale(i)}, ${centerY + offsetY})`;
      });
  
    // Ripristina l’asse originale con ID (posizione iniziale)
    const xAxis = d3.axisBottom(xScale)
      .tickValues(dataGlobal.map((_, i) => i))
      .tickFormat((d, i) => dataGlobal[i].id);
  
    axisGroup.transition().duration(500).call(xAxis);
  
    svg.selectAll(".axis-label").remove();
    svg.append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text(`Coordinata X: ID`);
  }
  