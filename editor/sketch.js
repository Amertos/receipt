// RECEIPT!
// Pure generative ornamental art: Astronomy & Feline Sacred Geometry
// 100% geometric patterns, guilloche waves, mandalas, and star charts (NO TEXT).
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1100, // Height in px (between 240 and 2000)
  seed: 42,     // Change seed for different constellation and orbital patterns
};

export function drawReceipt(p) {
  const w = 384;
  const h = receipt.height;
  const margin = 14;

  p.background(255);
  p.stroke(0);
  p.fill(0);

  // ==========================================
  // 1. OUTER ORNATE FRAME WITH SAWTOOTH BORDER
  // ==========================================
  p.strokeWeight(2);
  p.noFill();
  p.rect(margin, margin, w - margin * 2, h - margin * 2);
  p.strokeWeight(1);
  p.rect(margin + 4, margin + 4, w - (margin + 4) * 2, h - (margin + 4) * 2);

  // Top & bottom sawtooth dentil borders
  drawSawtoothBorder(p, margin + 5, margin + 5, w - margin - 5, 5, true);
  drawSawtoothBorder(p, margin + 5, h - margin - 5, w - margin - 5, 5, false);

  // Left & right diamond borders
  drawSideDiamondChain(p, margin + 5, margin + 15, h - margin * 2 - 30);
  drawSideDiamondChain(p, w - margin - 5, margin + 15, h - margin * 2 - 30);

  // Corner rosettes
  drawCornerRosette(p, margin + 4, margin + 4);
  drawCornerRosette(p, w - margin - 4, margin + 4);
  drawCornerRosette(p, margin + 4, h - margin - 4);
  drawCornerRosette(p, w - margin - 4, h - margin - 4);

  // ==========================================
  // 2. TOP CELESTIAL ROSETTE & GUILLOCHE (30 - 190px)
  // ==========================================
  const topCx = w / 2;
  const topCy = 85;

  // 16-point Celestial Star Rosette
  drawCelestialRosette(p, topCx, topCy, 45);

  // Concentric harmonic orbit rings with tiny orbiting planets
  drawOrbitalRings(p, topCx, topCy, [52, 60, 68]);

  // Banknote Guilloche lace ribbons
  drawGuillocheBand(p, margin + 10, w - margin - 10, 155, 14, 0.055, 0.11);
  drawGuillocheBand(p, margin + 10, w - margin - 10, 172, 10, 0.075, 0.15);

  // Horizontal ornamental divider rule
  drawGeometricDivider(p, margin + 10, 192, w - margin - 10);

  // ==========================================
  // 3. THE SACRED FELINE MANDALA (200 - 640px)
  // ==========================================
  const cx = w / 2;
  const cy = 415;
  const R = 142;

  // Outer solar rays
  drawSolarCrownRays(p, cx, cy, R - 2, 36, 12);

  // Concentric astrolabe rings
  p.stroke(0);
  p.strokeWeight(2);
  p.noFill();
  p.circle(cx, cy, R * 2);
  p.strokeWeight(1);
  p.circle(cx, cy, (R - 6) * 2);
  p.circle(cx, cy, (R - 16) * 2);
  p.circle(cx, cy, (R - 26) * 2);

  // Degree graduation ticks on outer astrolabe ring
  for (let deg = 0; deg < 360; deg += 4) {
    const angle = p.radians(deg);
    const isMajor = deg % 24 === 0;
    const isMid = deg % 12 === 0;
    const rIn = isMajor ? R - 15 : (isMid ? R - 10 : R - 6);
    const x1 = cx + p.cos(angle) * R;
    const y1 = cy + p.sin(angle) * R;
    const x2 = cx + p.cos(angle) * rIn;
    const y2 = cy + p.sin(angle) * rIn;
    p.strokeWeight(isMajor ? 1.5 : 0.7);
    p.line(x1, y1, x2, y2);
  }

  // 8 Lunar Phases placed around the celestial circle
  drawCircularLunarPhases(p, cx, cy, R - 21);

  // Inner celestial coordinate grid arcs
  p.stroke(0);
  p.strokeWeight(0.6);
  p.noFill();
  p.ellipse(cx, cy, (R - 30) * 2, (R - 30) * 1.3);
  p.ellipse(cx, cy, (R - 30) * 2, (R - 30) * 0.6);
  p.line(cx, cy - (R - 26), cx, cy + (R - 26));
  p.line(cx - (R - 26), cy, cx + (R - 26), cy);

  // Spirograph / Hypotrochoid lace rosette inside background
  drawHypotrochoid(p, cx, cy, 70, 21, 35, 12);

  // The Grand Crescent Moon cradle
  drawMandalaCrescent(p, cx, cy + 30, 95);

  // Symmetrical Sacred Celestial Cat (Heart of the Mandala)
  drawSacredCat(p, cx, cy);

  // ==========================================
  // 4. GUILLOCHE INTERIOR BAND (650 - 720px)
  // ==========================================
  drawGeometricDivider(p, margin + 10, 648, w - margin - 10);
  drawGuillocheBand(p, margin + 10, w - margin - 10, 672, 14, 0.05, 0.12);
  drawGuillocheBand(p, margin + 10, w - margin - 10, 692, 12, 0.08, 0.16);
  drawGeometricDivider(p, margin + 10, 715, w - margin - 10);

  // ==========================================
  // 5. STAR CHART & CONSTELLATION WEB (725 - 935px)
  // ==========================================
  drawPlanisphereChart(p, cx, 825, w - margin * 2 - 20, 195);

  // ==========================================
  // 6. BOTTOM GUILLOCHE & PURE GEOMETRIC BARCODE (940 - 1080px)
  // ==========================================
  drawGeometricDivider(p, margin + 10, 940, w - margin - 10);
  drawGuillocheBand(p, margin + 10, w - margin - 10, 958, 10, 0.06, 0.14);

  // Pure geometric barcode (displayValue: false - NO text, only sharp scanner bars)
  drawGeometricBarcode(p, `ASTRONOMY-FELINE-${receipt.seed}`, w / 2, 980);

  // Symmetrical bottom finial ornament
  drawBottomFinial(p, w / 2, 1048);
}

// ==========================================
// PURE GEOMETRIC DRAWING FUNCTIONS (NO TEXT)
// ==========================================

// Symmetrical Sacred Cat (Vector Art with pure geometry)
function drawSacredCat(p, cx, cy) {
  const ctx = p.drawingContext;
  ctx.save();

  // 1. Solar Aureole / Starburst Crown behind cat head
  const crownY = cy - 35;
  p.stroke(0);
  p.strokeWeight(1);
  for (let a = 0; a < 360; a += 15) {
    const rad = p.radians(a);
    const r1 = 34;
    const r2 = a % 30 === 0 ? 50 : 42;
    p.line(cx + p.cos(rad) * r1, crownY + p.sin(rad) * r1, cx + p.cos(rad) * r2, crownY + p.sin(rad) * r2);
  }

  // 2. Solid Black Symmetrical Cat Silhouette
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;

  ctx.beginPath();
  // Base at paws
  ctx.moveTo(cx - 24, cy + 70);
  ctx.lineTo(cx + 24, cy + 70);
  // Right flank curve up to shoulder
  ctx.bezierCurveTo(cx + 34, cy + 45, cx + 32, cy + 15, cx + 22, cy - 8);
  // Right cheek flare
  ctx.lineTo(cx + 30, cy - 20);
  ctx.lineTo(cx + 25, cy - 32);
  // Right ear base to ear tip
  ctx.lineTo(cx + 27, cy - 78); // Sharp tall ear tip
  // Inner right ear slope down to crown
  ctx.lineTo(cx + 7, cy - 48);
  // Crown top between ears
  ctx.lineTo(cx - 7, cy - 48);
  // Left ear tip
  ctx.lineTo(cx - 27, cy - 78); // Sharp tall ear tip
  // Left outer ear down
  ctx.lineTo(cx - 25, cy - 32);
  // Left cheek flare
  ctx.lineTo(cx - 30, cy - 20);
  ctx.lineTo(cx - 22, cy - 8);
  // Left flank curve down to base
  ctx.bezierCurveTo(cx - 32, cy + 15, cx - 34, cy + 45, cx - 24, cy + 70);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 3. Inner Ear Geometric Inlays (White line contour)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.2;
  // Right inner ear
  ctx.beginPath();
  ctx.moveTo(cx + 22, cy - 35);
  ctx.lineTo(cx + 24, cy - 70);
  ctx.lineTo(cx + 10, cy - 48);
  ctx.stroke();
  // Left inner ear
  ctx.beginPath();
  ctx.moveTo(cx - 22, cy - 35);
  ctx.lineTo(cx - 24, cy - 70);
  ctx.lineTo(cx - 10, cy - 48);
  ctx.stroke();

  // 4. Sacred Third Eye & Celestial Forehead Gem
  // 8-point white star on forehead
  drawStarGlyph(ctx, cx, cy - 38, 7, "#ffffff");
  // Third eye almond outline
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy - 38, 12, -Math.PI * 0.35, Math.PI * 0.35);
  ctx.arc(cx, cy - 38, 12, Math.PI * 0.65, Math.PI * 1.35);
  ctx.stroke();

  // 5. Serene Symmetrical Feline Eyes
  // Right eye
  drawAlmondEye(ctx, cx + 14, cy - 18, 10, 6);
  // Left eye
  drawAlmondEye(ctx, cx - 14, cy - 18, 10, 6);

  // 6. Nose & Symmetrical Mouth
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(cx, cy - 5);
  ctx.lineTo(cx + 4, cy - 10);
  ctx.lineTo(cx - 4, cy - 10);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 5);
  ctx.lineTo(cx, cy);
  // Muzzle curves
  ctx.arc(cx + 5, cy, 5, Math.PI, 0, true);
  ctx.moveTo(cx, cy);
  ctx.arc(cx - 5, cy, 5, 0, Math.PI, false);
  ctx.stroke();

  // 7. Radiant Whiskers (White graceful arcs fanning into the cosmos)
  ctx.lineWidth = 1.2;
  // Right whiskers
  drawCurvedWhisker(ctx, cx + 9, cy - 2, cx + 55, cy - 18);
  drawCurvedWhisker(ctx, cx + 9, cy + 1, cx + 62, cy);
  drawCurvedWhisker(ctx, cx + 9, cy + 4, cx + 54, cy + 18);
  // Left whiskers
  drawCurvedWhisker(ctx, cx - 9, cy - 2, cx - 55, cy - 18);
  drawCurvedWhisker(ctx, cx - 9, cy + 1, cx - 62, cy);
  drawCurvedWhisker(ctx, cx - 9, cy + 4, cx - 54, cy + 18);

  // 8. Chest Collar & Hanging Crescent Moon Amulet
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy + 16, 20, 0.2, Math.PI - 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy + 22, 23, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Hanging crescent amulet
  drawMiniCrescentAmulet(ctx, cx, cy + 42, 8);

  // 9. Symmetric Curled Tails Framing the Base
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  // Right tail
  ctx.beginPath();
  ctx.moveTo(cx + 20, cy + 65);
  ctx.bezierCurveTo(cx + 55, cy + 68, cx + 60, cy + 105, cx + 32, cy + 108);
  ctx.bezierCurveTo(cx + 15, cy + 108, cx + 18, cy + 92, cx + 28, cy + 92);
  ctx.stroke();
  // Left tail
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy + 65);
  ctx.bezierCurveTo(cx - 55, cy + 68, cx - 60, cy + 105, cx - 32, cy + 108);
  ctx.bezierCurveTo(cx - 15, cy + 108, cx - 18, cy + 92, cx - 28, cy + 92);
  ctx.stroke();

  ctx.restore();
}

function drawAlmondEye(ctx, x, y, w, h) {
  // Eye white background
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sharp vertical feline slit pupil
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.ellipse(x, y, 2.2, h - 1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyelid line
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(x, y + 2, w + 1, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();
}

function drawCurvedWhisker(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - 3;
  ctx.quadraticCurveTo(midX, midY, x2, y2);
  ctx.stroke();
}

function drawMiniCrescentAmulet(ctx, cx, cy, r) {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI * 0.5, Math.PI * 0.5, false);
  ctx.arc(cx + r * 0.45, cy, r * 0.85, Math.PI * 0.45, -Math.PI * 0.45, true);
  ctx.closePath();
  ctx.fill();
}

// Grand Crescent Moon cradle for the mandala
function drawMandalaCrescent(p, cx, cy, r) {
  const ctx = p.drawingContext;
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI * 0.15, Math.PI * 0.85, false);
  ctx.arc(cx, cy + r * 0.35, r * 0.72, Math.PI * 0.82, Math.PI * 0.18, true);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Geometric radial hatchings inside crescent
  ctx.lineWidth = 0.8;
  for (let a = Math.PI * 0.22; a <= Math.PI * 0.78; a += 0.05) {
    const r1 = r;
    const r2 = r - 8;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  // Geometric crater circles
  drawCrater(ctx, cx - 45, cy + r * 0.75, 8);
  drawCrater(ctx, cx, cy + r * 0.92, 10);
  drawCrater(ctx, cx + 45, cy + r * 0.75, 8);

  ctx.restore();
}

function drawCrater(ctx, x, y, size) {
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 1, y + 1, size * 0.6, 0, Math.PI);
  ctx.stroke();
}

// 8 Lunar Phases placed symmetrically around a circle
function drawCircularLunarPhases(p, cx, cy, radius) {
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    drawGeometricMoonPhase(p, px, py, 9, i);
  }
}

function drawGeometricMoonPhase(p, x, y, r, stage) {
  p.push();
  p.stroke(0);
  p.strokeWeight(1);
  p.fill(255);
  p.circle(x, y, r * 2);

  p.fill(0);
  if (stage === 0) {
    // New moon
    p.circle(x, y, r * 2);
  } else if (stage === 4) {
    // Full moon
    p.noFill();
    p.circle(x, y, r * 2);
    p.circle(x, y, r * 1.4);
  } else if (stage === 2) {
    // First quarter
    p.arc(x, y, r * 2, r * 2, -p.HALF_PI, p.HALF_PI);
  } else if (stage === 6) {
    // Third quarter
    p.arc(x, y, r * 2, r * 2, p.HALF_PI, p.PI + p.HALF_PI);
  } else if (stage === 1) {
    // Waxing crescent
    p.arc(x, y, r * 2, r * 2, -p.HALF_PI, p.HALF_PI);
    p.fill(255);
    p.ellipse(x, y, r * 1.1, r * 2);
  } else if (stage === 3) {
    // Waxing gibbous
    p.circle(x, y, r * 2);
    p.fill(255);
    p.arc(x, y, r * 2, r * 2, p.HALF_PI, p.PI + p.HALF_PI);
    p.fill(0);
    p.ellipse(x, y, r * 1.1, r * 2);
  } else if (stage === 5) {
    // Waning gibbous
    p.circle(x, y, r * 2);
    p.fill(255);
    p.arc(x, y, r * 2, r * 2, -p.HALF_PI, p.HALF_PI);
    p.fill(0);
    p.ellipse(x, y, r * 1.1, r * 2);
  } else if (stage === 7) {
    // Waning crescent
    p.arc(x, y, r * 2, r * 2, p.HALF_PI, p.PI + p.HALF_PI);
    p.fill(255);
    p.ellipse(x, y, r * 1.1, r * 2);
  }
  p.pop();
}

// Spirograph / Hypotrochoid lace pattern
function drawHypotrochoid(p, cx, cy, R, r, d, loops) {
  p.stroke(0);
  p.strokeWeight(0.5);
  p.noFill();
  p.beginShape();
  const maxTheta = loops * p.TWO_PI;
  for (let t = 0; t <= maxTheta; t += 0.08) {
    const x = (R - r) * p.cos(t) + d * p.cos(((R - r) / r) * t);
    const y = (R - r) * p.sin(t) - d * p.sin(((R - r) / r) * t);
    p.vertex(cx + x, cy + y);
  }
  p.endShape();
}

// Solar crown rays radiating around the main circle
function drawSolarCrownRays(p, cx, cy, radius, numRays, rayLength) {
  p.stroke(0);
  for (let i = 0; i < numRays; i++) {
    const angle = (i * p.TWO_PI) / numRays;
    const isLong = i % 2 === 0;
    const len = isLong ? rayLength + 6 : rayLength;
    const x1 = cx + p.cos(angle) * radius;
    const y1 = cy + p.sin(angle) * radius;
    const x2 = cx + p.cos(angle) * (radius + len);
    const y2 = cy + p.sin(angle) * (radius + len);

    p.strokeWeight(isLong ? 1.4 : 0.8);
    p.line(x1, y1, x2, y2);

    if (isLong) {
      p.fill(0);
      p.circle(x2, y2, 2.5);
    }
  }
}

// 16-point Celestial Star Rosette
function drawCelestialRosette(p, cx, cy, radius) {
  p.push();
  p.stroke(0);
  p.strokeWeight(1);
  p.noFill();
  p.circle(cx, cy, radius * 2);
  p.circle(cx, cy, (radius - 8) * 2);

  // 16 radiating diamond rays
  const numPoints = 16;
  for (let i = 0; i < numPoints; i++) {
    const a1 = (i * p.TWO_PI) / numPoints;
    const a2 = ((i + 0.5) * p.TWO_PI) / numPoints;
    const a3 = ((i + 1) * p.TWO_PI) / numPoints;

    const rTip = i % 2 === 0 ? radius : radius * 0.72;
    const rBase = radius * 0.35;

    const xTip = cx + p.cos(a2) * rTip;
    const yTip = cy + p.sin(a2) * rTip;
    const x1 = cx + p.cos(a1) * rBase;
    const y1 = cy + p.sin(a1) * rBase;
    const x2 = cx + p.cos(a3) * rBase;
    const y2 = cy + p.sin(a3) * rBase;

    p.fill(i % 2 === 0 ? 0 : 255);
    p.triangle(xTip, yTip, x1, y1, x2, y2);
  }

  // Center multi-ring core
  p.fill(255);
  p.circle(cx, cy, radius * 0.5);
  p.fill(0);
  p.circle(cx, cy, radius * 0.25);
  p.fill(255);
  p.circle(cx, cy, radius * 0.1);
  p.pop();
}

// Concentric orbital rings with planets
function drawOrbitalRings(p, cx, cy, radii) {
  radii.forEach((r, idx) => {
    p.stroke(0);
    p.strokeWeight(0.7);
    p.noFill();
    p.circle(cx, cy, r * 2);

    // Orbiting mini planet dots
    const angle = (receipt.seed * 0.3 + idx * 2.1) % p.TWO_PI;
    const px = cx + p.cos(angle) * r;
    const py = cy + p.sin(angle) * r;
    p.fill(0);
    p.circle(px, py, idx === 1 ? 5 : 3.5);
  });
}

// Banknote Guilloche lace wave ribbon
function drawGuillocheBand(p, x1, x2, baseY, amplitude, freq1, freq2) {
  p.stroke(0);
  p.strokeWeight(0.6);
  p.noFill();

  // Multiple phased sine waves creating moiré lace
  const phases = [0, 0.8, 1.6, 2.4, 3.2];
  phases.forEach((phase) => {
    p.beginShape();
    for (let x = x1; x <= x2; x += 3) {
      const y = baseY + amplitude * Math.sin(x * freq1 + phase) * Math.cos(x * freq2);
      p.vertex(x, y);
    }
    p.endShape();
  });
}

// Planisphere / Constellation Star Chart
function drawPlanisphereChart(p, cx, cy, width, height) {
  p.push();
  const halfW = width / 2;
  const halfH = height / 2;

  // Chart outer frame
  p.stroke(0);
  p.strokeWeight(1.2);
  p.noFill();
  p.rect(cx - halfW, cy - halfH, width, height);
  p.strokeWeight(0.6);
  p.rect(cx - halfW + 3, cy - halfH + 3, width - 6, height - 6);

  // Coordinate grid lines (celestial latitude/longitude)
  for (let x = cx - halfW + 25; x < cx + halfW; x += 35) {
    drawFineDashedLine(p, x, cy - halfH + 4, x, cy + halfH - 4, 2, 3);
  }
  for (let y = cy - halfH + 25; y < cy + halfH; y += 30) {
    drawFineDashedLine(p, cx - halfW + 4, y, cx + halfW - 4, y, 2, 3);
  }

  // Elliptical ecliptic curve
  p.strokeWeight(0.8);
  p.ellipse(cx, cy, width * 0.9, height * 0.6);

  // Ringed Saturn in chart
  drawChartSaturn(p, cx + halfW - 45, cy - halfH + 40, 11);

  // Geometric Constellations (Felis & Canis celestial shapes)
  const nodes1 = [
    { x: cx - 95, y: cy - 40, mag: 1 },
    { x: cx - 60, y: cy - 65, mag: 2 },
    { x: cx - 20, y: cy - 55, mag: 2 },
    { x: cx + 10, y: cy - 70, mag: 3 },
    { x: cx - 35, y: cy - 25, mag: 2 },
    { x: cx - 75, y: cy - 15, mag: 3 },
  ];
  const links1 = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 0]];

  p.strokeWeight(0.8);
  links1.forEach(([i, j]) => {
    p.line(nodes1[i].x, nodes1[i].y, nodes1[j].x, nodes1[j].y);
  });

  nodes1.forEach((n) => {
    drawStarGlyph(p.drawingContext, n.x, n.y, n.mag === 1 ? 7 : 4, "#000000");
  });

  // Second constellation web (Lower quadrant)
  const nodes2 = [
    { x: cx - 40, y: cy + 35, mag: 2 },
    { x: cx + 5, y: cy + 20, mag: 1 },
    { x: cx + 55, y: cy + 30, mag: 2 },
    { x: cx + 85, y: cy + 60, mag: 3 },
    { x: cx + 25, y: cy + 65, mag: 2 },
  ];
  const links2 = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]];

  links2.forEach(([i, j]) => {
    p.line(nodes2[i].x, nodes2[i].y, nodes2[j].x, nodes2[j].y);
  });

  nodes2.forEach((n) => {
    drawStarGlyph(p.drawingContext, n.x, n.y, n.mag === 1 ? 6 : 4, "#000000");
  });

  // Background starry points
  for (let i = 0; i < 40; i++) {
    const rx = cx - halfW + 15 + ((i * 37 + receipt.seed * 7) % (width - 30));
    const ry = cy - halfH + 15 + ((i * 53 + receipt.seed * 11) % (height - 30));
    if (i % 7 === 0) {
      p.line(rx - 2, ry, rx + 2, ry);
      p.line(rx, ry - 2, rx, ry + 2);
    } else {
      p.point(rx, ry);
    }
  }

  p.pop();
}

function drawChartSaturn(p, x, y, r) {
  p.push();
  p.translate(x, y);
  p.rotate(-p.PI / 6);
  p.stroke(0);
  p.strokeWeight(1);
  p.noFill();
  p.arc(0, 0, r * 2.8, r * 0.8, p.PI, p.TWO_PI);
  p.fill(255);
  p.circle(0, 0, r * 1.3);
  p.noFill();
  p.arc(0, 0, r * 2.8, r * 0.8, 0, p.PI);
  p.arc(0, 0, r * 2.3, r * 0.6, 0, p.PI);
  p.pop();
}

// Pure geometric barcode (no text label, just precision vertical frequency lines)
function drawGeometricBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1.6,
    height: 44,
    displayValue: false, // NO TEXT! Only pure geometric bars!
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

// Bottom ornamental finial / heraldic motif
function drawBottomFinial(p, cx, cy) {
  p.stroke(0);
  p.strokeWeight(1);
  p.fill(0);

  // Central diamond
  p.quad(cx, cy - 6, cx + 5, cy, cx, cy + 6, cx - 5, cy);

  // Flanking horizontal flourishes
  p.noFill();
  p.line(cx - 35, cy, cx + 35, cy);
  p.circle(cx - 38, cy, 3);
  p.circle(cx + 38, cy, 3);
  p.circle(cx - 20, cy - 4, 2);
  p.circle(cx + 20, cy - 4, 2);
}

// 8-point geometric star glyph
function drawStarGlyph(ctx, x, y, size, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1;

  ctx.beginPath();
  // Cardinal lines
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  // Diagonal lines
  const d = size * 0.7;
  ctx.moveTo(x - d, y - d);
  ctx.lineTo(x + d, y + d);
  ctx.moveTo(x - d, y + d);
  ctx.lineTo(x + d, y - d);
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(x, y, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Geometric divider with center diamond
function drawGeometricDivider(p, x1, y, x2) {
  p.stroke(0);
  p.strokeWeight(1);
  p.line(x1, y, x2);
  p.strokeWeight(0.5);
  p.line(x1 + 6, y + 2, x2 - 6, y + 2);

  const midX = (x1 + x2) / 2;
  p.fill(255);
  p.stroke(0);
  p.strokeWeight(1);
  p.quad(midX, y - 3, midX + 4, y, midX, y + 3, midX - 4, y);
  p.circle(midX - 12, y, 2);
  p.circle(midX + 12, y, 2);
}

// Sawtooth border
function drawSawtoothBorder(p, x1, y, x2, step, pointingDown) {
  p.fill(0);
  p.stroke(0);
  p.strokeWeight(0.5);
  const dir = pointingDown ? 1 : -1;
  for (let x = x1; x < x2 - step; x += step * 2) {
    p.triangle(x, y, x + step, y + step * dir, x + step * 2, y);
  }
}

// Side diamond chain
function drawSideDiamondChain(p, x, y1, length) {
  p.fill(0);
  p.stroke(0);
  p.strokeWeight(0.5);
  const step = 8;
  for (let y = y1; y < y1 + length; y += step) {
    p.quad(x, y - 2, x + 2, y, x, y + 2, x - 2, y);
  }
}

// Corner decorative rosette
function drawCornerRosette(p, x, y) {
  p.fill(0);
  p.stroke(0);
  p.strokeWeight(1);
  p.circle(x, y, 5);
  p.noFill();
  p.circle(x, y, 9);
}

// Fine dashed line
function drawFineDashedLine(p, x1, y1, x2, y2, dash = 2, gap = 2) {
  p.stroke(0);
  p.strokeWeight(0.5);
  const d = p.dist(x1, y1, x2, y2);
  let cur = 0;
  while (cur < d) {
    const startFrac = cur / d;
    const endFrac = Math.min((cur + dash) / d, 1);
    p.line(
      p.lerp(x1, x2, startFrac),
      p.lerp(y1, y2, startFrac),
      p.lerp(x1, x2, endFrac),
      p.lerp(y1, y2, endFrac)
    );
    cur += dash + gap;
  }
}