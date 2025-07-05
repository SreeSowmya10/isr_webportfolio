// script.js

document.addEventListener('DOMContentLoaded', function () {
    // 1. Update copyright
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Copy helpdesk response
    const copyButton = document.getElementById('copy-response-button');
    const helpdeskResponseDiv = document.getElementById('helpdesk-response');
    const messageBox = document.getElementById('message-box');

    if (copyButton && helpdeskResponseDiv && messageBox) {
        copyButton.addEventListener('click', function () {
            const responseText = helpdeskResponseDiv.textContent.trim();
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = responseText;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            tempTextArea.setSelectionRange(0, 99999);

            try {
                const successful = document.execCommand('copy');
                showMessage(successful ? 'Copied to clipboard!' : 'Failed to copy.', successful ? 'success' : 'error');
            } catch (err) {
                showMessage('Failed to copy.', 'error');
            } finally {
                document.body.removeChild(tempTextArea);
            }
        });
    }

    function showMessage(message, type = 'info') {
        messageBox.textContent = message;
        messageBox.className = 'message-box show';
        messageBox.style.backgroundColor =
            type === 'success' ? '#28a745' :
            type === 'error' ? '#dc3545' : '#007bff';

        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }

    // 3. Render KPI Chart
    const ctx = document.getElementById('kpiChart').getContext('2d');
    new Chart(ctx, {
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
                    text: 'KPI Metrics Over 4 Weeks vs Goal'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
});
