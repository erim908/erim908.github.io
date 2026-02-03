// 
// Visualization JavaScript
// 

document.addEventListener('DOMContentLoaded', function() {
    createDataVisualization();
    createCreativeArt();
});

// 
// Data Visualization: Skills Bar Chart
// 
function createDataVisualization() {
    const svg = document.getElementById('dataViz');
    if (!svg) return;
    
    // Data for visualization
    const skills = [
        { name: 'UX Design', value: 90, color: '#d4502e' },
        { name: 'UI Design', value: 90, color: '#e76f3c' },
        { name: 'Figma', value: 95, color: '#f08d4a' },
        { name: 'User Research', value: 85, color: '#f4a258' },
        { name: 'Adobe Suite', value: 85, color: '#f7b766' },
        { name: 'Prototyping', value: 85, color: '#facc74' },
        { name: 'HTML/CSS', value: 80, color: '#fde082' }
    ];
    
    // Chart dimensions
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 120 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Clear SVG
    svg.innerHTML = '';
    
    // Create background
    const bgRect = createSVGElement('rect', {
        width: width,
        height: height,
        fill: '#faf8f5'
    });
    svg.appendChild(bgRect);
    
    // Create chart group
    const chartGroup = createSVGElement('g', {
        transform: `translate(${margin.left}, ${margin.top})`
    });
    svg.appendChild(chartGroup);
    
    // Calculate bar dimensions
    const barHeight = chartHeight / skills.length - 10;
    const maxValue = 100;
    
    // Create bars and labels
    skills.forEach((skill, index) => {
        const y = index * (chartHeight / skills.length);
        const barWidth = (skill.value / maxValue) * chartWidth;
        
        // Bar background
        const bgBar = createSVGElement('rect', {
            x: 0,
            y: y,
            width: chartWidth,
            height: barHeight,
            fill: '#e5e0da',
            rx: 4
        });
        chartGroup.appendChild(bgBar);
        
        // Animated bar
        const bar = createSVGElement('rect', {
            x: 0,
            y: y,
            width: 0,
            height: barHeight,
            fill: skill.color,
            rx: 4
        });
        chartGroup.appendChild(bar);
        
        // Animate bar
        setTimeout(() => {
            animateBar(bar, barWidth);
        }, index * 100);
        
        // Skill name label
        const label = createSVGElement('text', {
            x: -10,
            y: y + barHeight / 2,
            'text-anchor': 'end',
            'dominant-baseline': 'middle',
            fill: '#1a1a1a',
            'font-size': '16',
            'font-weight': '600',
            'font-family': "'Darker Grotesque', sans-serif"
        });
        label.textContent = skill.name;
        chartGroup.appendChild(label);
        
        // Value label
        const valueLabel = createSVGElement('text', {
            x: barWidth + 10,
            y: y + barHeight / 2,
            'dominant-baseline': 'middle',
            fill: '#666666',
            'font-size': '14',
            'font-weight': '600',
            'font-family': "'Darker Grotesque', sans-serif"
        });
        valueLabel.textContent = skill.value + '%';
        chartGroup.appendChild(valueLabel);
        
        // Animate value label
        setTimeout(() => {
            valueLabel.style.opacity = '0';
            valueLabel.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                valueLabel.style.opacity = '1';
            }, 50);
        }, index * 100 + 500);
    });
    
    // Chart title
    const title = createSVGElement('text', {
        x: width / 2,
        y: 25,
        'text-anchor': 'middle',
        fill: '#d4502e',
        'font-size': '24',
        'font-weight': '700',
        'font-family': "'Fraunces', serif"
    });
    title.textContent = 'Design Skills & Proficiency';
    svg.appendChild(title);
}

function animateBar(bar, targetWidth) {
    let currentWidth = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - progress, 3);
        currentWidth = targetWidth * eased;
        
        bar.setAttribute('width', currentWidth);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// ===================================
// Creative SVG Art: Geometric Patterns
// ===================================
function createCreativeArt() {
    const svg = document.getElementById('creativeArt');
    if (!svg) return;
    
    const width = 800;
    const height = 600;
    
    // Clear SVG
    svg.innerHTML = '';
    
    // Create gradient definitions
    const defs = createSVGElement('defs');
    svg.appendChild(defs);
    
    // Gradient 1
    const gradient1 = createSVGElement('linearGradient', {
        id: 'grad1',
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '100%'
    });
    const stop1_1 = createSVGElement('stop', {
        offset: '0%',
        'stop-color': '#d4502e',
        'stop-opacity': '1'
    });
    const stop1_2 = createSVGElement('stop', {
        offset: '100%',
        'stop-color': '#f4d03f',
        'stop-opacity': '1'
    });
    gradient1.appendChild(stop1_1);
    gradient1.appendChild(stop1_2);
    defs.appendChild(gradient1);
    
    // Gradient 2
    const gradient2 = createSVGElement('linearGradient', {
        id: 'grad2',
        x1: '0%',
        y1: '0%',
        x2: '0%',
        y2: '100%'
    });
    const stop2_1 = createSVGElement('stop', {
        offset: '0%',
        'stop-color': '#f4d03f',
        'stop-opacity': '0.8'
    });
    const stop2_2 = createSVGElement('stop', {
        offset: '100%',
        'stop-color': '#d4502e',
        'stop-opacity': '0.8'
    });
    gradient2.appendChild(stop2_1);
    gradient2.appendChild(stop2_2);
    defs.appendChild(gradient2);
    
    // Background
    const background = createSVGElement('rect', {
        width: width,
        height: height,
        fill: '#1a1a1a'
    });
    svg.appendChild(background);
    
    // Create geometric pattern
    createGeometricCircles(svg, width, height);
    createFloatingShapes(svg, width, height);
    createWavePattern(svg, width, height);
}

function createGeometricCircles(svg, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const numCircles = 8;
    
    for (let i = 0; i < numCircles; i++) {
        const radius = 50 + i * 30;
        const opacity = 1 - (i / numCircles) * 0.7;
        
        const circle = createSVGElement('circle', {
            cx: centerX,
            cy: centerY,
            r: radius,
            fill: 'none',
            stroke: 'url(#grad1)',
            'stroke-width': 2,
            opacity: opacity
        });
        
        svg.appendChild(circle);
        
        // Animate circles
        const animateTransform = createSVGElement('animateTransform', {
            attributeName: 'transform',
            type: 'rotate',
            from: `0 ${centerX} ${centerY}`,
            to: `360 ${centerX} ${centerY}`,
            dur: `${10 + i * 2}s`,
            repeatCount: 'indefinite'
        });
        circle.appendChild(animateTransform);
    }
}

function createFloatingShapes(svg, width, height) {
    const shapes = [
        { type: 'rect', x: 100, y: 100, size: 60 },
        { type: 'rect', x: 650, y: 450, size: 50 },
        { type: 'polygon', x: 150, y: 450, size: 40 },
        { type: 'polygon', x: 650, y: 100, size: 55 }
    ];
    
    shapes.forEach((shape, index) => {
        if (shape.type === 'rect') {
            const rect = createSVGElement('rect', {
                x: shape.x,
                y: shape.y,
                width: shape.size,
                height: shape.size,
                fill: 'url(#grad2)',
                transform: `rotate(45 ${shape.x + shape.size/2} ${shape.y + shape.size/2})`
            });
            svg.appendChild(rect);
            
            // Floating animation
            const animate = createSVGElement('animateTransform', {
                attributeName: 'transform',
                type: 'translate',
                values: `0,0; 0,-20; 0,0`,
                dur: `${3 + index * 0.5}s`,
                repeatCount: 'indefinite',
                additive: 'sum'
            });
            rect.appendChild(animate);
            
        } else {
            // Triangle
            const points = getTrianglePoints(shape.x, shape.y, shape.size);
            const polygon = createSVGElement('polygon', {
                points: points,
                fill: 'url(#grad1)',
                opacity: 0.6
            });
            svg.appendChild(polygon);
            
            // Rotation animation
            const centerX = shape.x;
            const centerY = shape.y;
            const animate = createSVGElement('animateTransform', {
                attributeName: 'transform',
                type: 'rotate',
                from: `0 ${centerX} ${centerY}`,
                to: `360 ${centerX} ${centerY}`,
                dur: `${8 + index}s`,
                repeatCount: 'indefinite'
            });
            polygon.appendChild(animate);
        }
    });
}

function createWavePattern(svg, width, height) {
    const numWaves = 3;
    
    for (let i = 0; i < numWaves; i++) {
        const y = height - 150 + i * 30;
        const path = createSVGElement('path', {
            d: generateWavePath(width, y),
            fill: 'none',
            stroke: i === 1 ? '#f4d03f' : '#d4502e',
            'stroke-width': 2,
            opacity: 0.3 + i * 0.2
        });
        svg.appendChild(path);
        
        // Wave animation
        const animate = createSVGElement('animate', {
            attributeName: 'd',
            dur: `${4 + i}s`,
            repeatCount: 'indefinite',
            values: `${generateWavePath(width, y)}; ${generateWavePath(width, y, Math.PI)}; ${generateWavePath(width, y)}`
        });
        path.appendChild(animate);
    }
}

function generateWavePath(width, y, phase = 0) {
    let path = `M 0 ${y}`;
    const amplitude = 20;
    const frequency = 0.02;
    
    for (let x = 0; x <= width; x += 10) {
        const waveY = y + Math.sin(x * frequency + phase) * amplitude;
        path += ` L ${x} ${waveY}`;
    }
    
    return path;
}

function getTrianglePoints(x, y, size) {
    const height = (Math.sqrt(3) / 2) * size;
    return `${x},${y} ${x + size},${y} ${x + size/2},${y - height}`;
}

// 
// Helper Functions
// 
function createSVGElement(type, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    
    return element;
}