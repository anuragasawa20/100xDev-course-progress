// Create a canvas for 128x128 icon
const canvas = document.createElement('canvas');
canvas.width = 128;
canvas.height = 128;
const ctx = canvas.getContext('2d');

// Draw a simple checkmark icon
ctx.fillStyle = '#4285f4'; // Google Blue
ctx.beginPath();
ctx.arc(64, 64, 60, 0, Math.PI * 2); // Circle
ctx.fill();

// Draw checkmark
ctx.strokeStyle = 'white';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(40, 64);
ctx.lineTo(56, 80);
ctx.lineTo(88, 48);
ctx.stroke();

// Save as PNG
const link = document.createElement('a');
link.download = 'icon128.png';
link.href = canvas.toDataURL('image/png');
link.click(); 