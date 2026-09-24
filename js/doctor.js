/* =========================================
   MEDICARE+ DOCTOR PAGE
   ========================================= */

/* =========================
   DOCTOR DATA
   ========================= */

const doctors = [
    {
        name: "Dr. Arun Kumar",
        department: "General Medicine",
        specialization: "General Physician",
        experience: "10+ Years",
        availability: "Available",
        image: "assets/doctor.png"
    },
    {
        name: "Dr. Priya Sharma",
        department: "ENT",
        specialization: "ENT Specialist",
        experience: "8+ Years",
        availability: "Available",
        image: "assets/doctor.png"
    },
    {
        name: "Dr. Rahul Menon",
        department: "Dental",
        specialization: "Dental Specialist",
        experience: "7+ Years",
        availability: "Available",
        image: "assets/doctor.png"
    },
    {
        name: "Dr. Meena Raj",
        department: "Eye",
        specialization: "Ophthalmologist",
        experience: "9+ Years",
        availability: "Busy",
        image: "assets/doctor.png"
    },
    {
        name: "Dr. Karthik Anand",
        department: "Cardiology",
        specialization: "Cardiologist",
        experience: "12+ Years",
        availability: "Available",
        image: "assets/doctor.png"
    }
];


/* =========================
   LOAD DOCTORS
   ========================= */

const doctorContainer =
    document.getElementById("doctorContainer");

const doctorFilter =
    document.getElementById("doctorFilter");


function loadDoctors() {

    if (!doctorContainer) {
        return;
    }

    const selectedDepartment =
        doctorFilter
            ? doctorFilter.value
            : "All";

    const filteredDoctors =
        doctors.filter(function (doctor) {

            return (
                selectedDepartment === "All" ||
                doctor.department === selectedDepartment
            );

        });


    doctorContainer.innerHTML = "";


    if (filteredDoctors.length === 0) {

        doctorContainer.innerHTML = `
            <div class="no-doctors">
                <h3>No doctors found</h3>
                <p>No doctor is available for this department.</p>
            </div>
        `;

        return;
    }


    filteredDoctors.forEach(function (doctor) {

        const availabilityClass =
            doctor.availability === "Available"
                ? "available"
                : "busy";


        doctorContainer.innerHTML += `

            <div class="doctor-card">

                <div class="doctor-image">

                    <img
                        src="${doctor.image}"
                        alt="${doctor.name}"
                    >

                    <span class="doctor-status ${availabilityClass}">
                        ${doctor.availability}
                    </span>

                </div>


                <div class="doctor-info">

                    <h3>${doctor.name}</h3>

                    <p class="doctor-specialization">
                        ${doctor.specialization}
                    </p>

                    <p class="doctor-department">
                        🏥 ${doctor.department}
                    </p>

                    <p class="doctor-experience">
                        ⏳ ${doctor.experience}
                    </p>

                    <div class="doctor-footer">

                        <span class="${availabilityClass}">
                            ● ${doctor.availability}
                        </span>

                        <button
                            class="doctor-btn"
                            onclick="viewDoctor('${doctor.name}')"
                        >
                            View Profile
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


/* =========================
   FILTER
   ========================= */

if (doctorFilter) {

    doctorFilter.addEventListener(
        "change",
        loadDoctors
    );

}


/* =========================
   VIEW DOCTOR
   ========================= */

function viewDoctor(name) {

    const doctor =
        doctors.find(function (item) {
            return item.name === name;
        });


    if (!doctor) {
        return;
    }


    const message =
        doctor.name +
        "\n\n" +
        doctor.specialization +
        "\n" +
        doctor.department +
        "\n" +
        "Experience: " +
        doctor.experience +
        "\n" +
        "Status: " +
        doctor.availability;


    alert(message);

}


/* =========================
   DOCTOR COUNT
   ========================= */

const doctorCount =
    document.getElementById("doctorCount");

if (doctorCount) {

    doctorCount.textContent =
        doctors.length + "+";

}


/* =========================
   AVAILABLE DOCTOR COUNT
   ========================= */

const availableDoctorCount =
    document.getElementById("availableDoctorCount");

if (availableDoctorCount) {

    const available =
        doctors.filter(function (doctor) {
            return doctor.availability === "Available";
        }).length;

    availableDoctorCount.textContent =
        available;

}


/* =========================
   INITIAL LOAD
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {
        loadDoctors();
    }
);