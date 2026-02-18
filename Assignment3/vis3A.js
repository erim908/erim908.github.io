async function fetchData() {
 const data = await d3.csv("./dataset/videogames_long.csv");
  return data;
}

fetchData().then(async (data) => {
   

  // region
  const regionMap = {
    "na_sales": "NA",
    "eu_sales": "EU",
    "jp_sales": "JP",
    "other_sales": "Other"
  };

  // only rregion data（global_sales is removed）
  const filtered = data.filter(d =>
    ["na_sales", "eu_sales", "jp_sales", "other_sales"].includes(d.sales_region)
  );

  // only top 15
  const platformTotals = {};
  filtered.forEach(d => {
    if (!platformTotals[d.platform]) platformTotals[d.platform] = 0;
    platformTotals[d.platform] += parseFloat(d.sales_amount || 0);
  });

  const topPlatforms = Object.entries(platformTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(d => d[0]);


  const chartData = filtered
    .filter(d => topPlatforms.includes(d.platform))
    .map(d => ({
      Platform: d.platform,
      Region: regionMap[d.sales_region],
      Sales: parseFloat(d.sales_amount || 0)
    }));

  const spec = vl
  .markBar()
  .data(chartData)
  .encode(
    vl.x().fieldN("Platform").sort(topPlatforms).title("Platform"),
    vl.y().fieldQ("Sales").aggregate("sum").stack("normalize").title("Sales Proportion"),
    vl.color().fieldN("Region").scale({
      domain: ["NA", "EU", "JP", "Other"],
      range: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"]
    }).title("Region"),
    vl.tooltip([
      { field: "Platform", type: "nominal" },
      { field: "Region", type: "nominal" },
      { field: "Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)", format: ".2f" }
    ])
  )
  .title("Regional Sales Proportion by Platform (Top 15)")
  .width("container")
  .height(400)
  .toSpec();

  render("#view3", spec);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}