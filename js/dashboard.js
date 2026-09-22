// ===============================
// Dashboard Elements
// ===============================
const patientTable = document.getElementById("patientTable");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
let patients = JSON.parse(localStorage.getItem("patients")) || [];
// ===============================
// Load Dashboard
// ===============================
loadDashboard();
if (searchInput) {
    searchInput.addEventListener("keyup", loadDashboard);
}
if (departmentFilter) {
    departmentFilter.addEventListener("change", loadDashboard);
}
function loadDashboard() {
    patients = JSON.parse(localStorage.getItem("patients")) || [];
    patientTable.innerHTML = "";
    let waiting = 0;
    let completed = 0;
    let current = null;
    let search = searchInput ? searchInput.value.toLowerCase() : "";
    let department = departmentFilter ? departmentFilter.value : "All";
    patients.forEach(patient => {
        if (patient.status === "Waiting") waiting++;
        if (patient.status === "Completed") completed++;
        if (current === null && patient.status === "Waiting") {
            current = patient;
        }
        if (
            patient.name.toLowerCase().includes(search) &&
            (department === "All" || patient.department === department)
        ) {
            patientTable.innerHTML += `
                <tr>
                    <td>${patient.token}</td>
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.department}</td>
                    <td>${
                       patient.time
                          ? Math.floor((Date.now() - patient.time) / 60000) + " mins"
                          : "0 mins"
                    }</td>                    
                    <td>${patient.status}</td>
                </tr>
            `;
        }

    });
    document.getElementById("totalPatients").innerText = patients.length;
    document.getElementById("waitingPatients").innerText = waiting;
    document.getElementById("completedPatients").innerText = completed;
    document.getElementById("currentToken").innerText =
        current ? current.token : "None";
}
// Queue Progress
let progress = 0;
if (patients.length > 0) {
    progress = (completed / patients.length) * 100;
}
const progressBar = document.getElementById("progressBar");
if (progressBar) {
    progressBar.style.width = progress + "%";
}
// ===============================
// Reset Queue
// ===============================
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.addEventListener("click", function () {
        const confirmReset = confirm("Are you sure you want to reset the queue?");
        if (confirmReset) {
            localStorage.removeItem("patients");
            showToast("Queue Reset Successfully!");
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    });
}
// ===============================
// Export CSV
// ===============================
const exportBtn = document.getElementById("exportBtn");
if (exportBtn) {
    exportBtn.addEventListener("click", exportCSV);
}
function exportCSV() {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let csv = "Token,Name,Age,Gender,Mobile,Department,Status\n";
    patients.forEach(patient => {
        csv += `${patient.token},${patient.name},${patient.age},${patient.gender},${patient.mobile},${patient.department},${patient.status}\n`;
    });
    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "patients.csv";
    a.click();
}
// ===============================
// Live Clock
// ===============================
function updateClock() {
    const clock = document.getElementById("clock");
    if (clock) {
        clock.innerText = new Date().toLocaleString();
    }
}
setInterval(updateClock, 1000);
updateClock();
// ===============================
// Toast Notification
// ===============================
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}