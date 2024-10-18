// Function to fetch data from the specific JSON file
async function fetchArbitrageData() {
    try {
        const response = await fetch("output7.json"); // Ensure this path is correct
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading arbitrage data:", error);
        return []; // Return an empty array in case of error
    }
}

// Function to populate the table with fetched data
function populateTable(bets) {
    const betBody = document.getElementById('bet-body');
    betBody.innerHTML = ''; // Clear any existing rows

    // Check if there are no bets
    if (bets.length === 0) {
        betBody.innerHTML = '<tr><td colspan="4" class="no-data">No Arbitrage opportunities found. Check back later!</td></tr>'; // Display message
        return; // Exit the function early
    }

    // Populate the table with bet data
    bets.forEach(bet => {
        // Ensure participants and payout exist for the bet
        if (bet.participants.length > 0) {
            const row = `
                <tr>
                    <td>
                        ${bet.market_name}<br>
                        <small>${bet.competition_instance_name}</small><br>
                        <small>${new Date(bet.event_start_time).toLocaleString()}</small><br>
                        <small>Last Found At: ${new Date(bet.lastFoundAt).toLocaleString()}</small>
                    </td>
                    <td>
                        ${bet.participants[0]}<br>
                        <strong>${bet.outcome_payout}</strong><br>
                        <small>${bet.source}</small>
                    </td>
                    <td>
                        ${bet.participant} (Bet on)<br>
                        <strong>Implied Probability: ${bet.implied_probability.toFixed(2)}%</strong><br>
                        <strong>Potential Profit: ${bet.profit_potential.toFixed(2)}</strong><br>
                    </td>
                    <td class="roi">EV: ${bet.EV.toFixed(2)}</td>
                </tr>
            `;
            betBody.innerHTML += row; // Append the new row to the table body
        } else {
            console.warn("Missing participants for:", bet.market_name); // Log a warning if data is missing
        }
    });
}

// Sample ROI calculation (if needed for future modifications)
function calculateROI(outcome_payout) {
    return (outcome_payout * 100).toFixed(2) + '%'; // Simple ROI placeholder logic
}

// Tab switching functionality (unchanged)
const preGameBtn = document.getElementById('pre-game-btn');
const liveBtn = document.getElementById('live-game-btn');

preGameBtn.addEventListener('click', function () {
    preGameBtn.classList.add('active');
    liveBtn.classList.remove('active');
    loadPreGameData(); // Load pre-game data if applicable
});

liveBtn.addEventListener('click', function () {
    liveBtn.classList.add('active');
    preGameBtn.classList.remove('active');
    loadLiveData(); // Load live data if applicable
});

// Function to load pre-game data
async function loadPreGameData() {
    try {
        const bets = await fetchArbitrageData(); // Fetch the data
        populateTable(bets); // Populate the table with fetched data
    } catch (error) {
        console.error("Could not load arbitrage data:", error);
    }
}

// Function to load live data (if applicable, placeholder for future implementation)
async function loadLiveData() {
    try {
        const bets = await fetchArbitrageData(); // Fetch the data
        populateTable(bets); // Populate the table with fetched data
    } catch (error) {
        console.error("Could not load arbitrage data:", error);
    }
}

// DOMContentLoaded to initialize page
document.addEventListener('DOMContentLoaded', async function () {
    preGameBtn.classList.add('active'); // Set Pre-Game as active on page load
    liveBtn.classList.remove('active'); // Ensure Live Game is not active
    loadPreGameData(); // Load pre-game data initially
});
