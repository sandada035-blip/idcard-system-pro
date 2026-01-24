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
function printAll(side) {
    if (allTeachers.length === 0) return alert("គ្មានទិន្នន័យសម្រាប់ Print ទេ!");
    
    // បង្ហាញ Loading តិចតួចអោយដឹង
    const btnText = side === 'front' ? "កំពុងរៀបចំ Front A4..." : "កំពុងរៀបចំ Back A4...";
    console.log(btnText);

    // ... (កូដ Print A4 ដូចដែលខ្ញុំបានផ្ញើជូនពីមុន) ...
    // ដើម្បីកុំអោយវែងពេក ខ្ញុំមិនបានសរសេរម្តងទៀតទេ តែបើត្រូវការប្រាប់ខ្ញុំ
    // សំខាន់គឺត្រូវហៅ window.open()
    
    // កូដសង្ខេបដើម្បី Test:
    alert("Function Print " + side + " ដំណើរការ! សូមដាក់កូដ Print A4 ពេញលេញនៅទីនេះ។");
}

function printSingleCard(t, side) {
    // ... (កូដ Print កាតមួយដែលខ្ញុំបានផ្ញើជូនពីមុន) ...
     const w = window.open('', '_blank', 'width=400,height=600');
     // ... ដាក់កូដ HTML សម្រាប់ Print នៅទីនេះ ...
     w.document.write('<h1>Testing Print</h1>'); // ឧទាហរណ៍
}


