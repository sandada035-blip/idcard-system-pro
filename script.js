// ⚠️ ដាក់ URL របស់អ្នកនៅទីនេះ
const API_URL = "https://script.google.com/macros/s/AKfycbwSbCRDF1lhxwDcxtsAMJ-N8HVDytPrhPJNKRZoMyJ459YnKjS8hQqKopjYGb-RPPEJ/exec"; 

let allTeachers = []; // រក្សាទុកទិន្នន័យដើម្បីស្វែងរក
let globalConfig = {};

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

async function fetchData() {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('cardGrid');
    const stats = document.getElementById('stats');

    // Reset UI
    grid.innerHTML = '';
    loading.style.display = 'block';
    stats.innerText = '';

    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        if (!json.success) throw new Error("API Error");

        allTeachers = json.data; // រក្សាទុកក្នុង Memory
        globalConfig = json.config || {};

        loading.style.display = 'none';
        
        // បង្ហាញកាតទាំងអស់ដំបូង
        renderCards(allTeachers);

    } catch (error) {
        console.error(error);
        loading.innerHTML = `<span style="color:red">មានបញ្ហាក្នុងការទាញទិន្នន័យ!</span>`;
    }
}

// Function បង្ហាញកាត
function renderCards(teachersList) {
    const grid = document.getElementById('cardGrid');
    const stats = document.getElementById('stats');
    grid.innerHTML = ''; // លុបកាតចាស់ចោលសិន

    stats.innerText = `បង្ហាញចំនួន: ${teachersList.length} នាក់`;

    if(teachersList.length === 0) {
        grid.innerHTML = '<p>រកមិនឃើញទិន្នន័យ!</p>';
        return;
    }

    teachersList.forEach(t => {
        const card = createCard(t, globalConfig);
        grid.appendChild(card);
    });
}

// Function ស្វែងរក (Filter)
function filterCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    // ស្វែងរកតាម ឈ្មោះខ្មែរ, ឡាតាំង, ឬ អត្តលេខ
    const filtered = allTeachers.filter(t => {
        const khName = (t.khmerName || '').toLowerCase();
        const enName = (t.latinName || '').toLowerCase();
        const id = (t.id || '').toString();
        
        return khName.includes(input) || enName.includes(input) || id.includes(input);
    });

    renderCards(filtered);
}

function createCard(t, config) {
    const div = document.createElement('div');
    div.className = 'id-card';

    const photo = t.photoUrl ? t.photoUrl : 'https://via.placeholder.com/150?text=No+Img';
    const school = config.SCHOOL_NAME || "សាលារៀន";
    const year = config.ACADEMIC_YEAR || "2025-2026";

    div.innerHTML = `
        <div class="card-header">
            <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div class="ministry">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            <div class="school-name">${school}</div>
        </div>
        <div class="photo-box">
            <img src="${photo}" alt="Photo" loading="lazy">
        </div>
        <div class="card-body">
            <div class="khmer-name">${t.khmerName || '---'}</div>
            <div class="latin-name">${t.latinName || '---'}</div>
            <div><span class="role-badge">${t.role || 'បុគ្គលិក'}</span></div>
            <div style="font-size:11px; color:#555; margin-top:5px;">ID: ${t.id}</div>
        </div>
        <div class="card-footer">ឆ្នាំសិក្សា ${year}</div>
    `;
    return div;
}
