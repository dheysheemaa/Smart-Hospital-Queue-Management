/* =========================================
   MEDICARE+ PATIENT REGISTRATION
   ========================================= */

const form = document.getElementById("patientForm");
const result = document.getElementById("result");
const dashboardBtn = document.getElementById("dashboardBtn");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const mobile = document.getElementById("mobile").value.trim();
        const department = document.getElementById("department").value;
        const priority = document.getElementById("priority").value;

        /* =========================
           VALIDATION
           ========================= */

        if (name.length < 2) {
            showToast("Please enter a valid patient name.");
            return;
        }

        if (age < 1 || age > 120) {
            showToast("Please enter a valid age.");
            return;
        }

        if (mobile.length !== 10) {
            showToast("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!gender || !department) {
            showToast("Please fill all required fields.");
            return;
        }


        /* =========================
           GET EXISTING PATIENTS
           ========================= */

        let patients = JSON.parse(
            localStorage.getItem("patients")
        ) || [];


        /* =========================
           GENERATE TOKEN
           ========================= */

        let nextNumber = 1;

        patients.forEach(function (patient) {

            if (patient.token) {

                const number = parseInt(
                    patient.token.replace(/\D/g, ""),
                    10
                );

                if (!isNaN(number) && number >= nextNumber) {
                    nextNumber = number + 1;
                }
            }

        });

        const token = "A" + String(nextNumber).padStart(3, "0");


        /* =========================
           CREATE PATIENT
           ========================= */

        const patient = {
            token: token,
            name: name,
            age: age,
            gender: gender,
            mobile: mobile,
            department: department,
            priority: priority,
            status: "Waiting",
            time: Date.now()
        };


        /* =========================
           SAVE PATIENT
           ========================= */

        patients.push(patient);

        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );


        /* =========================
           SHOW TOKEN
           ========================= */

        result.innerHTML = `
            <div class="token-success">
                <span class="token-label">YOUR DIGITAL TOKEN</span>
                <strong>${token}</strong>
                <p>
                    ${department} Department
                    <br>
                    Priority: ${priority}
                </p>
            </div>
        `;

        result.style.display = "block";


        /* =========================
           SHOW DASHBOARD BUTTON
           ========================= */

        if (dashboardBtn) {
            dashboardBtn.style.display = "block";
        }


        /* =========================
           SUCCESS MESSAGE
           ========================= */

        if (typeof showToast === "function") {
            showToast(
                "Patient registered successfully! Token: " + token
            );
        }


        /* =========================
           RESET FORM
           ========================= */

        form.reset();

        /* Keep priority as Normal */
        const priorityInput = document.getElementById("priority");

        if (priorityInput) {
            priorityInput.value = "Normal";
        }

    });

}


/* =========================================
   MOBILE NUMBER INPUT
   ========================================= */

const mobileField = document.getElementById("mobile");

if (mobileField) {

    mobileField.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 10) {
            this.value = this.value.substring(0, 10);
        }

    });

}


/* =========================================
   NAME INPUT
   ========================================= */

const nameField = document.getElementById("name");

if (nameField) {

    nameField.addEventListener("input", function () {

        this.value = this.value.replace(
            /[^a-zA-Z\s.]/g,
            ""
        );

    });

}