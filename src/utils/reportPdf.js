import { jsPDF } from "jspdf";

// Monochromatic Exploring Munnar green palette (RGB)
const C = {
  brand: [33, 100, 50], // #216432 primary green
  dark: [22, 71, 34], // #164722 dark forest green
  medium: [49, 132, 84], // #318454 medium green
  green: [96, 176, 128], // #60b080 supporting green
  light: [169, 219, 187], // #a9dbbb light green
  veryLight: [221, 249, 228], // #ddf9e4 very light green
  amber: [214, 158, 62], // #d69e3e pending
  red: [190, 80, 72], // #be5048 cancelled (muted red)
  blue: [88, 130, 165], // #5882a5 active
  ink: [24, 60, 39], // #183c27 headings
  gray: [110, 122, 114], // #6e7a72 secondary text
  hairline: [226, 233, 228], // #e2e9e4 hairlines
  rowAlt: [248, 251, 248], // zebra rows
  white: [255, 255, 255],
};

const rad = (deg) => (deg * Math.PI) / 180;

const formatINR = (value) => {
  if (value >= 10000000) return `Rs. ${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `Rs. ${(value / 100000).toFixed(1)} L`;
  return `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
};

const formatCount = (value) => Number(value || 0).toLocaleString("en-IN");

/**
 * Draws a donut (ring) chart.
 * segments: [{ label, value, color: [r,g,b] }]
 */
const drawDonut = (doc, cx, cy, outerR, innerR, segments, startAngle = -90) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let angle = startAngle;
  segments.forEach((seg) => {
    const sweep = (seg.value / total) * 360;
    const end = angle + sweep;
    const steps = Math.max(8, Math.round(sweep));
    doc.setFillColor(seg.color[0], seg.color[1], seg.color[2]);
    doc.moveTo(cx + innerR * Math.cos(rad(angle)), cy + innerR * Math.sin(rad(angle)));
    for (let i = 0; i <= steps; i++) {
      const a = rad(angle + (sweep * i) / steps);
      doc.lineTo(cx + outerR * Math.cos(a), cy + outerR * Math.sin(a));
    }
    for (let i = steps; i >= 0; i--) {
      const a = rad(angle + (sweep * i) / steps);
      doc.lineTo(cx + innerR * Math.cos(a), cy + innerR * Math.sin(a));
    }
    doc.fill();
    angle = end;
  });
};

/**
 * Draws a bar chart. data: [{ name, value }] — value key configurable.
 * y is the baseline (bottom) of the chart.
 */
const drawBars = (doc, data, x, y, w, h, color, valueKey = "value") => {
  const max = Math.max(...data.map((d) => d[valueKey] || 0), 1);
  const step = w / data.length;
  const barW = Math.min(11, step * 0.52);
  doc.setDrawColor(...C.hairline);
  doc.setLineWidth(0.2);
  doc.line(x, y, x + w, y);

  data.forEach((d, i) => {
    const bh = ((d[valueKey] || 0) / max) * (h - 6);
    const bx = x + step * i + (step - barW) / 2;
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(bx, y - bh, barW, bh, 1, 1, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.gray);
    doc.text(d.name, bx + barW / 2, y + 4, { align: "center" });
  });

  // value labels on top of bars
  data.forEach((d, i) => {
    const bh = ((d[valueKey] || 0) / max) * (h - 6);
    const bx = x + step * i + (step - barW) / 2;
    doc.setFontSize(6);
    doc.setTextColor(...C.medium);
    doc.text(String(d[valueKey]), bx + barW / 2, y - bh - 1.6, { align: "center" });
  });
};

/**
 * Draws a multi-series line chart. data: [{ name, ...series }]
 * series: [{ key, color }]
 */
const drawLines = (doc, data, x, y, w, h, series) => {
  const max = Math.max(...data.flatMap((d) => series.map((s) => d[s.key] || 0)), 1);
  const step = data.length > 1 ? w / (data.length - 1) : 0;

  doc.setDrawColor(...C.hairline);
  doc.setLineWidth(0.2);
  doc.line(x, y, x + w, y);

  series.forEach((s, si) => {
    const pts = data.map((d, i) => [x + i * step, y - ((d[s.key] || 0) / max) * (h - 6)]);
    doc.setDrawColor(s.color[0], s.color[1], s.color[2]);
    doc.setLineWidth(0.9);
    pts.forEach((p, i) => (i === 0 ? doc.moveTo(p[0], p[1]) : doc.lineTo(p[0], p[1])));
    doc.stroke();
    pts.forEach((p) => {
      doc.setFillColor(s.color[0], s.color[1], s.color[2]);
      doc.circle(p[0], p[1], 0.8, "F");
    });
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...C.gray);
  data.forEach((d, i) => doc.text(d.name, x + i * step, y + 4, { align: "center" }));
};

/**
 * Draws a table with a header row and zebra striping. Returns the y after the table.
 */
const drawTable = (doc, headers, rows, x, startY, colWidths) => {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  const headerH = 7.5;
  const rowH = 6.2;

  doc.setFillColor(...C.veryLight);
  doc.rect(x, startY, totalW, headerH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.2);
  doc.setTextColor(...C.dark);
  headers.forEach((h, i) => {
    const cx = x + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
    doc.text(h, cx + 2, startY + headerH / 2 + 0.8);
  });

  let yy = startY + headerH;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  rows.forEach((row, ri) => {
    if (yy > 278) {
      doc.addPage();
      yy = 20;
    }
    if (ri % 2 === 1) {
      doc.setFillColor(...C.rowAlt);
      doc.rect(x, yy, totalW, rowH, "F");
    }
    doc.setTextColor(...C.ink);
    row.forEach((cell, ci) => {
      const cx = x + colWidths.slice(0, ci).reduce((a, b) => a + b, 0);
      doc.text(String(cell ?? ""), cx + 2, yy + rowH / 2 + 0.8);
    });
    yy += rowH;
  });
  doc.setDrawColor(...C.hairline);
  doc.setLineWidth(0.2);
  doc.line(x, yy, x + totalW, yy);
  return yy;
};

const sectionTitle = (doc, text, y) => {
  doc.setFillColor(...C.brand);
  doc.roundedRect(14, y - 3.6, 2.4, 5, 0.6, 0.6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...C.ink);
  doc.text(text, 19, y);
};

/**
 * Generates and downloads a module-specific report PDF.
 *
 * @param {Object} options
 * @param {string} options.moduleKey     - "hotel" | "cab" | "bike" | "selfcar"
 * @param {string} options.moduleLabel   - "Hotel Bookings" etc.
 * @param {string} options.periodLabel   - "July 2026", "01 Aug 2026 – 15 Aug 2026", "All time"
 * @param {string} options.statusLabel   - "All", "Completed", "Pending", "Cancelled"
 * @param {Object} options.summary       - { bookings, revenue, completed, pending, cancelled }
 * @param {Array}  options.chartData     - [{ name, value }] for the trend bar chart
 * @param {Array}  options.pieData       - [{ label, value }] for the status donut
 * @param {Array}  options.rows          - detail rows: [{ id, customer, item, date, status, amount }]
 * @param {string} options.fileName      - e.g. "hotel-booking-report-july-2026.pdf"
 */
export function generateModuleReportPdf({
  moduleKey,
  moduleLabel,
  periodLabel,
  statusLabel,
  summary,
  chartData,
  pieData,
  rows,
  fileName,
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const PAD = 14;

  // ---------- Header band ----------
  doc.setFillColor(C.brand[0], C.brand[1], C.brand[2]);
  doc.rect(0, 0, W, 32, "F");
  doc.setFillColor(C.medium[0], C.medium[1], C.medium[2]);
  doc.rect(0, 32, W, 1.1, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`${moduleLabel} Report`, PAD, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("Exploring Munnar · Admin Reports", PAD, 21);
  doc.setFontSize(8.5);
  doc.setTextColor(221, 249, 228);
  doc.text(`Period: ${periodLabel}   ·   Status: ${statusLabel}`, PAD, 27);

  // ---------- Summary boxes ----------
  const boxes = [
    { label: "Total bookings", value: formatCount(summary.bookings) },
    { label: "Total revenue", value: formatINR(summary.revenue) },
    { label: "Completed", value: formatCount(summary.completed) },
    { label: "Pending", value: formatCount(summary.pending) },
    { label: "Cancelled", value: formatCount(summary.cancelled) },
  ];
  const boxW = (W - PAD * 2 - 3 * 4) / 5;
  const boxH = 18;
  boxes.forEach((box, i) => {
    const bx = PAD + i * (boxW + 4);
    doc.setFillColor(C.veryLight[0], C.veryLight[1], C.veryLight[2]);
    doc.roundedRect(bx, 42, boxW, boxH, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.gray);
    doc.text(box.label.toUpperCase(), bx + 3, 49.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...C.dark);
    doc.text(box.value, bx + 3, 56);
  });

  // ---------- Trend chart ----------
  sectionTitle(doc, "Booking Trend", 78);
  drawBars(doc, chartData, PAD, 86, W - PAD * 2, 48, C.medium, "value");

  // ---------- Status donut ----------
  sectionTitle(doc, "Status Distribution", 150);
  const donutSegments = pieData.map((p) => ({
    label: p.label,
    value: p.value,
    color:
      p.label.toLowerCase() === "completed" || p.label.toLowerCase() === "confirmed"
        ? C.brand
        : p.label.toLowerCase() === "pending"
          ? C.amber
          : p.label.toLowerCase() === "active"
            ? C.blue
            : C.red,
  }));
  const cx = 40;
  const cy = 185;
  const outerR = 24;
  const innerR = 12.5;
  drawDonut(doc, cx, cy, outerR, innerR, donutSegments);

  // donut center total
  const totalVal = donutSegments.reduce((s, d) => s + d.value, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...C.ink);
  doc.text(formatCount(totalVal), cx, cy - 1, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...C.gray);
  doc.text("Total", cx, cy + 5, { align: "center" });

  // donut legend (right side)
  let ly = 164;
  donutSegments.forEach((seg) => {
    doc.setFillColor(seg.color[0], seg.color[1], seg.color[2]);
    doc.circle(88, ly - 1, 1.6, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.ink);
    doc.text(seg.label, 92, ly);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...C.gray);
    const pct = totalVal ? Math.round((seg.value / totalVal) * 100) : 0;
    doc.text(`${formatCount(seg.value)}  (${pct}%)`, 168, ly, { align: "right" });
    ly += 8;
  });

  // ---------- Detail table ----------
  sectionTitle(doc, "Booking Details", 224);
  const headers = ["Booking ID", "Customer", "Service / Item", "Date", "Status", "Amount"];
  const colWidths = [30, 32, 56, 30, 24, 30];
  drawTable(
    doc,
    headers,
    rows.map((r) => [r.id, r.customer, r.item, r.date, r.status, formatINR(r.amount)]),
    PAD,
    230,
    colWidths
  );

  // ---------- Footer ----------
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...C.gray);
    doc.text("Exploring Munnar · Generated report", PAD, 291);
    doc.text(`Page ${i} of ${pages}`, W - PAD, 291, { align: "right" });
  }

  doc.save(fileName);
}
