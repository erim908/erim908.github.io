async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

  const genres = [...new Set(data.map(d => d.Genre))].filter(Boolean).sort();

  const select = document.createElement("select");
  select.id = "genreSelect2";
  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    if (g === "Role-Playing") opt.selected = true;
    select.appendChild(opt);
  });
  document.getElementById("view2").before(select);

  function buildSpec(selectedGenre) {
    const filtered = data.filter(d =>
      d.Genre === selectedGenre && d.Year && d.Year !== "N/A"
    );

    // only top 8
    const platformSales = {};
    filtered.forEach(d => {
      platformSales[d.Platform] = (platformSales[d.Platform] || 0) + parseFloat(d.Global_Sales || 0);
    });
    const topPlatforms = Object.entries(platformSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(d => d[0]);

    const topFiltered = filtered.filter(d => topPlatforms.includes(d.Platform));

    return vl
      .markLine({ point: true })
      .data(topFiltered)
      .encode(
        vl.x().fieldO("Year").title("Year"),
        vl.y().fieldQ("Global_Sales").aggregate("sum").title("Global Sales (millions)"),
        vl.color().fieldN("Platform").title("Platform"),
        vl.tooltip([
          { field: "Year", type: "ordinal" },
          { field: "Platform", type: "nominal" },
          { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)" }
        ])
      )
      .title(`Sales Over Time by Platform — Genre: ${selectedGenre}`)
      .width("container")
      .height(400)
      .toSpec();
  }

  render("#view2", buildSpec(select.value));

  select.addEventListener("change", () => {
    render("#view2", buildSpec(select.value));
  });

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}