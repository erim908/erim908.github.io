async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

  // year and platform
  const yearPlatform = {};
  
  data.forEach(d => {
    if (!d.Year || d.Year === "N/A" || !d.Platform || !d.Global_Sales) return;
    const key = `${d.Year}|${d.Platform}`;
    if (!yearPlatform[key]) {
      yearPlatform[key] = { Year: d.Year, Platform: d.Platform, Sales: 0 };
    }
    yearPlatform[key].Sales += parseFloat(d.Global_Sales || 0);
  });

  const aggregated = Object.values(yearPlatform);

  //top 8 sales
  const platformTotals = {};
  aggregated.forEach(d => {
    platformTotals[d.Platform] = (platformTotals[d.Platform] || 0) + d.Sales;
  });
  const topPlatforms = Object.entries(platformTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(d => d[0]);

  const filtered = aggregated.filter(d => topPlatforms.includes(d.Platform));

  const spec = vl
    .markArea({ opacity: 0.7 })
    .data(filtered)
    .encode(
      vl.x().fieldO("Year").title("Year"),
      vl.y().fieldQ("Sales").aggregate("sum").stack("normalize").title("Market Share (%)"),
      vl.color().fieldN("Platform").title("Platform"),
      vl.tooltip([
        { field: "Year", type: "ordinal" },
        { field: "Platform", type: "nominal" },
        { field: "Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)", format: ".2f" }
      ])
    )
    .title("Platform Market Share Over Time (Top 8 Platforms)")
    .width("container")
    .height(400)
    .toSpec();

  render("#view2-2", spec);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}