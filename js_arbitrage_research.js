document.addEventListener('DOMContentLoaded', function () {
  // Fetch the data from the JSON file
  fetch('./filtered_arbitrage_data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Data fetched successfully:", data); // Debugging: Check if data is fetched
      populateTable(data);
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
      alert('Failed to load data. Please check the console for errors.');
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
      betBody.innerHTML += row;
    });
  }

  // Tab switching functionality (for buttons)
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
