// Visualization JavaScript

document.addEventListener('DOMContentLoaded', function() {
    createDataVisualization();
    createCreativeArt();
    
    // Redraw on window resize for responsive behavior
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            createDataVisualization();
        }, 250);
    });
});

// Data Visualization: Skills Bar Chart
function createDataVisualization() {
    const svg = document.getElementById('dataViz');
    if (!svg) return;
    
    // Data for visualization
    const skills = [
        { name: 'UX Design', value: 90, color: '#2E86AB' },
        { name: 'UI Design', value: 90, color: '#3FA7D6' },
        { name: 'Figma', value: 95, color: '#59C3C3' },
        { name: 'User Research', value: 85, color: '#73D2DE' },
        { name: 'Adobe Suite', value: 85, color: '#84BCDA' },
        { name: 'Prototyping', value: 85, color: '#6CA6C1' },
        { name: 'HTML/CSS', value: 80, color: '#4A90A4' }
    ];
    
    // Responsive chart dimensions
    const isMobile = window.innerWidth <= 768;
    const width = 800;
    const height = isMobile ? 600 : 500;
    const margin = isMobile 
        ? { top: 70, right: 25, bottom: 40, left: 190 }
        : { top: 40, right: 40, bottom: 60, left: 120 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Reduce bar width on mobile for better readability
    const barWidthMultiplier = isMobile ? 0.9 : 1;
    
    // Responsive font sizes
   const labelFontSize = isMobile ? '30' : '16';
　　const valueFontSize = isMobile ? '30' : '14';
　　const titleFontSize = isMobile ? '24' : '24';

    
    // Clear SVG
    svg.innerHTML = '';
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
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
        const barWidth = (skill.value / maxValue) * chartWidth * barWidthMultiplier;
        
        // Bar background (slightly wider than the filled bar)
        const bgBarMultiplier = isMobile ? barWidthMultiplier + 0.05 : 1;
        const bgBar = createSVGElement('rect', {
            x: 0,
            y: y,
            width: chartWidth * bgBarMultiplier,
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
            'font-size': labelFontSize,
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
            'font-size': valueFontSize,
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
        fill: '#2E86AB',
        'font-size': titleFontSize,
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

// Creative SVG Art: Winter Scene
function createCreativeArt() {
    const svg = document.getElementById('creativeArt');
    if (!svg) return;
    
    const width = 800;
    const height = 600;
    
    // Clear SVG
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '-400 -300 800 600');
    
    // Create defs for reusable elements
    const defs = createSVGElement('defs');
    svg.appendChild(defs);
    
    // Snowball gradient
    const snowballGradient = createSVGElement('radialGradient', {
        id: 'snowball',
        cx: '0.25',
        cy: '0.25',
        r: '1'
    });
    const stop1 = createSVGElement('stop', {
        offset: '0%',
        'stop-color': 'white'
    });
    const stop2 = createSVGElement('stop', {
        offset: '50%',
        'stop-color': 'white'
    });
    const stop3 = createSVGElement('stop', {
        offset: '100%',
        'stop-color': '#d6d6d6'
    });
    snowballGradient.appendChild(stop1);
    snowballGradient.appendChild(stop2);
    snowballGradient.appendChild(stop3);
    defs.appendChild(snowballGradient);
    
    // Tree definition
    const treeGroup = createSVGElement('g', { id: 'tree' });
    const treeTriangle = createSVGElement('polygon', {
        points: '-10,0 10,0 0,-50',
        fill: '#38755b'
    });
    const treeTrunk = createSVGElement('line', {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '10',
        stroke: '#778074',
        'stroke-width': '2'
    });
    treeGroup.appendChild(treeTriangle);
    treeGroup.appendChild(treeTrunk);
    defs.appendChild(treeGroup);
    
    // Big snowflake definition
    const bigFlake = createSVGElement('circle', {
        id: 'big',
        cx: '0',
        cy: '0',
        r: '5',
        fill: 'white'
    });
    defs.appendChild(bigFlake);
    
    // Small snowflake definition
    const smallFlake = createSVGElement('circle', {
        id: 'small',
        cx: '0',
        cy: '0',
        r: '3',
        fill: 'white'
    });
    defs.appendChild(smallFlake);
    
    // Background sky
    const background = createSVGElement('rect', {
        x: '-400',
        y: '-300',
        width: '800',
        height: '600',
        fill: '#F1DBC3'
    });
    svg.appendChild(background);
    
    // Ground circle
    const ground = createSVGElement('circle', {
        cx: '0',
        cy: '680',
        r: '700',
        fill: '#F8F4E8'
    });
    svg.appendChild(ground);
    
    // Add trees - 4 trees positioned on white ground area, well separated from snowman
    const trees = [
        { x: -320, y: 150, scale: 4.5 },
        { x: -200, y: 160, scale: 4.2 },
        { x: 100, y: 155, scale: 4.8 },
        { x: 260, y: 150, scale: 4.6 }
    ];
    
    trees.forEach(tree => {
        const use = createSVGElement('use', {
            href: '#tree',
            transform: `translate(${tree.x}, ${tree.y}) scale(${tree.scale})`
        });
        svg.appendChild(use);
    });
    
    // Create snowman (smaller)
    createSnowman(svg);
    
    // Add falling snowflakes
    const snowflakes = [
        { type: 'big', x: 0, y: 0, speed: 'fast', opacity: 1 },
        { type: 'big', x: -200, y: -80, speed: 'fast', opacity: 0.7 },
        { type: 'big', x: 120, y: -160, speed: 'fast', opacity: 1 },
        { type: 'big', x: 200, y: -80, speed: 'fast', opacity: 0.7 },
        { type: 'big', x: 120, y: 200, speed: 'slow', opacity: 1 },
        { type: 'big', x: -280, y: -320, speed: 'slow', opacity: 0.7 },
        { type: 'big', x: 360, y: -320, speed: 'slow', opacity: 0.7 },
        { type: 'small', x: 40, y: -200, speed: 'slow', opacity: 1 },
        { type: 'small', x: -200, y: -240, speed: 'slow', opacity: 0.7 },
        { type: 'small', x: 120, y: 280, speed: 'slow', opacity: 1 },
        { type: 'small', x: 40, y: -320, speed: 'slow', opacity: 0.7 },
        { type: 'big', x: -100, y: 100, speed: 'fast', opacity: 0.8 },
        { type: 'small', x: 250, y: 50, speed: 'slow', opacity: 0.6 },
        { type: 'big', x: -150, y: -100, speed: 'slow', opacity: 0.9 }
    ];
    
    snowflakes.forEach((flake, index) => {
        const use = createSVGElement('use', {
            href: `#${flake.type}`,
            x: flake.x,
            y: flake.y,
            opacity: flake.opacity
        });
        
        // Add animation
        const animateTransform = createSVGElement('animateTransform', {
            attributeName: 'transform',
            type: 'translate',
            from: `0 -400`,
            to: `0 400`,
            dur: flake.speed === 'fast' ? '3s' : '5s',
            repeatCount: 'indefinite',
            begin: `${index * 0.3}s`
        });
        use.appendChild(animateTransform);
        svg.appendChild(use);
    });
}

function createSnowman(svg) {
    // Snowman group - smaller size (scale 0.6)
    const snowmanGroup = createSVGElement('g', {
        transform: 'translate(-80, 150) scale(0.6)'
    });
    
    // Bottom snowball (big)
    const bottomBall = createSVGElement('circle', {
        cx: '0',
        cy: '60',
        r: '80',
        fill: 'url(#snowball)'
    });
    snowmanGroup.appendChild(bottomBall);
    
    // Top snowball (head)
    const topBall = createSVGElement('circle', {
        cx: '0',
        cy: '-40',
        r: '50',
        fill: 'url(#snowball)'
    });
    snowmanGroup.appendChild(topBall);
    
    // Carrot nose
    const nose = createSVGElement('polygon', {
        points: '10,-46 50,-40 10,-34',
        fill: '#e66465'
    });
    snowmanGroup.appendChild(nose);
    
    // Left eye
    const leftEye = createSVGElement('circle', {
        cx: '-15',
        cy: '-55',
        r: '5',
        fill: 'black'
    });
    snowmanGroup.appendChild(leftEye);
    
    // Right eye
    const rightEye = createSVGElement('circle', {
        cx: '15',
        cy: '-55',
        r: '5',
        fill: 'black'
    });
    snowmanGroup.appendChild(rightEye);
    
    // Left arm
    const leftArm = createSVGElement('line', {
        x1: '-40',
        y1: '30',
        x2: '-90',
        y2: '-30',
        stroke: 'black',
        'stroke-width': '5'
    });
    snowmanGroup.appendChild(leftArm);
    
    // Left arm branch
    const leftBranch = createSVGElement('line', {
        x1: '-65',
        y1: '0',
        x2: '-90',
        y2: '-10',
        stroke: 'black',
        'stroke-width': '5'
    });
    snowmanGroup.appendChild(leftBranch);
    
    // Right arm
    const rightArm = createSVGElement('line', {
        x1: '40',
        y1: '30',
        x2: '90',
        y2: '-30',
        stroke: 'black',
        'stroke-width': '5'
    });
    snowmanGroup.appendChild(rightArm);
    
    // Right arm branch
    const rightBranch = createSVGElement('line', {
        x1: '65',
        y1: '0',
        x2: '90',
        y2: '-10',
        stroke: 'black',
        'stroke-width': '5'
    });
    snowmanGroup.appendChild(rightBranch);
    
    // Buttons on body
    const button1 = createSVGElement('circle', {
        cx: '0',
        cy: '20',
        r: '4',
        fill: 'black'
    });
    snowmanGroup.appendChild(button1);
    
    const button2 = createSVGElement('circle', {
        cx: '0',
        cy: '40',
        r: '4',
        fill: 'black'
    });
    snowmanGroup.appendChild(button2);
    
    const button3 = createSVGElement('circle', {
        cx: '0',
        cy: '60',
        r: '4',
        fill: 'black'
    });
    snowmanGroup.appendChild(button3);
    
    svg.appendChild(snowmanGroup);
}


// Helper Functions
function createSVGElement(type, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    
    return element;
}