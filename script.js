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
