// ⚠️ ដាក់ URL API របស់អ្នកនៅទីនេះ
const API_URL = "https://script.google.com/macros/s/AKfycbwSbCRDF1lhxwDcxtsAMJ-N8HVDytPrhPJNKRZoMyJ459YnKjS8hQqKopjYGb-RPPEJ/exec"; 

let allTeachers = [];
let globalConfig = {};

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

async function fetchData() {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('cardGrid');

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

function renderCards(list) {
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = '';
    list.forEach(t => grid.appendChild(createCard(t, globalConfig)));
}

function filterCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allTeachers.filter(t => 
        (t.khmerName || '').toLowerCase().includes(input) || 
        (t.id || '').includes(input)
    );
    renderCards(filtered);
}

// ✅ បង្កើតកាតដែលមានប៊ូតុង Print
function createCard(t, config) {
    const div = document.createElement('div');
    div.className = 'id-card';

    const photo = t.photoUrl || 'https://via.placeholder.com/150';
    const school = config.SCHOOL_NAME || "សាលារៀន";
    const year = config.ACADEMIC_YEAR || "2025-2026";

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
        
        <div class="card-actions">
            <button class="btn-action btn-blue" onclick='printSingleCard(${JSON.stringify(t)}, "front")'>Print មុខ</button>
            <button class="btn-action btn-red" onclick='printSingleCard(${JSON.stringify(t)}, "back")'>Print ក្រោយ</button>
        </div>

        <div class="card-footer">ឆ្នាំសិក្សា ${year}</div>
    `;
    return div;
}

// ✅ Function សម្រាប់ Print កាតមួយៗ (បើក Window ថ្មី)
function printSingleCard(t, side) {
    const w = window.open('', '_blank', 'width=400,height=600');
    
    // បង្កើត QR Link សម្រាប់ខាងក្រោយ
    const qrData = `ID:${t.id}|Name:${t.latinName}`; // ឬដាក់ Link Web App របស់អ្នក
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
    
    // CSS សម្រាប់ពេល Print
    const css = `
        <style>
            @page { size: 54mm 86mm; margin: 0; }
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Siemreap', sans-serif;}
            .id-card {
                width: 54mm; height: 86mm; border: 1px solid #ddd; border-top: 6px solid #d32f2f;
                display: flex; flex-direction: column; text-align: center; position: relative;
            }
            .ministry { font-size: 7px; font-weight: bold; margin-top: 5px; }
            .photo { width: 28mm; height: 36mm; margin: 2px auto; object-fit: cover; border: 1px solid #eee; }
            .name { font-family: 'Moul'; font-size: 10px; color: #0d1b3e; margin-top: 5px; }
            .role { font-size: 8px; color: #555; }
            .footer { position: absolute; bottom: 0; width: 100%; background: #0d1b3e; color: white; font-size: 7px; padding: 2px 0; }
            .qr-img { width: 35mm; height: 35mm; margin-top: 15px; }
            /* Hide buttons when printing */
            button { display: none; }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Moul&family=Siemreap&display=swap" rel="stylesheet">
    `;

    let htmlContent = '';

    if (side === 'front') {
        htmlContent = `
            <div class="id-card">
                <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា<br>ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                <div style="font-size:8px; color:#d32f2f; margin-top:2px;">${globalConfig.SCHOOL_NAME || ''}</div>
                <img src="${t.photoUrl}" class="photo">
                <div class="name">${t.khmerName}</div>
                <div style="font-size:8px; font-weight:bold; color:#d32f2f; text-transform:uppercase;">${t.latinName}</div>
                <div class="role">${t.role}</div>
                <div class="footer">ឆ្នាំសិក្សា ${globalConfig.ACADEMIC_YEAR || ''}</div>
            </div>
        `;
    } else {
        htmlContent = `
            <div class="id-card">
                <div class="ministry" style="font-family:'Moul'; margin-top:10px;">កាតបុគ្គលិក</div>
                <img src="${qrUrl}" class="qr-img">
                <div style="font-size:8px; margin-top:10px;">
                    លេខទូរសព្ទ: ${t.phone || '---'}<br>
                    អត្តលេខ: ${t.id}
                </div>
                <div class="footer">${globalConfig.SCHOOL_NAME || ''}</div>
            </div>
        `;
    }

    w.document.write(`<html><head><title>Print Card</title>${css}</head><body>${htmlContent}</body></html>`);
    w.document.close();
    
    // រង់ចាំរូប Load ចប់សិនចាំ Print
    w.onload = function() {
        setTimeout(() => {
            w.print();
            w.close();
        }, 500);
    };
}

