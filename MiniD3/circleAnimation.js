import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Constants 
const WIDTH          = 800;
const HEIGHT         = 500;
const MAX_CIRCLES    = 10;
const ENTER_DURATION = 500;
const EXIT_DURATION  = 350;

// Colour palette – muted tones that suit a light background
const PALETTE = [
  "#5b8fcf", "#c45f8a", "#4aab80", "#d4884a",
  "#8b6bbf", "#b8a832", "#4aaab8", "#c45f5f",
  "#7aab4a", "#b86b4a"
];

let svg;
let circles  = [];   // { id, x, y, r, color }
let idCounter = 0;

// Prepare the SVG canvas 
async function prepareVis() {
  svg = d3.select("#canvas-wrap")
    .append("svg")
    .attr("width",  WIDTH)
    .attr("height", HEIGHT);

  // Subtle dot-grid background
  const defs    = svg.append("defs");
  const pattern = defs.append("pattern")
    .attr("id", "grid")
    .attr("width",  40)
    .attr("height", 40)
    .attr("patternUnits", "userSpaceOnUse");

  pattern.append("path")
    .attr("d", "M 40 0 L 0 0 0 40")
    .attr("fill", "none")
    .attr("stroke", "#00000008")
    .attr("stroke-width", 0.5);

  svg.append("rect")
    .attr("width",  WIDTH)
    .attr("height", HEIGHT)
    .attr("fill", "url(#grid)");

  // Click anywhere on the canvas
  svg.on("click", handleClick);
}



// Click handler 
function handleClick(event) {
  const [x, y] = d3.pointer(event);

  // If at max, remove the oldest circle first (FIFO)
  if (circles.length >= MAX_CIRCLES) {
    removeOldest();
  }

  addCircle(x, y);
}

// Add a new circle at (x, y) 
function addCircle(x, y) {
  const id    = idCounter++;
  const r     = Math.random() * 28 + 14;          // radius 14–42 px
  const color = PALETTE[id % PALETTE.length];

  circles.push({ id, x, y, r, color });
  updateCounter();

  // Container group, centred on click point
  const g = svg.append("g")
    .attr("class", "circle-group")
    .attr("data-id", id)
    .attr("transform", `translate(${x},${y})`);

  // Soft glow halo
  g.append("circle")
    .attr("class", "halo")
    .attr("r", r + 6)
    .attr("fill", color)
    .attr("opacity", 0)
    .transition().duration(ENTER_DURATION)
      .attr("opacity", 0.12);

  // Main circle — grows from 0 with a bounce
  g.append("circle")
    .attr("class", "main")
    .attr("r", 0)
    .attr("fill", color)
    .attr("opacity", 0.82)
    .attr("stroke", "#00000015")
    .attr("stroke-width", 1.5)
    .transition().duration(ENTER_DURATION)
      .ease(d3.easeBackOut.overshoot(1.4))
      .attr("r", r);

  // Size label
  g.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("font-size", Math.max(r * 0.55, 9))
    .attr("fill", "#ffffff99")
    .attr("pointer-events", "none")
    .text(r.toFixed(0));

  // Hover: brighten
  g.on("mouseenter", function () {
      d3.select(this).select(".main")
        .transition().duration(200)
        .attr("opacity", 1)
        .attr("stroke-width", 3)
        .attr("stroke", "#00000044");
      d3.select(this).select(".halo")
        .transition().duration(200)
        .attr("opacity", 0.28);
    })
    .on("mouseleave", function () {
      d3.select(this).select(".main")
        .transition().duration(200)
        .attr("opacity", 0.82)
        .attr("stroke-width", 1.5)
        .attr("stroke", "#00000015");
      d3.select(this).select(".halo")
        .transition().duration(200)
        .attr("opacity", 0.12);
    })
    // Click on existing circle → remove it
    .on("click", function (event) {
      event.stopPropagation();
      const clickedId = +d3.select(this).attr("data-id");
      removeById(clickedId);
    });
}

//  Remove oldest circle 
function removeOldest() {
  if (circles.length === 0) return;
  const oldest = circles.shift();   // removes from front of array
  updateCounter();
  exitCircle(oldest.id);
}

// Remove a specific circle by id 
function removeById(id) {
  const idx = circles.findIndex(c => c.id === id);
  if (idx === -1) return;
  circles.splice(idx, 1);
  updateCounter();
  exitCircle(id);
}

// Exit animation then remove from DOM 
function exitCircle(id) {
  const group = svg.select(`[data-id="${id}"]`);
  group.selectAll("circle")
    .transition().duration(EXIT_DURATION)
    .attr("r", 0)
    .attr("opacity", 0);
  group.select("text")
    .transition().duration(EXIT_DURATION)
    .attr("opacity", 0);
  group.transition().delay(EXIT_DURATION).remove();
}

// Update the counter display 
function updateCounter() {
  const el = document.getElementById("count");
  if (el) el.textContent = circles.length;
}

//  Entry point
async function runApp() {
  await prepareVis();
  await drawVis();
}

runApp();