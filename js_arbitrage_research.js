function populateTable(bets) {
    const betBody = document.getElementById('bet-body');
    betBody.innerHTML = ''; // Clear any existing rows

    bets.forEach(bet => {
        // Ensure outcomes have at least two bets to show
        if (bet.outcomes.length >= 2) {
            const row = `
                <tr>
                    <td>
                        ${bet.event_name}<br>
                        <small>${bet.competition_name}</small><br>
                        <small>${new Date(bet.start_time).toLocaleString()}</small>
                    </td>
                    <td>
                        ${bet.outcomes[0].type}<br>
                        <strong>${bet.outcomes[0].payout}</strong><br>
                        <small>${bet.outcomes[0].source}</small>
                    </td>
                    <td>
                        ${bet.outcomes[1].type}<br>
                        <strong>${bet.outcomes[1].payout}</strong><br>
                        <small>${bet.outcomes[1].source}</small>
                    </td>
                    <td class="roi">${calculateROI(bet.outcomes)}</td>
                </tr>
            `;
            betBody.innerHTML += row; // Append the new row to the table body
        } else {
            console.warn("Not enough outcomes for:", bet.event_name); // Log a warning if data is missing
        }
    });
}

// Sample ROI calculation function (this can be customized)
function calculateROI(outcomes) {
    // Assuming simple ROI calculation based on payouts
    const payout1 = outcomes[0].payout;
    const payout2 = outcomes[1].payout;
    return ((1 / payout1 + 1 / payout2) * 100 - 100).toFixed(2) + '%';
}
