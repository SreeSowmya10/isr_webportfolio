document.addEventListener('DOMContentLoaded', function () {
    // Year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // Copy Helpdesk Response
    const copyBtn = document.getElementById('copy-response-button');
    const helpText = document.getElementById('helpdesk-response');
    const msgBox = document.getElementById('message-box');

    if (copyBtn && helpText && msgBox) {
        copyBtn.addEventListener('click', function () {
            const temp = document.createElement('textarea');
            temp.value = helpText.textContent.trim();
            document.body.appendChild(temp);
            temp.select();
            temp.setSelectionRange(0, 99999);
            try {
                const success = document.execCommand('copy');
                showMessage(success ? 'Copied to clipboard!' : 'Failed to copy.', success ? 'success' : 'error');
            } catch {
                showMessage('Copy failed.', 'error');
            }
            document.body.removeChild(temp);
        });

        function showMessage(message, type = 'info') {
            msgBox.textContent = message;
            msgBox.className = 'message-box show';
            msgBox.style.backgroundColor =
                type === 'success' ? '#28a745' :
                type === 'error' ? '#dc3545' : '#007bff';
            setTimeout(() => msgBox.classList.remove('show'), 3000);
        }
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
});
