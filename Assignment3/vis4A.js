async function fetchData() {
  const data = await d3.csv("./dataset/videogames_long.csv");
  return data;
}

fetchData().then(async (data) => {

  const regionMap = {
    "na_sales": "NA",
    "eu_sales": "EU",
    "jp_sales": "JP",
    "other_sales": "Other"
  };

  // nintendo and sony
  const filtered = data.filter(d =>
    ["na_sales", "eu_sales", "jp_sales", "other_sales"].includes(d.sales_region) &&
    (d.publisher === "Nintendo" || d.publisher === "Sony Computer Entertainment")
  );

  const chartData = filtered.map(d => ({
    Publisher: d.publisher === "Nintendo" ? "Nintendo" : "Sony",
    Region: regionMap[d.sales_region],
    Sales: parseFloat(d.sales_amount || 0)
  }));

  const spec = vl
    .markBar()
    .data(chartData)
    .encode(
      vl.x().fieldN("Region")
        .sort(["NA", "EU", "JP", "Other"])
        .title("Region"),
      vl.y().fieldQ("Sales").aggregate("sum").title("Sales (millions)"),
      vl.color().fieldN("Publisher").scale({
        domain: ["Nintendo", "Sony"],
        range: ["#e63946", "#457b9d"]
      }).title("Publisher"),
      vl.xOffset().fieldN("Publisher"),
      vl.tooltip([
        { field: "Publisher", type: "nominal" },
        { field: "Region", type: "nominal" },
        { field: "Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)", format: ".2f" }
      ])
    )
    .title("Nintendo vs Sony: Sales by Region")
    .width("container")
    .height(400)
    .toSpec();

  render("#view4", spec);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}