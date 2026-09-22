const form = document.getElementById("patientForm");
const result = document.getElementById("result");
form.addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let mobile = document.getElementById("mobile").value;
    let department = document.getElementById("department").value;
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let token = "A" + String(patients.length + 1).padStart(3,"0");
    let patient = {
        token: token,
        name: name,
        age: age,
        gender: gender,
        mobile: mobile,
        department: department,
        status: "Waiting",
        time: Date.now()
    };
    patients.push(patient);
    localStorage.setItem("patients",JSON.stringify(patients));
    result.innerHTML="✅ Token Generated : <br><br>" + token;
    form.reset();
});