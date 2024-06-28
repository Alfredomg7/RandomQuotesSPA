// Get a random quote from the quotable API
async function fetchRandomQuote(maxLength, minLength) {
    const baseUrl = "https://api.quotable.io/random";
    const url = new URL(baseUrl);

    // Add query parameters to the URL if any
    if (maxLength) url.searchParams.append("maxLength", maxLength);
    if (minLength) url.searchParams.append("minLength", minLength);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No matching quote found");
        }
        const data = await response.json();
        return { quote: data.content, author: data.author };
    } catch (error) {
        if (error instanceof TypeError) {
            alert("Failed to fetch a quote. Please check your internet connection");
        } else {
            alert("Failed to fetch a quote. Please try again later");
        }
    }
}

// Generate a random quote and update the DOM with the quote
async function getRandomQuote() {
    const button = document.getElementById("getQuoteBtn");
    button.disabled = true;

    try {
        const { quote, author } = await fetchRandomQuote(100, 50);
        const quoteElement = document.getElementById("quote");
        const authorElement = document.getElementById("author");
        const quoteContainer = document.getElementById("quoteContainer");

        quoteElement.innerHTML = quote;
        authorElement.innerHTML = "- " + author;

        quoteContainer.classList.remove("quoteAnimation");
        void quoteContainer.offsetWidth;
        quoteContainer.classList.add("quoteAnimation");
    } catch {
        console.error("Failed to fetch a quote");
    } finally {
        button.disabled = false;
    }
}

const button = document.getElementById("getQuoteBtn");
button.addEventListener("click", getRandomQuote);