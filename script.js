// ✅ script.js - (Print A4 ត្រឹមត្រូវ + រចនាថ្មី)

const API_URL = "https://script.google.com/macros/s/AKfycbyEm3bugjBA0vj0zrnSnrn6z-02k-JpDr7OBKiQLaP6rtwSi51pYkXr-WlIvvxWEUHI/exec";
const logoSrc = "logo.png?v=" + new Date().getTime();

let allTeachers = [];
let globalConfig = {};
let currentMode = "front";

document.addEventListener("DOMContentLoaded", () => { fetchData(); });

async function fetchData() {
    const loading = document.getElementById("loading");
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        if (!json.success) throw new Error("API Error");
        allTeachers = json.data || [];
        globalConfig = json.config || {};
        loading.style.display = "none";
        renderCards(allTeachers);
        updateButtonStyles();
    } catch (error) { console.error(error); }
}

function switchMode(mode) { currentMode = mode; updateButtonStyles(); filterCards(); }
function updateButtonStyles() {
    const btnFront = document.getElementById("btnFront");
    const btnBack = document.getElementById("btnBack");
    if(btnFront && btnBack) {
        btnFront.className = currentMode === "front" ? "btn btn-blue active" : "btn btn-blue";
        btnBack.className = currentMode === "back" ? "btn btn-red active" : "btn btn-red";
    }
}
function filterCards() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allTeachers.filter(t => (t.khmerName || "").toLowerCase().includes(input) || (t.id || "").includes(input));
    renderCards(filtered);
}
function renderCards(list) {
    const grid = document.getElementById("cardGrid");
    grid.innerHTML = "";
    if (!list.length) { grid.innerHTML = "<p>No Data</p>"; return; }
    list.forEach(t => grid.appendChild(createCard(t, globalConfig)));
}

// ✅ Function បង្កើតកាត (រចនាថ្មី)
function createCard(t, config) {
    const div = document.createElement("div");
    div.className = "id-card";
    const school = config.SCHOOL_NAME || "សាលារៀន";
    const year = config.ACADEMIC_YEAR || "2025-2026";

    if (currentMode === "front") {
        const photo = t.photoUrl || "https://via.placeholder.com/150";
        div.innerHTML = `
            <div class="card-header-front">
                <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                <img src="${logoSrc}" class="logo-card" alt="LOGO">
                <div class="school-name">${school}</div>
            </div>
            <div class="photo-box"><img src="${photo}" loading="lazy"></div>
            <div class="card-body">
                <div class="khmer-name">${t.khmerName || "---"}</div>
                <div class="latin-name">${t.latinName || "---"}</div>
                <div class="role-badge">${t.role || "បុគ្គលិក"}</div>
            </div>
            <div class="card-actions">
                <button class="btn-action btn-small-blue" onclick='printSingleCard(${JSON.stringify(t)}, "front")'><i class="fas fa-print"></i></button>
                <button class="btn-action btn-small-red" onclick='printSingleCard(${JSON.stringify(t)}, "back")'><i class="fas fa-qrcode"></i></button>
            </div>
            <div class="card-footer">ឆ្នាំសិក្សា ${year}</div>
        `;
    } else {
        const detailUrl = `${API_URL}?page=detail&id=${t.id}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;
        div.innerHTML = `
            <div class="card-header-back">
                <div class="header-title">កាតសម្គាល់ខ្លួន</div>
            </div>
            <div class="qr-section">
                <div class="qr-box"><img src="${qrUrl}"></div>
                <div class="info-table">
                    <div><b>ឈ្មោះ:</b> ${t.khmerName}</div>
                    <div><b>អត្តលេខ:</b> ${t.id}</div>
                    <div><b>ទូរសព្ទ:</b> ${t.phone || '---'}</div>
                </div>
            </div>
            <div class="card-footer">${school}</div>
        `;
    }
    return div;
}

// ✅ Print A4 (Grid 2 Columns = Standard A4)
// ✅ script.js - (Print A4 FIXED: ៦ កាត/ទំព័រ + Font Moul + រចនាស្អាត)

// ✅ script.js - (Function printAll តែមួយគត់ដែលអ្នកត្រូវប្តូរ)

// ✅ script.js - (Updated: Width 56mm + Big Role Font)

// ✅ script.js - (Updated: Better Spacing for Print)

// ✅ script.js - (Updated: Spacing Fix for Names & Role)

// ✅ script.js - (Print A4: Footer ធំច្បាស់)

// ✅ script.js - (Final Update: Back Info Big & Bold)

// ✅ script.js - (Fixed: Role Visibility & Vertical Spacing)

// ✅ script.js - (FIXED: Duplex Printing Alignment - ព្រីនសងខាងត្រូវគ្នា ១០០%)

// ✅ script.js - (Final: ព្រីនសងខាងត្រូវគ្នា + ស៊ុមពណ៌ខ្មៅច្បាស់សម្រាប់កាត់)

// ✅ script.js - (Final: Width 60mm + Perfect Alignment Fix)

// ✅ script.js - (Final: 58mm x 90mm + Duplex Fix + Black Frame)

// ✅ script.js - (Final: 55mm x 85mm + Duplex Alignment Fix)

function printAll(side) {
    if (!allTeachers.length) return alert("No Data");
    const w = window.open("", "_blank");
    
    // CSS សម្រាប់ Print
    const css = `<style>
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');
        @page { size: A4; margin: 0; }
        body { margin: 0; background: #eee; font-family: 'Siemreap', sans-serif; }
        
        /* 🔥 KEY FIX: 56mm x 86mm Layout & Centering */
        .sheet { 
            width: 210mm; 
            height: 297mm; 
            /* មិនប្រើ padding ទេ ទុកឱ្យ justify/align-content ធ្វើការ */
            padding: 0; 
            margin: 0 auto; 
            background: white; 
            display: grid; 
            
            /* 🔥 ប្តូរទំហំទៅ 56mm */
            grid-template-columns: repeat(2, 55mm); 
            /* 🔥 ប្តូរទំហំទៅ 86mm */
            grid-template-rows: repeat(3, 85mm); 
            
            /* កំណត់គម្លាតកាត (Gap) */
            gap: 10mm 20mm; /* 10mm លើក្រោម, 20mm ឆ្វេងស្តាំ */
            
            /* Center Alignment ដាច់ខាតលើក្រដាស A4 */
            justify-content: center; 
            align-content: center; 
            page-break-after: always; 
        }

        /* Duplex Logic (ត្រឡប់ទិសសម្រាប់ផ្នែកខាងក្រោយ) */
        .sheet.is-back { direction: rtl; }
        .sheet.is-back .id-card-print { direction: ltr; }
        
        .id-card-print { 
            width: 56mm;  /* 🔥 56mm */
            height: 86mm; /* 🔥 86mm */
            background: #fff; 
            border-radius: 8px; 
            overflow: hidden; 
            border: 2px solid #000; /* ស៊ុមខ្មៅសម្រាប់កាត់ */
            position: relative; 
            display: flex; 
            flex-direction: column; 
            -webkit-print-color-adjust: exact; 
        }
        
        /* Front Design */
        .card-header-front { 
            background-image: linear-gradient(to bottom, #d32f2f 50%, white 50%); 
            background-size: 100% 10px; background-repeat: no-repeat; 
            padding-top: 12px; text-align: center; 
        }
        
        .ministry { 
            font-family: 'Moul', serif; font-size: 8px; font-weight: normal; 
            text-align: center; line-height: 1.4; color: #333; 
            margin-bottom: 2px; 
        }

        .logo-print { width: 35px !important; height: 35px !important; margin: 0 auto 2px auto; display: block; object-fit: contain; }

        .school { 
            font-family: 'Moul'; font-size: 8px; color: #d32f2f; text-align: center; 
            margin-bottom: 3px; 
        }
        
        .photo { 
            width: 26mm; height: 32mm; 
            margin: 2px auto 4px auto; 
            display: block; object-fit: cover; 
            border: 1px solid #ccc; border-radius: 4px; 
        }
        
        .card-body-print { text-align: center; padding-top: 2px; }
        
        .name-kh { 
            font-family: 'Moul'; font-size: 10px; color: #0d1b3e; text-align: center; 
            margin-bottom: 3px; line-height: 1.2;
        }
        
        .name-en { 
            font-size: 8px; font-weight: bold; color: #d32f2f; text-align: center; 
            text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; 
        }
        
        .role { 
            font-size: 11px; font-weight: bold; text-align: center; color: white; 
            background: #0d1b3e; padding: 3px 12px; border-radius: 6px; 
            display: inline-block; margin: 0 auto; letter-spacing: 0.5px;
        }
        
        /* Back Design */
        .card-header-back { background: #d32f2f; height: 28px; display: flex; align-items: center; justify-content: center; color: white; }
        .header-title { font-family: 'Moul'; font-size: 9px; }
        .qr-section { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .qr-img { width: 30mm; height: 30mm; border: 1px solid #000; padding: 2px; margin-bottom: 8px;}
        
        /* Info Table */
        .info-table { 
            width: 90%; margin: 0 auto; 
            font-size: 11px; font-weight: bold; color: #000;
            background: #f9f9f9; padding: 5px; 
            border-left: 4px solid #0d1b3e; line-height: 1.6; 
        }
        
        .footer { 
            position: absolute; bottom: 0; width: 100%; 
            background: #0d1b3e; color: white; 
            font-size: 10px; font-weight: bold; 
            text-align: center; padding: 5px 0; 
        }
    </style>`;

    let html = `<html><head><title>Print ${side}</title>${css}</head><body>`;
    
    // កំណត់ Class ពិសេសសម្រាប់ផ្នែកខាងក្រោយ
    const sheetClass = side === 'back' ? 'sheet is-back' : 'sheet';
    const perPage = 6; 
    
    for (let i = 0; i < allTeachers.length; i += perPage) {
        const chunk = allTeachers.slice(i, i + perPage);
        html += `<div class="${sheetClass}">`;
        
        chunk.forEach(t => {
             if(side === 'front') {
                html += `
                <div class="id-card-print">
                    <div class="card-header-front">
                        <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                        <img src="${logoSrc}" class="logo-print">
                        <div class="school">${globalConfig.SCHOOL_NAME || 'សាលារៀន'}</div>
                    </div>
                    <img src="${t.photoUrl}" class="photo">
                    <div class="card-body-print">
                        <div class="name-kh">${t.khmerName}</div>
                        <div class="name-en">${t.latinName}</div>
                        <div class="role">${t.role || 'បុគ្គលិក'}</div>
                    </div>
                    <div class="footer">ឆ្នាំសិក្សា ${globalConfig.ACADEMIC_YEAR || '2025-2026'}</div>
                </div>`;
             } else {
                 const detailUrl = `${API_URL}?page=detail&id=${t.id}`;
                 const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;
                 html += `
                 <div class="id-card-print">
                    <div class="card-header-back"><div class="header-title">កាតសម្គាល់ខ្លួន</div></div>
                    <div class="qr-section">
                        <img src="${qrUrl}" class="qr-img">
                        <div class="info-table">
                            <div><b>ឈ្មោះ:</b> ${t.khmerName}</div>
                            <div><b>អត្តលេខ:</b> ${t.id}</div>
                            <div><b>Tel:</b> ${t.phone || '...'}</div>
                        </div>
                    </div>
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
function printSingleCard(t, side) { printAll(side); }





















