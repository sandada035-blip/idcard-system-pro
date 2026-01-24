// ⚠️ សំខាន់៖ សូមយក URL ដែលអ្នកបាន Deploy នៅជំហានទី ១ មកដាក់ត្រង់នេះ
const API_URL = "https://script.google.com/macros/s/AKfycbwSbCRDF1lhxwDcxtsAMJ-N8HVDytPrhPJNKRZoMyJ459YnKjS8hQqKopjYGb-RPPEJ/exec"; 

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

async function fetchData() {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('cardGrid');

    try {
        // ទាញទិន្នន័យពី Google Script
        const response = await fetch(API_URL);
        const json = await response.json();

        if (!json.success) throw new Error("API Error");

        const teachers = json.data;
        const config = json.config || {};

        loading.style.display = 'none'; // បិទ Loading

        // បង្កើតកាត
        teachers.forEach(t => {
            const card = createCard(t, config);
            grid.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        loading.innerHTML = `<span style="color:red">មានបញ្ហាក្នុងការទាញទិន្នន័យ!<br>សូមពិនិត្យមើល Internet</span>`;
    }
}

function createCard(t, config) {
    const div = document.createElement('div');
    div.className = 'id-card';

    // រូបថត (បើគ្មាន ដាក់រូបតំណាង)
    const photo = t.photoUrl ? t.photoUrl : 'https://via.placeholder.com/150?text=No+Img';
    const school = config.SCHOOL_NAME || "សាលាបឋមសិក្សា";
    const year = config.ACADEMIC_YEAR || "2025-2026";

    div.innerHTML = `
        <div class="card-header">
            <div class="ministry">ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div class="ministry">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
            <div class="school-name">${school}</div>
        </div>
        <div class="photo-box">
            <img src="${photo}" alt="Photo">
        </div>
        <div class="card-body">
            <div class="khmer-name">${t.khmerName || 'ឈ្មោះ'}</div>
            <div class="latin-name">${t.latinName || 'NAME'}</div>
            <div>
                <span class="role-badge">${t.role || 'បុគ្គលិក'}</span>
            </div>
            <div style="font-size:11px; color:#555; margin-top:5px;">ID: ${t.id}</div>
        </div>
        <div class="card-footer">
            ឆ្នាំសិក្សា ${year}
        </div>
    `;
    return div;
}