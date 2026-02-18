async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

  const genres = [...new Set(data.map(d => d.Genre))].filter(Boolean).sort();

  const select = document.createElement("select");
  select.id = "genreSelect";
  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    if (g === "Role-Playing") opt.selected = true;
    select.appendChild(opt);
  });
  document.getElementById("view").before(select);

  function buildSpec(selectedGenre) {
    const filtered = data.filter(d => d.Genre === selectedGenre);
    return vl
      .markBar()
      .data(filtered)
      .encode(
        vl.y().fieldN("Platform").sort("-x").title("Platform"),
        vl.x().fieldQ("Global_Sales").aggregate("sum").title("Global Sales (millions)"),
        vl.color().value("steelblue"),
        vl.tooltip([
          { field: "Platform", type: "nominal" },
          { field: "Global_Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)" }
        ])
      )
      .title(`Global Sales by Platform — Genre: ${selectedGenre}`)
      .width("container")
      .height(400)
      .toSpec();
  }

  render("#view", buildSpec(select.value));

  select.addEventListener("change", () => {
    render("#view", buildSpec(select.value));
  });

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}