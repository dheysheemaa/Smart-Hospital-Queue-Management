/* =========================================
   MEDICARE+ LIVE QUEUE DASHBOARD
   ========================================= */

/* =========================
   ELEMENTS
   ========================= */

const patientTable = document.getElementById("patientTable");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const statusFilter = document.getElementById("statusFilter");

const totalPatients = document.getElementById("totalPatients");
const waitingPatients = document.getElementById("waitingPatients");
const completedPatients = document.getElementById("completedPatients");
const currentToken = document.getElementById("currentToken");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const clock = document.getElementById("clock");

const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");


/* =========================
   LOAD PATIENTS
   ========================= */

let patients = JSON.parse(
    localStorage.getItem("patients")
) || [];


/* =========================
   LOAD DASHBOARD
   ========================= */

function loadDashboard() {

    patients = JSON.parse(
        localStorage.getItem("patients")
    ) || [];

    if (!patientTable) {
        return;
    }


    /* =========================
       COUNTS
       ========================= */

    let waiting = 0;
    let completed = 0;
    let current = null;


    patients.forEach(function (patient) {

        if (patient.status === "Waiting") {
            waiting++;

            if (current === null) {
                current = patient;
            }
        }

        if (patient.status === "Completed") {
            completed++;
        }

    });


    /* =========================
       UPDATE SUMMARY
       ========================= */

    if (totalPatients) {
        totalPatients.textContent = patients.length;
    }

    if (waitingPatients) {
        waitingPatients.textContent = waiting;
    }

    if (completedPatients) {
        completedPatients.textContent = completed;
    }

    if (currentToken) {
        currentToken.textContent =
            current ? current.token : "None";
    }


    /* =========================
       QUEUE PROGRESS
       ========================= */

    let progress = 0;

    if (patients.length > 0) {
        progress =
            (completed / patients.length) * 100;
    }

    if (progressBar) {
        progressBar.style.width =
            progress + "%";
    }

    if (progressText) {
        progressText.textContent =
            Math.round(progress) + "% Completed";
    }


    /* =========================
       FILTER VALUES
       ========================= */

    const search =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const department =
        departmentFilter
            ? departmentFilter.value
            : "All";

    const status =
        statusFilter
            ? statusFilter.value
            : "All";


    /* =========================
       CLEAR TABLE
       ========================= */

    patientTable.innerHTML = "";


    /* =========================
       FILTER PATIENTS
       ========================= */

    const filteredPatients =
        patients.filter(function (patient) {

            const matchesSearch =
                patient.name
                    .toLowerCase()
                    .includes(search) ||
                patient.token
                    .toLowerCase()
                    .includes(search);

            const matchesDepartment =
                department === "All" ||
                patient.department === department;

            const matchesStatus =
                status === "All" ||
                patient.status === status;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            );

        });


    /* =========================
       EMPTY TABLE
       ========================= */

    if (filteredPatients.length === 0) {

        patientTable.innerHTML = `
            <tr>
                <td colspan="8" class="empty-table">
                    No patients found
                </td>
            </tr>
        `;

        return;
    }


    /* =========================
       CREATE TABLE
       ========================= */

    filteredPatients.forEach(function (patient) {

        const waitingTime =
            patient.time
                ? Math.floor(
                    (Date.now() - patient.time) / 60000
                ) + " mins"
                : "0 mins";


        const statusClass =
            patient.status === "Waiting"
                ? "waiting"
                : "completed";


        const priorityClass =
            patient.priority
                ? patient.priority.toLowerCase()
                : "normal";


        const currentClass =
            current &&
            current.token === patient.token &&
            patient.status === "Waiting"
                ? "current-patient"
                : "";


        patientTable.innerHTML += `

            <tr class="${currentClass}">

                <td>
                    <strong>${patient.token}</strong>
                </td>

                <td>
                    <div class="patient-name">
                        ${patient.name}
                    </div>
                </td>

                <td>
                    ${patient.age}
                </td>

                <td>
                    ${patient.department}
                </td>

                <td>
                    <span class="priority-badge ${priorityClass}">
                        ${patient.priority || "Normal"}
                    </span>
                </td>

                <td>
                    <span class="status-badge ${statusClass}">
                        ${patient.status}
                    </span>
                </td>

                <td>
                    ${waitingTime}
                </td>

                <td>
                    ${
                        patient.status === "Waiting"
                            ? `
                                <button
                                    class="complete-btn"
                                    onclick="completePatient('${patient.token}')"
                                >
                                    Complete
                                </button>
                              `
                            : `
                                <span class="completed-text">
                                    ✓ Done
                                </span>
                              `
                    }
                </td>

            </tr>

        `;

    });

}


/* =========================
   COMPLETE PATIENT
   ========================= */

function completePatient(token) {

    patients =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    const patient =
        patients.find(function (item) {
            return item.token === token;
        });


    if (!patient) {
        return;
    }


    patient.status = "Completed";


    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    loadDashboard();


    if (typeof showToast === "function") {
        showToast(
            "Patient " + token + " marked as completed."
        );
    }

}


/* =========================
   SEARCH
   ========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        loadDashboard
    );

}


/* =========================
   DEPARTMENT FILTER
   ========================= */

if (departmentFilter) {

    departmentFilter.addEventListener(
        "change",
        loadDashboard
    );

}


/* =========================
   STATUS FILTER
   ========================= */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        loadDashboard
    );

}


/* =========================
   RESET QUEUE
   ========================= */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function () {

            const confirmReset =
                confirm(
                    "Are you sure you want to reset the entire queue?"
                );


            if (!confirmReset) {
                return;
            }


            localStorage.removeItem("patients");


            patients = [];


            loadDashboard();


            if (typeof showToast === "function") {
                showToast(
                    "Queue has been reset successfully."
                );
            }

        }
    );

}


/* =========================
   EXPORT CSV
   ========================= */

if (exportBtn) {

    exportBtn.addEventListener(
        "click",
        exportCSV
    );

}


function exportCSV() {

    patients =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];


    if (patients.length === 0) {

        if (typeof showToast === "function") {
            showToast("No patient data available.");
        }

        return;
    }


    let csv =
        "Token,Name,Age,Gender,Mobile,Department,Priority,Status,Time\n";


    patients.forEach(function (patient) {

        const row = [
            patient.token,
            patient.name,
            patient.age,
            patient.gender,
            patient.mobile,
            patient.department,
            patient.priority || "Normal",
            patient.status,
            patient.time
                ? new Date(patient.time).toLocaleString()
                : ""
        ];


        csv += row
            .map(function (value) {

                return `"${String(value).replace(/"/g, '""')}"`;

            })
            .join(",") + "\n";

    });


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;
    link.download =
        "medicare-queue-report.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    if (typeof showToast === "function") {
        showToast(
            "Queue report exported successfully."
        );
    }

}


/* =========================
   LIVE CLOCK
   ========================= */

function updateClock() {

    if (!clock) {
        return;
    }


    const now = new Date();


    clock.textContent =
        now.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ) +
        " • " +
        now.toLocaleTimeString(
            "en-IN"
        );

}


updateClock();


setInterval(
    updateClock,
    1000
);


/* =========================
   AUTO REFRESH
   ========================= */

setInterval(
    loadDashboard,
    30000
);


/* =========================
   INITIAL LOAD
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

    }
);