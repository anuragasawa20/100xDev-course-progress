function addCheckmark() {
    // Find all video items
    const videoItems = document.querySelectorAll('.cursor-pointer.align-items-center.row');

    videoItems.forEach((item, index) => {
        // Get the content detail div that contains the title
        const contentDetail = item.querySelector('.content-detail');
        const titleElement = contentDetail.querySelector('a');

        if (titleElement && contentDetail) {
            const title = titleElement.textContent.trim();

            // Check if this video was previously marked as watched
            chrome.storage.local.get([title], (result) => {
                if (result[title]) {
                    // If video was watched, add checkmark if it doesn't exist
                    if (!contentDetail.querySelector('.video-checkmark')) {
                        const checkDiv = document.createElement('div');
                        checkDiv.className = 'video-checkmark';
                        checkDiv.innerHTML = '✓';
                        checkDiv.style.cssText = `
              color: #4CAF50;
              font-size: 24px;
              font-weight: bold;
              margin-left: 10px;
              display: inline-block;
            `;

                        // Add checkmark to the right column
                        const rightColumn = contentDetail.querySelector('.col-md-5');
                        if (rightColumn) {
                            const container = rightColumn.querySelector('div') || rightColumn;
                            container.prepend(checkDiv);
                        }
                    }
                }
            });

            // Add click handler to mark video as watched
            item.addEventListener('click', () => {
                // Store the video as watched
                chrome.storage.local.set({ [title]: true }, () => {
                    console.log('Video marked as watched:', title);
                    // Add checkmark immediately after clicking
                    if (!contentDetail.querySelector('.video-checkmark')) {
                        const checkDiv = document.createElement('div');
                        checkDiv.className = 'video-checkmark';
                        checkDiv.innerHTML = '✓';
                        checkDiv.style.cssText = `
              color: #4CAF50;
              font-size: 24px;
              font-weight: bold;
              margin-left: 10px;
              display: inline-block;
            `;

                        // Add checkmark to the right column
                        const rightColumn = contentDetail.querySelector('.col-md-5');
                        if (rightColumn) {
                            const container = rightColumn.querySelector('div') || rightColumn;
                            container.prepend(checkDiv);
                        }
                    }
                });
            });
        }
    });
}

// Initial load
addCheckmark();

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    addCheckmark();
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
}); 