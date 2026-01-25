/****************************************************
 * ID Card System - script.js (FULL)
 * - Base64 Logo works on Vercel (view + print)
 ****************************************************/

const API_URL = "https://script.google.com/macros/s/AKfycbyEm3bugjBA0vj0zrnSnrn6z-02k-JpDr7OBKiQLaP6rtwSi51pYkXr-WlIvvxWEUHI/exec"; // ✅ Your Apps Script URL

/****************************************************
 * ✅ SCHOOL LOGO (Base64) — PASTE FULL HERE
 * Must start with: data:image/png;base64,...
 ****************************************************/
const SCHOOL_LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAYAAACN6mQyAAABxElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaa";

/****************************************************
 * Optional fallback logo (online) – leave "" if none
 ****************************************************/
const FALLBACK_LOGO_URL = "";

/****************************************************
 * Ministry logo fallback (online) – safe backup
 ****************************************************/
const MINISTRY_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/03/Seal_of_the_Ministry_of_Education%2C_Youth_and_Sport_%28Cambodia%29.svg/200px-Seal_of_the_Ministry_of_Education%2C_Youth_and_Sport_%28Cambodia%29.svg.png";

/****************************************************
 * Globals
 ****************************************************/
let allTeachers = [];
let globalConfig = {};
let currentMode = "front";

/****************************************************
 * Boot
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

/****************************************************
 * Helpers
 ****************************************************/
function getLogoSrc() {
  // 1) Base64
  if (typeof SCHOOL_LOGO_BASE64 === "string" && SCHOOL_LOGO_BASE64.startsWith("data:image/")) {
    return SCHOOL_LOGO_BASE64;
  }
  // 2) Fallback URL
  if (typeof FALLBACK_LOGO_URL === "string" && FALLBACK_LOGO_URL.trim()) {
    return FALLBACK_LOGO_URL.trim();
  }
  // 3) Ministry logo
  return MINISTRY_LOGO;
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/****************************************************
 * Fetch Data
 ****************************************************/
async function fetchData() {
  const loading = document.getElementById("loading");
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    const json = await response.json();

    if (!json.success) throw new Error("API Error");

    allTeachers = Array.isArray(json.data) ? json.data : [];
    globalConfig = json.config || {};

    if (loading) loading.style.display = "none";

    renderCards(allTeachers);
    updateButtonStyles();
  } catch (error) {
    console.error(error);
    if (loading) loading.innerHTML = "កំពុងមានបញ្ហាក្នុងការទាញទិន្នន័យ (Check Internet)";
  }
}

/****************************************************
 * Mode Switch
 ****************************************************/
function switchMode(mode) {
  currentMode = mode;
  updateButtonStyles();
  filterCards();
}

function updateButtonStyles() {
  const btnFront = document.getElementById("btnFront");
  const btnBack = document.getElementById("btnBack");

  if (!btnFront || !btnBack) return;

  if (currentMode === "front") {
    btnFront.className = "btn btn-blue active";
    btnBack.className = "btn btn-red";
  } else {
    btnFront.className = "btn btn-blue";
    btnBack.className = "btn btn-red active";
  }
}

/****************************************************
 * Filter
 ****************************************************/
function filterCards() {
  const inputEl = document.getElementById("searchInput");
  const input = inputEl ? inputEl.value.toLowerCase().trim() : "";

  const filtered = allTeachers.filter((t) => {
    const kh = (t.khmerName || "").toLowerCase();
    const en = (t.latinName || "").toLowerCase();
    const id = String(t.id || "");
    return kh.includes(input) || en.includes(input) || id.includes(input);
  });

  renderCards(filtered);
}

/****************************************************
 * Render Cards (uses createCard)
 ****************************************************/
function renderCards(list) {
  const grid = document.getElementById("cardGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!list || list.length === 0) {
    grid.innerHTML =
      '<p style="color:#666; width:100%; text-align:center;">រកមិនឃើញទិន្នន័យ</p>';
    return;
  }

  list.forEach((t) => {
    const cardEl = createCard(t, globalConfig);
    grid.appendChild(cardEl);
  });
}

/****************************************************
 * Create Card (Front/Back)
 ****************************************************/
function createCard(t, config) {
  const div = document.createElement("div");
  div.className = "id-card";

  const school = (config && config.SCHOOL_NAME) || "សាលារៀន";
  const year = (config && config.ACADEMIC_YEAR) || "2025-2026";

  const logoSrc = getLogoSrc();

  if (currentMode === "front") {
    const photo = t.photoUrl || "https://via.placeholder.com/150";

    div.innerHTML = `
      <div class="card-header">
        <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា</div>
        <div class="ministry">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>

        <img
          src="${logoSrc}"
          class="logo-card"
          style="width:50px;height:50px;display:block;margin:4px auto;object-fit:contain;z-index:10;position:relative;"
          alt="LOGO"
          onerror="this.onerror=null; this.src='${MINISTRY_LOGO}';"
        />

        <div class="school-name">${escapeHtml(school)}</div>
      </div>

      <div class="photo-box"><img src="${photo}" loading="lazy" alt="PHOTO"></div>

      <div class="card-body">
        <div class="khmer-name">${escapeHtml(t.khmerName || "---")}</div>
        <div class="latin-name">${escapeHtml(t.latinName || "---")}</div>
        <div class="role-badge">${escapeHtml(t.role || "គ្រូបង្រៀន")}</div>
      </div>

      <div class="card-actions">
        <button class="btn-action btn-small-blue" data-action="print-front">
          <i class="fas fa-print"></i> មុខ
        </button>
        <button class="btn-action btn-small-red" data-action="print-back">
          <i class="fas fa-qrcode"></i> ក្រោយ
        </button>
      </div>

      <div class="card-footer">ឆ្នាំសិក្សា ${escapeHtml(year)}</div>
    `;

    // Safer than putting JSON in onclick
    div.querySelector('[data-action="print-front"]').addEventListener("click", () => printSingleCard(t, "front"));
    div.querySelector('[data-action="print-back"]').addEventListener("click", () => printSingleCard(t, "back"));
  } else {
    const detailUrl = `${API_URL}?page=detail&id=${encodeURIComponent(t.id || "")}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;

    div.innerHTML = `
      <div class="card-header">
        <div class="ministry" style="font-family:'Moul'; margin-top:15px; font-size:12px;">កាតបុគ្គលិក</div>
      </div>

      <div class="qr-box"><img src="${qrUrl}" loading="lazy" alt="QR"></div>

      <div class="card-body">
        <div class="back-info" style="font-size:11px; margin-top:10px; line-height:1.6;">
          <strong>ឈ្មោះ:</strong> ${escapeHtml(t.khmerName || "---")}<br>
          <strong>លេខទូរសព្ទ:</strong> ${escapeHtml(t.phone || "---")}<br>
          <strong>អត្តលេខ:</strong> ${escapeHtml(t.id || "---")}
        </div>
      </div>

      <div class="card-footer">${escapeHtml(school)}</div>
    `;
  }

  return div;
}

/****************************************************
 * Print A4 (All)
 ****************************************************/
function printAll(side) {
  if (!allTeachers || allTeachers.length === 0) {
    alert("មិនមានទិន្នន័យសម្រាប់ Print ទេ!");
    return;
  }

  const w = window.open("", "_blank");
  const school = globalConfig.SCHOOL_NAME || "សាលារៀន";
  const year = globalConfig.ACADEMIC_YEAR || "2025-2026";
  const logo = getLogoSrc();

  const css = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');

      @page { size: A4; margin: 0; }
      body { margin: 0; padding: 0; background: #eee; font-family: 'Siemreap', sans-serif; }

      .sheet {
        width: 210mm; height: 297mm;
        padding: 10mm;
        margin: 10px auto;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        display: block;
        box-sizing: border-box;
        page-break-after: always;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, 54mm);
        grid-auto-rows: 86mm;
        gap: 12mm 16mm;
        justify-content: center;
        align-content: start;
      }

      @media print {
        body { background: white; }
        .sheet { margin: 0; box-shadow: none; width: 210mm; height: 297mm; }
      }

      .id-card-print {
        width: 54mm; height: 86mm; background: #fff;
        border-radius: 18px !important; overflow: hidden !important;
        border: 1px solid #ddd; position: relative; display: flex; flex-direction: column;
        border-top: 6px solid #d32f2f;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }

      .ministry { font-size: 7px; font-weight: bold; text-align: center; line-height: 1.2; padding-top: 5px;}
      .logo-print { width: 35px; height: 35px; margin: 2px auto; display: block; object-fit: contain; }
      .school { font-family: 'Moul'; font-size: 8px; color: #d32f2f; text-align: center; margin-top: 1px; }
      .photo { width: 28mm; height: 36mm; margin: 2px auto; display: block; object-fit: cover; border: 1px solid #ccc; border-radius: 4px; }
      .name-kh { font-family: 'Moul'; font-size: 10px; color: #0d1b3e; text-align: center; margin-top: 4px; }
      .name-en { font-size: 8px; font-weight: bold; color: #d32f2f; text-align: center; text-transform: uppercase; }
      .role { font-size: 8px; text-align: center; color: #555; margin-top: 2px;}
      .footer { position: absolute; bottom: 0; width: 100%; background: #0d1b3e; color: white; font-size: 7px; text-align: center; padding: 3px 0; }

      .qr-img { width: 35mm; height: 35mm; margin: 8px auto; display: block; }
      .info-back { font-size: 8px; text-align: center; margin-top: 5px; line-height: 1.4; }
    </style>
  `;

  let html = `
    <html>
      <head>
        <title>Print ${side}</title>
        ${css}
        <script>
          // ✅ Inject Base64 into print window too
          const SCHOOL_LOGO_BASE64 = ${JSON.stringify(SCHOOL_LOGO_BASE64)};
        <\/script>
      </head>
      <body>
  `;

  const perPage = 6;
  for (let i = 0; i < allTeachers.length; i += perPage) {
    const chunk = allTeachers.slice(i, i + perPage);
    html += `<div class="sheet"><div class="grid">`;

    chunk.forEach((t) => {
      const photo = t.photoUrl || "";
      const detailUrl = `${API_URL}?page=detail&id=${encodeURIComponent(t.id || "")}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;

      if (side === "front") {
        html += `
          <div class="id-card-print">
            <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            <img src="${logo}" class="logo-print" onerror="this.onerror=null; this.src='${MINISTRY_LOGO}'">
            <div class="school">${escapeHtml(school)}</div>
            <img src="${photo}" class="photo">
            <div class="name-kh">${escapeHtml(t.khmerName || "")}</div>
            <div class="name-en">${escapeHtml(t.latinName || "")}</div>
            <div class="role">${escapeHtml(t.role || "")}</div>
            <div class="footer">ឆ្នាំសិក្សា ${escapeHtml(year)}</div>
          </div>
        `;
      } else {
        html += `
          <div class="id-card-print">
            <div style="padding-top:15px; text-align:center;">
              <div class="ministry" style="font-family:'Moul'; font-size:10px;">កាតបុគ្គលិក</div>
            </div>
            <img src="${qrUrl}" class="qr-img">
            <div class="info-back">
              លេខទូរសព្ទ: ${escapeHtml(t.phone || "---")}<br>
              អត្តលេខ: ${escapeHtml(t.id || "---")}
            </div>
            <div class="footer">${escapeHtml(school)}</div>
          </div>
        `;
      }
    });

    html += `</div></div>`;
  }

  html += `</body></html>`;

  w.document.write(html);
  w.document.close();
}

/****************************************************
 * Print Single Card
 ****************************************************/
function printSingleCard(t, side) {
  const w = window.open("", "_blank", "width=420,height=700");
  const school = globalConfig.SCHOOL_NAME || "សាលារៀន";
  const year = globalConfig.ACADEMIC_YEAR || "2025-2026";
  const logo = getLogoSrc();

  const css = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');
      @page { size: 54mm 86mm; margin: 0; }
      body { margin: 0; padding: 20px; display: flex; justify-content: center; background: #f0f0f0; font-family: 'Siemreap', sans-serif;}

      .id-card-print {
        width: 54mm; height: 86mm; background: #fff;
        border-radius: 18px !important; overflow: hidden !important;
        border: 1px solid #ddd; position: relative; display: flex; flex-direction: column;
        border-top: 6px solid #d32f2f;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }

      .ministry { font-size: 7px; font-weight: bold; text-align: center; line-height: 1.2; padding-top: 5px;}
      .logo-print { width: 35px; height: 35px; margin: 2px auto; display: block; object-fit: contain; }
      .school { font-family: 'Moul'; font-size: 8px; color: #d32f2f; text-align: center; margin-top: 1px; }
      .photo { width: 28mm; height: 36mm; margin: 2px auto; display: block; object-fit: cover; border: 1px solid #ccc; border-radius: 4px; }
      .name-kh { font-family: 'Moul'; font-size: 10px; color: #0d1b3e; text-align: center; margin-top: 4px; }
      .name-en { font-size: 8px; font-weight: bold; color: #d32f2f; text-align: center; text-transform: uppercase; }
      .role { font-size: 8px; text-align: center; color: #555; margin-top: 2px;}
      .footer { position: absolute; bottom: 0; width: 100%; background: #0d1b3e; color: white; font-size: 7px; text-align: center; padding: 3px 0; }

      .qr-img { width: 35mm; height: 35mm; margin: 15px auto; display: block; }
      .info-back { font-size: 8px; text-align: center; margin-top: 5px; line-height: 1.4; }
    </style>
  `;

  let htmlContent = "";

  if (side === "front") {
    htmlContent = `
      <div class="id-card-print">
        <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        <img src="${logo}" class="logo-print" onerror="this.onerror=null; this.src='${MINISTRY_LOGO}'">
        <div class="school">${escapeHtml(school)}</div>
        <img src="${t.photoUrl || ""}" class="photo">
        <div class="name-kh">${escapeHtml(t.khmerName || "")}</div>
        <div class="name-en">${escapeHtml(t.latinName || "")}</div>
        <div class="role">${escapeHtml(t.role || "")}</div>
        <div class="footer">ឆ្នាំសិក្សា ${escapeHtml(year)}</div>
      </div>
    `;
  } else {
    const detailUrl = `${API_URL}?page=detail&id=${encodeURIComponent(t.id || "")}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;
    htmlContent = `
      <div class="id-card-print">
        <div class="ministry" style="font-family:'Moul'; margin-top:15px; font-size:10px;">កាតបុគ្គលិក</div>
        <img src="${qrUrl}" class="qr-img">
        <div class="info-back">
          លេខទូរសព្ទ: ${escapeHtml(t.phone || "---")}<br>
          អត្តលេខ: ${escapeHtml(t.id || "---")}
        </div>
        <div class="footer">${escapeHtml(school)}</div>
      </div>
    `;
  }

  w.document.write(`<html><head><title>Print Card</title>${css}</head><body>${htmlContent}</body></html>`);
  w.document.close();
}
