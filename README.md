# Course Video Progress Tracker

A Chrome extension that helps you track your progress through online course videos. Mark videos as completed with a simple click and maintain your progress across sessions.

## Features

- 🎯 Easy-to-use completion tracking for course videos
- ✨ Visual feedback with completion badges and status indicators
- 💾 Progress automatically saves across browser sessions
- 🎨 Clean, intuitive interface that integrates with course platform
- 🔄 Real-time updates without page refresh
- 📱 Responsive design that works across different screen sizes

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension is now installed and ready to use!

## Usage

1. Navigate to your course video page
2. Each video will have a completion button and status indicator
3. Click the checkmark button to mark a video as completed
4. Your progress is automatically saved
5. Completed videos will show:
   - A green checkmark
   - A "Completed!" status message
   - A completion badge next to the title
   - Visual highlighting for easy recognition

## Technical Details

The extension uses:
- Chrome Storage API for persistent progress tracking
- MutationObserver for real-time DOM updates
- Custom CSS for visual feedback
- Event delegation for efficient event handling
