const toggle = document.getElementById("themeToggle");
const ball = document.querySelector(".toggle-ball");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    toggle.checked = true; 
    ball.textContent = "🌙";
}
toggle.addEventListener("change",()=>{
    document.body.classList.toggle("dark");
    if(toggle.checked){
        ball.textContent="🌙";
        localStorage.setItem("theme","dark");
    }
    else{
        ball.textContent="☀️";
        localStorage.setItem("theme","light");
    }
});
const toggle = document.getElementryById("themeToggle");
const ball = document.querySelector(".toggle-ball");
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    toggle.checked=true;
    ball.textContent="🌙";
}
toggle.addEventListener("change",()=>{
    document.body.classList.toggle("dark");
    if(toggle.checked){
        ball.textContent="🌙";
        localStorage.setItem("theme",)
    }
})