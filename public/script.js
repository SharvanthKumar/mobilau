
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("overlay");
const backArrow = document.getElementById("back-arrow");

hamburger.addEventListener("click", () => {
    sidebar.style.right = "0"; 
    overlay.style.display = "block";
});

const closeSidebar = () => {
    sidebar.style.right = "-250px"; 
    overlay.style.display = "none"; 
};

backArrow.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

