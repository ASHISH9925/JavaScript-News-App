const apikey = 'YOUR_API_KEY_HERE';

const blogContainer = document.getElementById("blog-container");

const SearchField = document.getElementById("Search-input");
const Searchbutton = document.getElementById("Search-button");

async function fetchRandom() {
    try {
        const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error getting news data", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const image = document.createElement("img");
        image.src = article.urlToImage;
        image.alt = article.title;
        const title = document.createElement("h2");

        const truncatedtitle = article.title.length > 50 ? 
            article.title.slice(0, 50) + "...." :
            article.title;

        title.textContent = truncatedtitle;
        const description = document.createElement("p");

        const truncateddescription = article.description.length > 120 ? 
            article.description.slice(0, 120) + "...." :
            article.description;

        description.textContent = truncateddescription;

        blogCard.appendChild(image);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);

        blogCard.addEventListener('click', () => {
            window.open(article.url, "blank");
        });
    });
}

(async () => {
    try {
        const articles = await fetchRandom();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error getting news data", error);
        return [];
    }
})();

async function fetchNewsQuery(query) {
    try {
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error getting news data", error);
        return [];
    }
}

Searchbutton.addEventListener('click', async () => {
    const query = SearchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error getting news data", error);
        }
    }
});
