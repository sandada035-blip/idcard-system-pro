// ⚠️ ដាក់ URL API របស់អ្នកនៅទីនេះ
const API_URL = "https://script.google.com/macros/s/AKfycbwSbCRDF1lhxwDcxtsAMJ-N8HVDytPrhPJNKRZoMyJ459YnKjS8hQqKopjYGb-RPPEJ/exec"; 

let allTeachers = [];
let globalConfig = {};
let currentMode = 'front'; // 'front' or 'back'

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
        renderCards(allTeachers);
    } catch (error) {
        console.error(error);
        loading.innerHTML = "Error loading data!";
    }
}

// ✅ Function ប្តូរ Mode (មុខ/ក្រោយ)
function switchMode(mode) {
    currentMode = mode;
    
    // Update Button Style
    document.getElementById('btnFront').className = mode === 'front' ? 'btn btn-blue active' : 'btn btn-blue';
    document.getElementById('btnBack').className = mode === 'back' ? 'btn btn-red active' : 'btn btn-red';
    
    // Filter and Render again
    filterCards();
}

function filterCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allTeachers.filter(t => 
        (t.khmerName || '').toLowerCase().includes(input) || 
        (t.id || '').includes(input)
    );
    renderCards(filtered);
}

function renderCards(list) {
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = '';
    list.forEach(t => grid.appendChild(createCard(t, globalConfig)));
}

function createCard(t, config) {
    const div = document.createElement('div');
    div.className = 'id-card';

    const photo = t.photoUrl || 'https://via.placeholder.com/150';
    const school = config.SCHOOL_NAME || "សាលារៀន";
    const year = config.ACADEMIC_YEAR || "2025-2026";
    
    // បង្កើត QR Link
    const detailUrl = `${API_URL}?page=detail&id=${t.id}`; // ឬ Link ផ្សេង
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;

    if (currentMode === 'front') {
        // 👉 បង្ហាញខាងមុខ
        div.innerHTML = `
            <div class="card-header">
                <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា</div>
                <div class="ministry">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                <div class="school-name">${school}</div>
            </div>
            <div class="photo-box"><img src="${photo}"></div>
            <div class="card-body">
                <div class="khmer-name">${t.khmerName || ''}</div>
                <div class="latin-name">${t.latinName || ''}</div>
                <div class="role-badge">${t.role || 'គ្រូបង្រៀន'}</div>
            </div>
            <div class="card-footer">ឆ្នាំសិក្សា ${year}</div>
        `;
    } else {
        // 👉 បង្ហាញខាងក្រោយ
        div.innerHTML = `
            <div class="card-header">
                <div class="ministry" style="font-family:'Moul'; margin-top:10px;">កាតបុគ្គលិក</div>
            </div>
            <div class="qr-box"><img src="${qrUrl}"></div>
            <div class="card-body">
                <div class="back-info">
                    លេខទូរសព្ទ: ${t.phone || '---'}<br>
                    អត្តលេខ: ${t.id}
                </div>
            </div>
            <div class="card-footer">${school}</div>
        `;
    }
    return div;
}

// ✅ Function សម្រាប់ Print A4 All (បង្កើត HTML ថ្មី)
function printAll(side) {
    const w = window.open('', '_blank');
    
    // CSS សម្រាប់ A4 Print
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap');
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: #fff; font-family: 'Siemreap', sans-serif; }
            .sheet { width: 210mm; height: 297mm; padding: 10mm; page-break-after: always; display: block; box-sizing: border-box; }
            .grid { display: grid; grid-template-columns: repeat(2, 54mm); grid-auto-rows: 86mm; gap: 12mm 16mm; justify-content: center; align-content: start; }
            
            /* Card Style in Print */
            .id-card { width: 54mm; height: 86mm; border: 1px solid #eee; border-top: 6px solid #d32f2f; position: relative; display: flex; flex-direction: column; overflow: hidden; }
            .ministry { font-size: 7px; font-weight: bold; text-align: center; line-height: 1.2; }
            .school { font-family: 'Moul'; font-size: 8px; color: #d32f2f; text-align: center; margin-top: 2px; }
            .photo { width: 28mm; height: 36mm; margin: 2px auto; display: block; object-fit: cover; border: 1px solid #ccc; }
            .name-kh { font-family: 'Moul'; font-size: 10px; color: #0d1b3e; text-align: center; margin-top: 4px; }
            .name-en { font-size: 8px; font-weight: bold; color: #d32f2f; text-align: center; text-transform: uppercase; }
            .role { font-size: 8px; text-align: center; color: #555; }
            .footer { position: absolute; bottom: 0; width: 100%; background: #0d1b3e; color: white; font-size: 7px; text-align: center; padding: 2px 0; }
            
            /* Back Side */
            .qr-img { width: 35mm; height: 35mm; margin: 8px auto; display: block; }
            .info-back { font-size: 8px; text-align: center; margin-top: 5px; line-height: 1.4; }
        </style>
    `;

    // បង្កើត HTML Content
    let html = `<html><head><title>Print ${side}</title>${css}</head><body>`;
    
    const perPage = 6;
    for (let i = 0; i < allTeachers.length; i += perPage) {
        const chunk = allTeachers.slice(i, i + perPage);
        
        html += `<div class="sheet"><div class="grid">`;
        
        chunk.forEach(t => {
            const photo = t.photoUrl || '';
            const school = globalConfig.SCHOOL_NAME || 'SCHOOL NAME';
            const year = globalConfig.ACADEMIC_YEAR || '2025-2026';
            const detailUrl = `${API_URL}?page=detail&id=${t.id}`;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(detailUrl)}`;

            if (side === 'front') {
                html += `
                    <div class="id-card">
                        <div style="padding-top:8px;">
                            <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                            <div class="school">${school}</div>
                        </div>
                        <img src="${photo}" class="photo">
                        <div class="name-kh">${t.khmerName}</div>
                        <div class="name-en">${t.latinName}</div>
                        <div class="role">${t.role}</div>
                        <div class="footer">ឆ្នាំសិក្សា ${year}</div>
                    </div>
                `;
            } else {
                html += `
                    <div class="id-card">
                        <div style="padding-top:15px; text-align:center;">
                            <div class="ministry" style="font-family:'Moul'; font-size:10px;">កាតបុគ្គលិក</div>
                        </div>
                        <img src="${qrUrl}" class="qr-img">
                        <div class="info-back">
                            លេខទូរសព្ទ: ${t.phone || ''}<br>
                            អត្តលេខ: ${t.id}
                        </div>
                        <div class="footer">${school}</div>
                    </div>
                `;
            }
        });

        html += `</div></div>`; // End Grid & Sheet
    }

    html += `</body></html>`;

    w.document.write(html);
    w.document.close();
    
    // រង់ចាំរូប Load បន្តិចទើប Print
    w.onload = function() {
        setTimeout(() => { w.print(); }, 1000);
    };
}
