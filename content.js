function addCheckmark() {
    const videoItems = document.querySelectorAll('.cursor-pointer.align-items-center.row');

    videoItems.forEach((item) => {
        const contentDetail = item.querySelector('.content-detail');
        const titleElement = contentDetail.querySelector('a');

        if (titleElement && contentDetail) {
            const title = titleElement.textContent.trim();
            const rightColumn = contentDetail.querySelector('.col-md-5');

            // Only proceed if we haven't added controls yet
            if (!contentDetail.querySelector('.video-controls')) {
                const controlsDiv = document.createElement('div');
                controlsDiv.className = 'video-controls';
                controlsDiv.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 10px;
                `;

                // Create checkmark button
                const checkButton = document.createElement('button');
                checkButton.className = 'video-check-button';
                checkButton.innerHTML = '✓';
                checkButton.style.cssText = `
                    color: #808080;
                    font-size: 20px;
                    font-weight: bold;
                    background: none;
                    border: 2px solid #808080;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    transition: all 0.2s;
                    margin-right: 8px;
                `;

                // Create status text
                const statusText = document.createElement('span');
                statusText.className = 'completion-status';
                statusText.style.cssText = `
                    font-size: 14px;
                    font-weight: 500;
                    color: #808080;
                    transition: all 0.2s;
                `;
                statusText.textContent = '';

                // Check storage and update states
                chrome.storage.local.get([title], (result) => {
                    if (result[title]) {
                        checkButton.style.color = '#4CAF50';
                        checkButton.style.borderColor = '#4CAF50';
                        checkButton.style.background = '#4CAF50';
                        checkButton.style.color = '#fff';
                        statusText.style.color = '#4CAF50';
                        statusText.textContent = '✨ Completed!';
                        titleElement.style.color = '#4CAF50';
                        titleElement.style.textDecoration = 'none';

                        // Add completion badge to title
                        if (!contentDetail.querySelector('.completion-badge')) {
                            const badge = document.createElement('span');
                            badge.className = 'completion-badge';
                            badge.textContent = '✓ Completed';
                            badge.style.cssText = `
                                background-color: #E8F5E9;
                                color: #4CAF50;
                                padding: 4px 8px;
                                border-radius: 12px;
                                font-size: 12px;
                                font-weight: 500;
                                margin-left: 8px;
                                display: inline-block;
                            `;
                            titleElement.appendChild(badge);
                        }
                    }
                });

                // Add click handler
                checkButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent video item click

                    chrome.storage.local.get([title], (result) => {
                        const newState = !result[title];
                        chrome.storage.local.set({ [title]: newState }, () => {
                            // Update button state
                            checkButton.style.color = newState ? '#fff' : '#808080';
                            checkButton.style.borderColor = newState ? '#4CAF50' : '#808080';
                            checkButton.style.background = newState ? '#4CAF50' : 'none';

                            // Update status text
                            statusText.style.color = newState ? '#4CAF50' : '#808080';
                            statusText.textContent = newState ? '✨ Completed!' : '';

                            // Update title style
                            titleElement.style.color = newState ? '#4CAF50' : '';
                            titleElement.style.textDecoration = newState ? 'none' : '';

                            // Handle completion badge
                            const existingBadge = contentDetail.querySelector('.completion-badge');
                            if (newState && !existingBadge) {
                                const badge = document.createElement('span');
                                badge.className = 'completion-badge';
                                badge.textContent = '✓ Completed';
                                badge.style.cssText = `
                                    background-color: #E8F5E9;
                                    color: #4CAF50;
                                    padding: 4px 8px;
                                    border-radius: 12px;
                                    font-size: 12px;
                                    font-weight: 500;
                                    margin-left: 8px;
                                    display: inline-block;
                                `;
                                titleElement.appendChild(badge);
                            } else if (!newState && existingBadge) {
                                existingBadge.remove();
                            }
                        });
                    });
                });

                controlsDiv.appendChild(checkButton);
                controlsDiv.appendChild(statusText);

                if (rightColumn) {
                    const container = rightColumn.querySelector('div') || rightColumn;
                    container.prepend(controlsDiv);
                }
            }
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

// function addCheckmark() {
//     const videoItems = document.querySelectorAll('.cursor-pointer.align-items-center.row');

//     videoItems.forEach((item) => {
//         const contentDetail = item.querySelector('.content-detail');
//         const titleElement = contentDetail.querySelector('a');

//         if (titleElement && contentDetail) {
//             const title = titleElement.textContent.trim();
//             const rightColumn = contentDetail.querySelector('.col-md-5');

//             // Only proceed if we haven't added controls yet
//             if (!contentDetail.querySelector('.video-controls')) {
//                 const controlsDiv = document.createElement('div');
//                 controlsDiv.className = 'video-controls';
//                 controlsDiv.style.cssText = `
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                 `;

//                 // Create checkmark button
//                 const checkButton = document.createElement('button');
//                 checkButton.className = 'video-check-button';
//                 checkButton.innerHTML = '✓';
//                 checkButton.style.cssText = `
//                     color: #808080;
//                     font-size: 24px;
//                     font-weight: bold;
//                     background: none;
//                     border: 2px solid #808080;
//                     border-radius: 50%;
//                     width: 36px;
//                     height: 36px;
//                     cursor: pointer;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     padding: 0;
//                     transition: all 0.2s;
//                 `;

//                 // Check storage and update button state
//                 chrome.storage.local.get([title], (result) => {
//                     if (result[title]) {
//                         checkButton.style.color = '#4CAF50';
//                         checkButton.style.borderColor = '#4CAF50';
//                     }
//                 });

//                 // Add click handler
//                 checkButton.addEventListener('click', (e) => {
//                     e.stopPropagation(); // Prevent video item click

//                     chrome.storage.local.get([title], (result) => {
//                         const newState = !result[title];
//                         chrome.storage.local.set({ [title]: newState }, () => {
//                             checkButton.style.color = newState ? '#4CAF50' : '#808080';
//                             checkButton.style.borderColor = newState ? '#4CAF50' : '#808080';
//                         });
//                     });
//                 });

//                 controlsDiv.appendChild(checkButton);

//                 if (rightColumn) {
//                     const container = rightColumn.querySelector('div') || rightColumn;
//                     container.prepend(controlsDiv);
//                 }
//             }
//         }
//     });
// }

// // Initial load
// addCheckmark();

// // Create a MutationObserver to watch for changes in the DOM
// const observer = new MutationObserver((mutations) => {
//     addCheckmark();
// });

// // Start observing the document with the configured parameters
// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });