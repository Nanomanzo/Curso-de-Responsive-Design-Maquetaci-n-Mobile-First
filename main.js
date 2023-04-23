fetch('http://worldtimeapi.org/api/ip')
  .then(response => response.json())
  .then(data => {
    const currentDate = new Date(data.datetime);
    const formattedDate = currentDate.toLocaleDateString();
    const elements = document.getElementsByClassName('current-date');
    for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = formattedDate;
    }
  })
  .catch(error => console.error(error));

/*API crypto*/
function updateCryptoPrice(id, cryptoName, decimals) {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`)
    .then(response => response.json())
    .then(data => {
      const cryptoPrice = data[cryptoName].usd;
      const formattedPrice = `$ ${cryptoPrice.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      document.getElementById(id).textContent = formattedPrice;
    })
    .catch(error => console.error(error));
}
  
updateCryptoPrice('table__bitcoin', 'bitcoin', 1);
updateCryptoPrice('table__ethereum', 'ethereum', 1);
updateCryptoPrice('table__solana', 'solana', 1);
updateCryptoPrice('table__stellar', 'stellar', 2);



const cryptoIds = ["bitcoin", "ethereum", "solana", "stellar"];

cryptoIds.forEach(cryptoId => {
fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=1`)
  .then(response => response.json())
  .then(data => {
    const prices = data.prices;
    const currentPrice = prices[prices.length - 1][1];
    const yesterdayPrice = prices[0][1];
    const changePercentage = ((currentPrice - yesterdayPrice) / yesterdayPrice * 100).toFixed(2);
    
    // Seleccione todos los elementos td que tienen la clase "table__right"
    const tdList = document.querySelectorAll('.table__right');
    
    // Para cada td, seleccione el último span dentro de él y actualice su contenido con el resultado
    tdList.forEach(td => {
      const span = td.querySelector('span:last-of-type');
      if (changePercentage > 0) {
        span.classList.add('up');
        console.log(`El precio de ${cryptoId} ha subido un ${changePercentage}% en el último día.`);
      } else if (changePercentage < 0) {
        span.classList.add('down');
        console.log(`El precio de ${cryptoId} ha bajado un ${changePercentage}% en el último día.`);
      } else {
        span.classList.add('down');
      }
    });
  })
  .catch(error => console.error(error));
})