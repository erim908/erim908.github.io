async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

  // platform and genre
  const aggregated = [];
  const platformGenre = {};

  data.forEach(d => {
    if (!d.Platform || !d.Genre || !d.Global_Sales) return;
    const key = `${d.Platform}|${d.Genre}`;
    if (!platformGenre[key]) {
      platformGenre[key] = { Platform: d.Platform, Genre: d.Genre, Sales: 0 };
    }
    platformGenre[key].Sales += parseFloat(d.Global_Sales || 0);
  });

  Object.values(platformGenre).forEach(v => aggregated.push(v));

  // only top 10
  const platformTotals = {};
  aggregated.forEach(d => {
    platformTotals[d.Platform] = (platformTotals[d.Platform] || 0) + d.Sales;
  });
  const topPlatforms = Object.entries(platformTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(d => d[0]);

  const filtered = aggregated.filter(d => topPlatforms.includes(d.Platform));

  const spec = vl
    .markRect()
    .data(filtered)
    .encode(
      vl.x().fieldN("Genre").title("Genre"),
      vl.y().fieldN("Platform").sort(topPlatforms).title("Platform"),
      vl.color().fieldQ("Sales").aggregate("sum")
        .scale({ scheme: "blues" })
        .title("Sales (millions)"),
      vl.tooltip([
        { field: "Platform", type: "nominal" },
        { field: "Genre", type: "nominal" },
        { field: "Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)", format: ".2f" }
      ])
    )
    .title("Platform Preferences Across Genres (Top 10 Platforms)")
    .width("container")
    .height(400)
    .toSpec();

  render("#view1-2", spec);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}