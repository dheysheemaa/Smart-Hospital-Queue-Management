const doctorTable = document.getElementById("doctorTable");
let patients = JSON.parse(localStorage.getItem("patients")) || [];
displayPatients();
function displayPatients(){
    doctorTable.innerHTML = "";
    patients.forEach((patient,index)=>{
        doctorTable.innerHTML += `
        <tr>
            <td>${patient.token}</td>
            <td>${patient.name}</td>
            <td>${patient.department}</td>
            <td>${patient.status}</td>
            <td>
<button onclick="completePatient(${index})">
Complete
</button>
<button onclick="skipPatient(${index})">
Skip
</button>
<button onclick="emergencyPatient(${index})">
Emergency
</button>
</td>
        </tr>
        `;
    });
}
function completePatient(index){
    patients[index].status = "Completed";
    localStorage.setItem("patients",JSON.stringify(patients));
    displayPatients();
}
function callNext(){
    let waitingPatient = patients.find(patient => patient.status === "Waiting");
    if(waitingPatient){
        document.getElementById("currentToken").innerText = waitingPatient.token;
    }
    else{
        document.getElementById("currentToken").innerText = "No Patients";
    }
}
function skipPatient(index){
    let skipped = patients.splice(index,1)[0];
    patients.push(skipped);
    localStorage.setItem("patients",JSON.stringify(patients));
    displayPatients();
}
function emergencyPatient(index){
    let emergency = patients.splice(index,1)[0];
    patients.unshift(emergency);
    localStorage.setItem("patients",JSON.stringify(patients));
    displayPatients();
}