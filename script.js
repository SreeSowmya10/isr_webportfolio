// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Dynamically update the copyright year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Copy to clipboard functionality for the sample helpdesk response
    const copyResponseButton = document.getElementById('copy-response-button');
    const helpdeskResponseDiv = document.getElementById('helpdesk-response');
    const messageBox = document.getElementById('message-box');

    if (copyResponseButton && helpdeskResponseDiv && messageBox) {
        copyResponseButton.addEventListener('click', function() {
            // Get the text content from the helpdesk response div
            // We use textContent to get the plain text, including line breaks
            const responseText = helpdeskResponseDiv.textContent;

            // Use document.execCommand('copy') for better compatibility in iframes
            // Create a temporary textarea element to hold the text
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = responseText.trim(); // Trim whitespace from start/end
            document.body.appendChild(tempTextArea);

            // Select the text in the textarea
            tempTextArea.select();
            tempTextArea.setSelectionRange(0, 99999); // For mobile devices

            try {
                // Execute the copy command
                const successful = document.execCommand('copy');
                const msg = successful ? 'Copied to clipboard!' : 'Failed to copy.';
                showMessage(msg, successful ? 'success' : 'error');
            } catch (err) {
                console.error('Oops, unable to copy', err);
                showMessage('Failed to copy.', 'error');
            } finally {
                // Remove the temporary textarea
                document.body.removeChild(tempTextArea);
            }
        });
    }

    // KPI Bar Chart
    const kpiCtx = document.getElementById('kpiChart').getContext('2d');
    new Chart(kpiCtx, {
        type: 'bar',
        data: {
            labels: ['Avg. Resolution Time', 'Customer Satisfaction', 'First Contact Resolution', 'System Uptime', 'Tickets Closed'],
            datasets: [
                { label: 'Week 1', data: [5.2, 88, 72, 99.9, 48], backgroundColor: '#93c5fd' },
                { label: 'Week 2', data: [4.6, 90, 75, 99.9, 52], backgroundColor: '#60a5fa' },
                { label: 'Week 3', data: [4.1, 92, 78, 99.7, 57], backgroundColor: '#3b82f6' },
                { label: 'Week 4', data: [3.8, 94, 81, 99.9, 61], backgroundColor: '#2563eb' },
                {
                    label: 'Goal',
                    data: [4.0, 90, 80, 99.9, 50],
                    backgroundColor: '#16a34a',
                    type: 'line',
                    borderColor: '#16a34a',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 4,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'KPI Metrics Over 4 Weeks vs Goal',
                    font: { size: 18 }
                }
            }
        }
    });

    // Budget Pie Chart
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    new Chart(budgetCtx, {
        type: 'pie',
        data: {
            labels: ['Software & Licenses', 'Training & Workshops', 'Hardware & Equipment'],
            datasets: [{
                data: [5400, 3000, 123500],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#1f2937',
                        font: { size: 14, family: 'Inter' }
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Budget Overview',
                    font: { size: 20 },
                    color: '#111827'
                }
            }
        }
    });    

    // Function to show a temporary message
    function showMessage(message, type = 'info') {
        messageBox.textContent = message;
        messageBox.className = 'message-box show'; // Reset classes and show

        // Set background color based on type
        if (type === 'success') {
            messageBox.style.backgroundColor = '#28a745'; // Green
        } else if (type === 'error') {
            messageBox.style.backgroundColor = '#dc3545'; // Red
        } else {
            messageBox.style.backgroundColor = '#007bff'; // Blue (info)
        }

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }
});
