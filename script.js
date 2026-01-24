const API_URL = "https://script.google.com/macros/s/AKfycbwSbCRDF1lhxwDcxtsAMJ-N8HVDytPrhPJNKRZoMyJ459YnKjS8hQqKopjYGb-RPPEJ/exec"; // ⚠️ កុំភ្លេចដាក់ URL របស់អ្នក

let allTeachers = [];
let globalConfig = {};
let currentMode = 'front'; // កំណត់លំនាំដើមជា "ខាងមុខ"

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

async function fetchData() {
    const loading = document.getElementById('loading');
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        
        if (!json.success) throw new Error("API Error");

        allTeachers = json.data;
        globalConfig = json.config || {};

        loading.style.display = 'none';
        
        // 🔥 ចាប់ផ្តើមបង្ហាញកាត
        renderCards(allTeachers);
        
        // កំណត់ប៊ូតុង "ខាងមុខ" អោយ Active ពីដំបូង
        updateButtonStyles();

    } catch (error) {
        console.error(error);
        loading.innerHTML = "កំពុងមានបញ្ហាក្នុងការទាញទិន្នន័យ (Check Internet)";
    }
}

// ✅ ១. Function ប្តូរ Mode (មុខ/ក្រោយ)
function switchMode(mode) {
    currentMode = mode; // ប្តូរ Mode
    
    // ប្តូរពណ៌ប៊ូតុង
    updateButtonStyles();

    // 🔥 សំខាន់៖ បង្កើតកាតឡើងវិញតាម Mode ថ្មី
    filterCards(); 
}

function updateButtonStyles() {
    const btnFront = document.getElementById('btnFront');
    const btnBack = document.getElementById('btnBack');

    if (currentMode === 'front') {
        btnFront.className = 'btn btn-blue active';
        btnBack.className = 'btn btn-red'; // មិន Active
    } else {
        btnFront.className = 'btn btn-blue';
        btnBack.className = 'btn btn-red active'; // Active
    }
}

// Function ស្វែងរក (Filter)
function filterCards() {
    const input = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
    
    const filtered = allTeachers.filter(t => 
        (t.khmerName || '').toLowerCase().includes(input) || 
        (t.latinName || '').toLowerCase().includes(input) ||
        (t.id || '').includes(input)
    );
    renderCards(filtered);
}

// ✅ ២. Function បង្កើតកាត (Update អោយស្គាល់ Mode)
function renderCards(list) {
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = '<p style="color:#666; width:100%; text-align:center;">រកមិនឃើញទិន្នន័យ</p>';
        return;
    }

    list.forEach(t => {
        // បង្កើត div សម្រាប់កាត
        const card = document.createElement('div');
        card.className = 'id-card';
        
        // ទិន្នន័យទូទៅ
        const school = globalConfig.SCHOOL_NAME || "សាលារៀន";
        const year = globalConfig.ACADEMIC_YEAR || "2025-2026";

        if (currentMode === 'front') {
            // 👉 បង្ហាញខាងមុខ (Front)
            const photo = t.photoUrl || 'https://via.placeholder.com/150';
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា</div>
                    <div class="ministry">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                    <div class="school-name">${school}</div>
                </div>
                <div class="photo-box"><img src="${photo}" loading="lazy"></div>
                <div class="card-body">
                    <div class="khmer-name">${t.khmerName || '---'}</div>
                    <div class="latin-name">${t.latinName || '---'}</div>
                    <div class="role-badge">${t.role || 'គ្រូបង្រៀន'}</div>
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
            // 👉 បង្ហាញខាងក្រោយ (Back)
            const detailUrl = `${API_URL}?page=detail&id=${t.id}`;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="ministry" style="font-family:'Moul'; margin-top:15px; font-size:12px;">កាតបុគ្គលិក</div>
                </div>
                <div class="qr-box"><img src="${qrUrl}" loading="lazy"></div>
                <div class="card-body">
                    <div class="back-info" style="font-size:11px; margin-top:10px; line-height:1.6;">
                        <strong>ឈ្មោះ:</strong> ${t.khmerName}<br>
                        <strong>លេខទូរសព្ទ:</strong> ${t.phone || '---'}<br>
                        <strong>អត្តលេខ:</strong> ${t.id}
                    </div>
                </div>
                <div class="card-footer">${school}</div>
            `;
        }

        grid.appendChild(card);
    });
}

// ... (រក្សា Function PrintAll និង PrintSingleCard របស់អ្នកទុកដដែល) ...
// គ្រាន់តែ past កូដ printAll នៅខាងក្រោមនេះបើអ្នកមិនទាន់មាន
// ✅ Function សម្រាប់ Print A4 All (កូដពេញលេញ)
function printAll(side) {
    if (allTeachers.length === 0) {
        alert("មិនមានទិន្នន័យសម្រាប់ Print ទេ!");
        return;
    }
    
    // បើកផ្ទាំងថ្មីសម្រាប់ Print
    const w = window.open('', '_blank');
    
    // CSS សម្រាប់ A4 Print (កំណត់ខ្នាតច្បាស់លាស់)
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: #fff; font-family: 'Siemreap', sans-serif; }
            
            /* កំណត់ទំហំក្រដាស A4 */
            .sheet { 
                width: 210mm; height: 297mm; 
                padding: 10mm; 
                page-break-after: always; 
                display: block; 
                box-sizing: border-box; 
            }
            
            /* តម្រៀបជា Grid (២ ជួរឈរ, ៣ ជួរដេក = ៦ កាត) */
            .grid { 
                display: grid; 
                grid-template-columns: repeat(2, 54mm); 
                grid-auto-rows: 86mm; 
                gap: 12mm 16mm; 
                justify-content: center; 
                align-content: start; 
            }
            
            /* រចនាកាតពេល Print */
            .id-card-print { 
                width: 54mm; height: 86mm; 
                border: 1px solid #ddd; /* ដាក់ border ស្រាលៗដើម្បីងាយកាត់ */
                border-top: 6px solid #d32f2f; 
                position: relative; 
                display: flex; flex-direction: column; 
                overflow: hidden; 
                background: white;
                -webkit-print-color-adjust: exact; /* បង្ខំឱ្យព្រីនចេញពណ៌ */
            }

            .ministry { font-size: 7px; font-weight: bold; text-align: center; line-height: 1.2; padding-top: 5px;}
            .school { font-family: 'Moul'; font-size: 8px; color: #d32f2f; text-align: center; margin-top: 2px; }
            
            .photo { 
                width: 28mm; height: 36mm; 
                margin: 2px auto; display: block; 
                object-fit: cover; border: 1px solid #ccc; 
            }
            
            .name-kh { font-family: 'Moul'; font-size: 10px; color: #0d1b3e; text-align: center; margin-top: 4px; }
            .name-en { font-size: 8px; font-weight: bold; color: #d32f2f; text-align: center; text-transform: uppercase; }
            .role { font-size: 8px; text-align: center; color: #555; }
            
            .footer { 
                position: absolute; bottom: 0; width: 100%; 
                background: #0d1b3e; color: white; 
                font-size: 7px; text-align: center; padding: 2px 0; 
            }
            
            /* ផ្នែកខាងក្រោយ */
            .qr-img { width: 35mm; height: 35mm; margin: 8px auto; display: block; }
            .info-back { font-size: 8px; text-align: center; margin-top: 5px; line-height: 1.4; }
        </style>
    `;

    // បង្កើត HTML Content
    let html = `<html><head><title>Print ${side}</title>${css}</head><body>`;
    
    const perPage = 6;
    for (let i = 0; i < allTeachers.length; i += perPage) {
        // កាត់យក ៦ នាក់ម្ដង
        const chunk = allTeachers.slice(i, i + perPage);
        
        html += `<div class="sheet"><div class="grid">`;
        
        chunk.forEach(t => {
            const photo = t.photoUrl || '';
            const school = globalConfig.SCHOOL_NAME || 'សាលារៀន';
            const year = globalConfig.ACADEMIC_YEAR || '2025-2026';
            
            // Link សម្រាប់ QR Code (ចង្អុលទៅ Detail Page វិញ)
            const detailUrl = `${API_URL}?page=detail&id=${encodeURIComponent(t.id)}`;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;

            if (side === 'front') {
                // 👉 HTML សម្រាប់ Print ខាងមុខ
                html += `
                    <div class="id-card-print">
                        <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                        <div class="school">${school}</div>
                        <img src="${photo}" class="photo">
                        <div class="name-kh">${t.khmerName}</div>
                        <div class="name-en">${t.latinName}</div>
                        <div class="role">${t.role}</div>
                        <div class="footer">ឆ្នាំសិក្សា ${year}</div>
                    </div>
                `;
            } else {
                // 👉 HTML សម្រាប់ Print ខាងក្រោយ
                html += `
                    <div class="id-card-print">
                        <div style="padding-top:15px; text-align:center;">
                            <div class="ministry" style="font-family:'Moul'; font-size:10px;">កាតបុគ្គលិក</div>
                        </div>
                        <img src="${qrUrl}" class="qr-img">
                        <div class="info-back">
                            លេខទូរសព្ទ: ${t.phone || '---'}<br>
                            អត្តលេខ: ${t.id}
                        </div>
                        <div class="footer">${school}</div>
                    </div>
                `;
            }
        });

        html += `</div></div>`; // បិទ Grid & Sheet
    }

    html += `</body></html>`;

    // សរសេរចូលផ្ទាំងថ្មី ហើយ Print
    w.document.write(html);
    w.document.close();
    
    // រង់ចាំរូប Load បន្តិចទើប Print (ការពាររូបមិនចេញ)
    w.onload = function() {
        setTimeout(() => { w.print(); }, 1500);
    };
}

function printSingleCard(t, side) {
    // ... (កូដ Print កាតមួយដែលខ្ញុំបានផ្ញើជូនពីមុន) ...
     const w = window.open('', '_blank', 'width=400,height=600');
     // ... ដាក់កូដ HTML សម្រាប់ Print នៅទីនេះ ...
     w.document.write('<h1>Testing Print</h1>'); // ឧទាហរណ៍
}



