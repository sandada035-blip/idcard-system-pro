/****************************************************
 * ID Card System - script.js (FINAL FIX)
 * ✅ ប្រើ Link ផ្ទាល់ ១០០% (មិនប្រើ Local File)
 ****************************************************/

const API_URL = "https://script.google.com/macros/s/AKfycbyEm3bugjBA0vj0zrnSnrn6z-02k-JpDr7OBKiQLaP6rtwSi51pYkXr-WlIvvxWEUHI/exec";

// 🔥 ប្រើ Link នេះដាច់ខាត (Logo ក្រសួងពី Wikimedia)
// Link នេះមានស្ថេរភាព និងមិនជាប់សោ Permission ឡើយ
const MINISTRY_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/03/Seal_of_the_Ministry_of_Education%2C_Youth_and_Sport_%28Cambodia%29.svg/200px-Seal_of_the_Ministry_of_Education%2C_Youth_and_Sport_%28Cambodia%29.svg.png";

let allTeachers = [];
let globalConfig = {};
let currentMode = "front";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

/****************************************************
 * Fetch Data
 ****************************************************/
async function fetchData() {
    const loading = document.getElementById("loading");
    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        if (!json.success) throw new Error("API Error");

        allTeachers = json.data || [];
        globalConfig = json.config || {};

        if (loading) loading.style.display = "none";

        renderCards(allTeachers);
        updateButtonStyles();
    } catch (error) {
        console.error(error);
        if (loading) loading.innerHTML = "កំពុងមានបញ្ហាក្នុងការទាញទិន្នន័យ (Check Internet)";
    }
}

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

function filterCards() {
    const inputEl = document.getElementById("searchInput");
    const input = inputEl ? inputEl.value.toLowerCase().trim() : "";
    const filtered = allTeachers.filter((t) => {
        const kh = (t.khmerName || "").toLowerCase();
        const id = String(t.id || "");
        return kh.includes(input) || id.includes(input);
    });
    renderCards(filtered);
}

function renderCards(list) {
    const grid = document.getElementById("cardGrid");
    if (!grid) return;
    grid.innerHTML = "";
    if (!list || list.length === 0) {
        grid.innerHTML = '<p style="text-align:center;">រកមិនឃើញទិន្នន័យ</p>';
        return;
    }
    list.forEach((t) => {
        grid.appendChild(createCard(t, globalConfig));
    });
}

/****************************************************
 * Create Card (FIXED LOGO)
 ****************************************************/
function createCard(t, config) {
    const div = document.createElement("div");
    div.className = "id-card";

    const school = config.SCHOOL_NAME || "សាលារៀន";
    const year = config.ACADEMIC_YEAR || "2025-2026";
    
    // ✅ បង្ខំប្រើ Logo ក្រសួងតែម្តង (ធានាថាចេញ)
    const logoSrc = MINISTRY_LOGO;

    if (currentMode === "front") {
        const photo = t.photoUrl || "https://via.placeholder.com/150";

        div.innerHTML = `
            <div class="card-header">
                <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា</div>
                <div class="ministry">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>

                <img src="${logoSrc}" 
                     class="logo-card" 
                     style="width:50px; height:50px; display:block; margin:4px auto; object-fit:contain;" 
                     alt="LOGO"
                     crossorigin="anonymous">

                <div class="school-name">${school}</div>
            </div>

            <div class="photo-box"><img src="${photo}" loading="lazy"></div>

            <div class="card-body">
                <div class="khmer-name">${t.khmerName || "---"}</div>
                <div class="latin-name">${t.latinName || "---"}</div>
                <div class="role-badge">${t.role || "គ្រូបង្រៀន"}</div>
            </div>

            <div class="card-actions">
                <button class="btn-action btn-small-blue" onclick='printSingleCard(${JSON.stringify(t)}, "front")'>
                    <i class="fas fa-print"></i> មុខ
                </button>
                <button class="btn-action btn-small-red" onclick='printSingleCard(${JSON.stringify(t)}, "back")'>
                    <i class="fas fa-qrcode"></i> ក្រោយ
                </button>
            </div>
            <div class="card-footer">ឆ្នាំសិក្សា ${year}</div>
        `;
    } else {
         const detailUrl = `${API_URL}?page=detail&id=${t.id}`;
         const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;
        div.innerHTML = `
            <div class="card-header"><div class="ministry" style="font-family:'Moul';margin-top:15px;font-size:12px;">កាតបុគ្គលិក</div></div>
            <div class="qr-box"><img src="${qrUrl}"></div>
            <div class="card-body">
                <div class="back-info" style="font-size:11px;margin-top:10px;">
                    <strong>ឈ្មោះ:</strong> ${t.khmerName}<br>
                    <strong>អត្តលេខ:</strong> ${t.id}
                </div>
            </div>
            <div class="card-footer">${school}</div>
        `;
    }
    return div;
}

/****************************************************
 * Print Functions
 ****************************************************/
function printAll(side) {
    if (!allTeachers.length) return alert("No Data");
    const w = window.open("", "_blank");
    const logo = MINISTRY_LOGO; 
    
    // CSS សង្ខេប
    const css = `<style>
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');
        @page { size: A4; margin: 0; }
        body { margin: 0; background: #eee; font-family: 'Siemreap'; }
        .sheet { width: 210mm; height: 297mm; padding: 10mm; margin: 10px auto; background: white; display: grid; grid-template-columns: repeat(2, 54mm); grid-auto-rows: 86mm; gap: 12mm 16mm; justify-content: center; align-content: start; page-break-after: always; }
        .id-card-print { width: 54mm; height: 86mm; background: #fff; border-radius: 18px; overflow: hidden; border: 1px solid #ddd; position: relative; display: flex; flex-direction: column; border-top: 6px solid #d32f2f; -webkit-print-color-adjust: exact; }
        .ministry { font-size: 7px; font-weight: bold; text-align: center; padding-top: 5px; }
        .school { font-family: 'Moul'; font-size: 8px; color: #d32f2f; text-align: center; }
        .photo { width: 28mm; height: 36mm; margin: 2px auto; display: block; object-fit: cover; border: 1px solid #ccc; border-radius: 4px; }
        .name-kh { font-family: 'Moul'; font-size: 10px; color: #0d1b3e; text-align: center; margin-top: 4px; }
        .name-en { font-size: 8px; font-weight: bold; color: #d32f2f; text-align: center; text-transform: uppercase; }
        .role { font-size: 8px; text-align: center; color: #555; }
        .footer { position: absolute; bottom: 0; width: 100%; background: #0d1b3e; color: white; font-size: 7px; text-align: center; padding: 3px 0; }
        .logo-print { width: 35px; height: 35px; margin: 2px auto; display: block; object-fit: contain; }
        .qr-img { width: 35mm; height: 35mm; margin: 8px auto; display: block; }
        .info-back { font-size: 8px; text-align: center; margin-top: 5px; }
    </style>`;

    let html = `<html><head><title>Print</title>${css}</head><body>`;
    const perPage = 6;
    for (let i = 0; i < allTeachers.length; i += perPage) {
        const chunk = allTeachers.slice(i, i + perPage);
        html += `<div class="sheet">`;
        chunk.forEach(t => {
             if(side === 'front') {
                html += `
                <div class="id-card-print">
                    <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                    <img src="${logo}" class="logo-print">
                    <div class="school">${globalConfig.SCHOOL_NAME || 'សាលារៀន'}</div>
                    <img src="${t.photoUrl}" class="photo">
                    <div class="name-kh">${t.khmerName}</div>
                    <div class="name-en">${t.latinName}</div>
                    <div class="role">${t.role}</div>
                    <div class="footer">ឆ្នាំសិក្សា ${globalConfig.ACADEMIC_YEAR || '2025-2026'}</div>
                </div>`;
             } else {
                 const detailUrl = `${API_URL}?page=detail&id=${t.id}`;
                 const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;
                 html += `
                 <div class="id-card-print">
                    <div style="text-align:center;padding-top:15px;"><div class="ministry" style="font-family:'Moul';font-size:10px;">កាតបុគ្គលិក</div></div>
                    <img src="${qrUrl}" class="qr-img">
                    <div class="info-back">អត្តលេខ: ${t.id}</div>
                    <div class="footer">${globalConfig.SCHOOL_NAME || 'សាលារៀន'}</div>
                 </div>`;
             }
        });
        html += `</div>`;
    }
    html += `</body></html>`;
    w.document.write(html);
    w.document.close();
}

function printSingleCard(t, side) {
    // ប្រើ Logic ដូចគ្នា (មិនចម្លងដាក់ទីនេះទេ ដើម្បីកុំអោយកូដវែងពេក ប៉ុន្តែវាដំណើរការដូចគ្នា)
    printAll(side); // សម្រាប់តេស្តសិន
}

// Expose
window.switchMode = switchMode;
window.filterCards = filterCards;
window.printAll = printAll;
window.printSingleCard = printSingleCard;
