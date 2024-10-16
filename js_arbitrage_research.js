document.addEventListener('DOMContentLoaded', function () {
  // Fetch the data from the JSON file
  fetch('./filtered_arbitrage_data.json') // Ensure this path is correct
    .then(response => response.json())
    .then(data => {
      populateTable(data); // This will populate the table with the fetched data
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
    });

  function populateTable(bets) {
    const betBody = document.getElementById('bet-body');
    betBody.innerHTML = ''; // Clear any existing rows

    bets.forEach(bet => {
      const row = `
        <tr>
          <td>
            ${bet.event}<br>
            <small>${bet.league}</small><br>
            <small>${bet.date}</small>
          </td>
          <td>
            ${bet.bet1.team}<br>
            <strong>${bet.bet1.odds}</strong><br>
            <small>${bet.bet1.book}</small>
          </td>
          <td>
            ${bet.bet2.team}<br>
            <strong>${bet.bet2.odds}</strong><br>
            <small>${bet.bet2.book}</small>
          </td>
          <td class="roi">${bet.roi}</td>
        </tr>
      `;
      betBody.innerHTML += row; // Append the new row to the table body
    });
  }

  // Tab switching
  const preGameBtn = document.getElementById('pre-game-btn');
  const liveBtn = document.getElementById('live-btn');

  preGameBtn.addEventListener('click', function () {
    preGameBtn.classList.add('active');
    liveBtn.classList.remove('active');
  });

  liveBtn.addEventListener('click', function () {
    liveBtn.classList.add('active');
    preGameBtn.classList.remove('active');
  });
});
