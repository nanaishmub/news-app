// API = https://newsapi.org/s/nigeria-news-api

const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
// ng stands for nigeria
const country = "ng";
const options = [
    "general", 
    "entertainment", 
    "health", 
    "science", 
    "sports", 
    "technology"
];

//100 requests per day
let requestURL;

//generate cards from data
const generateUI = (articles) => {
    for(let item of articles){
        let card = document.createElement("div");
        card.classList.add("new-card");
        card.innerHTML = `
            <div class="news-image-container">
                <img src="${item.urlToImage || "./newspaper.jpg"}>
            </div>
            <div class="new-content">
                <div class="news-title">
                    ${item.title}
                </div>
                <div class="new-description">
                    ${item.description || item.content || ""}
                </div>
                <a href="${item.url}" targert="_blank" class="view-button">Reead More</a>
            </div>`;
        container.appendChild(card);
    }
};

//News API call
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if(!response.ok){
        alert("Data unavailable at the moment. Please try again later");
        return false;
    };
    let data = await response.json();
    generateUI(data.articles);
}

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
}

//Uncaught ReferenceError means there's prolly a spelling mistake somewhere in the code. JavaScript is case-sensitive