
document.getElementById('searchButton').addEventListener('click', fetchNews);

async function fetchNews() {
    const apiKey = 'YlKo56Y39tACVfqGB93UQWwAoMd0tkiq';
    const query = document.getElementById('searchQuery').value;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.response.docs);
    } catch (error) {
        console.error('Error fetching news data:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const imageUrl = article.multimedia && article.multimedia.length > 0
            ? `https://www.nytimes.com/${article.multimedia[0].url}`
            : '';

        newsItem.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="${article.headline.main}" class="news-image">` : ''}
            <h2>${article.headline.main}</h2>
            <p>${article.snippet}</p>
            <a href="${article.web_url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}
