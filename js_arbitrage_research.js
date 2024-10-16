// Function to fetch data from the specific JSON file
async function fetchArbitrageData() {
    try {
        const response = await fetch('filtered_arbitrage_data.json'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Parse and return the JSON data
    } catch (error) {
        console.error("Could not fetch arbitrage data:", error);
        return []; // Return an empty array if there's an error
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const arbitrageData = await fetchArbitrageData(); // Fetch the data when the DOM is loaded
        populateTable(arbitrageData); // Populate the table with the fetched data
    } catch (error) {
        console.error("Error loading arbitrage data:", error);
    }
});

// Function to populate the table with arbitrage data
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

// Tab switching functionality
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
