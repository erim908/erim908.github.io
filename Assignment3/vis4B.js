async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

  // nitendo and sony yearly sales 
  const yearPublisher = {};

  data.forEach(d => {
    if (!d.Year || d.Year === "N/A" || !d.Publisher || !d.Global_Sales) return;
    if (d.Publisher !== "Nintendo" && d.Publisher !== "Sony Computer Entertainment") return;

    const publisher = d.Publisher === "Nintendo" ? "Nintendo" : "Sony";
    const key = `${d.Year}|${publisher}`;
    
    if (!yearPublisher[key]) {
      yearPublisher[key] = { Year: d.Year, Publisher: publisher, Sales: 0 };
    }
    yearPublisher[key].Sales += parseFloat(d.Global_Sales || 0);
  });

  const chartData = Object.values(yearPublisher);

  const spec = vl
    .markLine({ point: true })
    .data(chartData)
    .encode(
      vl.x().fieldO("Year").title("Year"),
      vl.y().fieldQ("Sales").aggregate("sum").title("Global Sales (millions)"),
      vl.color().fieldN("Publisher").scale({
        domain: ["Nintendo", "Sony"],
        range: ["#e63946", "#457b9d"]
      }).title("Publisher"),
      vl.tooltip([
        { field: "Year", type: "ordinal" },
        { field: "Publisher", type: "nominal" },
        { field: "Sales", aggregate: "sum", type: "quantitative", title: "Sales (M)", format: ".2f" }
      ])
    )
    .title("Nintendo vs Sony: Sales Over Time")
    .width("container")
    .height(400)
    .toSpec();

  render("#view4-2", spec);

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}