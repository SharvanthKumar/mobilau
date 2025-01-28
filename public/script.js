
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

// JavaScript for the search icon, input field, and toggling label functionality

const searchIcon = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchLabel = document.querySelector('.search-label');

searchIcon.addEventListener('click', function(event) {
    event.stopPropagation();
    searchContainer.classList.toggle('active');
    searchLabel.style.display = 'none';
    searchInput.focus();
});

document.addEventListener('click', function(event) {
    if (!searchContainer.contains(event.target)) {
        searchContainer.classList.remove('active');
        searchLabel.style.display = 'block';
    }
});

searchInput.addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const rowText = row.innerText.toLowerCase();
        if (rowText.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

//Card functionality

// window.addEventListener('load', function() {
//     const featuresCard = document.getElementById('featuresCard');
//     const dismissCard = document.getElementById('dismissCard');
    
//     if (!localStorage.getItem('hasSeenFeatures')) {
//         featuresCard.style.display = 'block';
//     }
    
//     dismissCard.addEventListener('click', function() {
//         featuresCard.style.display = 'none';
//         localStorage.setItem('hasSeenFeatures', true);
//     });

//     document.addEventListener('click', function(event) {
//         if (!featuresCard.contains(event.target) && featuresCard.style.display === 'block') {
//             featuresCard.style.display = 'none';
//             localStorage.setItem('hasSeenFeatures', true);
//         }
//     });
// });
