const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// show new quote
function newQuote(){
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API 
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // catch error here  
    }
}
getQuotes();
// tweet quote
function tweetQuote(){
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweeterUrl, '_blank');
}   


newQuoteBtn.addEventListener("click",getQuotes);
twitterBtn.addEventListener("click",tweetQuote);
//một function không đồng bộ có thể chạy bất kỳ lúc nào một cách độc lập
//không ngăn trình duyệt hoàn thành tải trang
//response sẽ không được điền cho đến khi nó có một dữ liệu tìm nạp từ API
//response chỉ được đặt khi thực sự có dữ liệu
//apiQuotes nhận json từ API