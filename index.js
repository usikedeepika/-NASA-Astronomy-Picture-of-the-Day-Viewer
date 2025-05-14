// script.js



const API_KEY = "P1mZyO9euNakBpP2g81bDQGfSNkgy9Ugr2lB992f";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageTitle = document.getElementById("image-title");
const image = document.getElementById("image");
const imageDescription = document.getElementById("image-description");
const searchHistoryList = document.getElementById("search-history");

// Get today's image when the page loads
window.onload = getCurrentImageOfTheDay;

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedDate = searchInput.value;
    if (selectedDate) {
        getImageOfTheDay(selectedDate);
        saveSearch(selectedDate);
        addSearchToHistory();
    }
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`)
        .then(response => response.json())
        .then(data => displayImage(data))
        .catch(error => console.error("Error fetching current image:", error));
    addSearchToHistory();
}

function getImageOfTheDay(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
        .then(response => response.json())
        .then(data => displayImage(data))
        .catch(error => console.error("Error fetching image:", error));
}

function displayImage(data) {
    imageTitle.textContent = `${data.title} `;
     const searches = JSON.parse(localStorage.getItem("searches")) || [];
     if(searches.length==0){
        document.getElementById("heading-class").textContent="NASA picture of the Day";
     }
     else{
         document.getElementById("heading-class").textContent=`Picture of the ${data.date}`;
     }
    image.src = data.url;
    image.alt = data.title;
    imageDescription.textContent = data.explanation;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searchHistoryList.innerHTML = "";
    searches.forEach(date => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = date;
        link.addEventListener("click", (event) => {
            event.preventDefault();
            getImageOfTheDay(date);
        });
        listItem.appendChild(link);
        searchHistoryList.appendChild(listItem);
    });
}
