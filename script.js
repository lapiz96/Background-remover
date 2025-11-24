// ===========================================
// BG REMOVER AI - Complete Implementation
// Features: Enhanced BG Removal + Auto Ad + Auto Download +  PNG/JPG Support
// ===========================================

let uploadedFile = null;
let processedImageData = null;

const loadingMessages = [
    "Loading fast...",
    "Enhancing high quality...",
    "AI analyzing image...",
    "Detecting edges with precision...",
    "Removing background intelligently...",
    "Optimizing transparency...",
    "Finalizing masterpiece...",
    "Almost there...",
    "Perfecting details..."
];

// DOM Elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const uploadSection = document.getElementById('upload-section');
const processingSection = document.getElementById('processing-section');
const resultSection = document.getElementById('result-section');
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const statusText = document.getElementById('status-text');
const originalImage = document.getElementById('original-image');
const resultImage = document.getElementById('result-image');
const downloadBtn = document.getElementById('download-btn');
const newImageBtn = document.getElementById('new-image-btn');
const watchAdBtn = document.getElementById('watch-ad-btn');

// Event Listeners
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-violet)';
    uploadArea.style.transform = 'translateY(-4px)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(102, 126, 234, 0.5)';
    uploadArea.style.transform = 'translateY(0)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(102, 126, 234, 0.5)';
    uploadArea.style.transform = 'translateY(0)';
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

downloadBtn.addEventListener('click', () => downloadImage());
newImageBtn.addEventListener('click', resetApp);
watchAdBtn.addEventListener('click', () => autoShowRewardedAd());

// File Handling
function handleFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload JPG, PNG, or WEBP');
        return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('File must be less than 10MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        originalImage.src = e.target.result;
        uploadSection.style.display = 'none';
        processingSection.style.display = 'block';
        simulateProcessing();
    };
    reader.readAsDataURL(file);
}

// Processing
function simulateProcessing() {
    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressBar.style.width = '100%';
            progressPercentage.textContent = '100%';
            statusText.textContent = 'Processing complete!';
            setTimeout(() => processImage(), 500);
        } else {
            progressBar.style.width = progress + '%';
            progressPercentage.textContent = Math.floor(progress) + '%';
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            statusText.textContent = loadingMessages[messageIndex];
        }
    }, 400);
}

async function processImage() {
    try {
        await removeBackgroundEnhanced();
        setTimeout(() => autoShowRewardedAd(), 800);
    } catch (error) {
        console.error('Error:', error);
        alert('Error processing. Please try again.');
        resetApp();
    }
}

// ENHANCED Background Removal with Better Quality
async function removeBackgroundEnhanced() {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Enhanced detection with more samples
            const bgColor = detectBackgroundAdvanced(data, canvas.width, canvas.height);
            removeBackgroundAdvanced(data, bgColor, canvas.width, canvas.height);

            ctx.putImageData(imageData, 0, 0);

            // Maximum quality PNG
            processedImageData = canvas.toDataURL('image/png', 1.0);
            resultImage.src = processedImageData;

            processingSection.style.display = 'none';
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });

            resolve();
        };

        img.onerror = () => reject(new Error('Load failed'));
        img.src = originalImage.src;
    });
}

function detectBackgroundAdvanced(data, width, height) {
    const samples = [];
    const sampleSize = 30; // Increased for accuracy

    // Sample corners + edges
    const regions = [
        { x: 0, y: 0 },
        { x: width - sampleSize, y: 0 },
        { x: 0, y: height - sampleSize },
        { x: width - sampleSize, y: height - sampleSize },
        { x: Math.floor(width / 2) - 15, y: 0 },
        { x: 0, y: Math.floor(height / 2) - 15 },
        { x: width - sampleSize, y: Math.floor(height / 2) - 15 },
        { x: Math.floor(width / 2) - 15, y: height - sampleSize }
    ];

    for (const region of regions) {
        for (let y = 0; y < sampleSize; y++) {
            for (let x = 0; x < sampleSize; x++) {
                const px = Math.max(0, Math.min(width - 1, region.x + x));
                const py = Math.max(0, Math.min(height - 1, region.y + y));
                const idx = (py * width + px) * 4;
                samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
            }
        }
    }

    // Use median for robustness
    const rVals = samples.map(s => s.r).sort((a, b) => a - b);
    const gVals = samples.map(s => s.g).sort((a, b) => a - b);
    const bVals = samples.map(s => s.b).sort((a, b) => a - b);
    const mid = Math.floor(samples.length / 2);

    return { r: rVals[mid], g: gVals[mid], b: bVals[mid] };
}

function removeBackgroundAdvanced(data, bgColor, width, height) {
    const threshold = 35;
    const feather = threshold * 2.5;
    const alphaMap = new Uint8Array(width * height);

    // Pass 1: Calculate alpha values
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const dist = Math.sqrt(
            Math.pow(r - bgColor.r, 2) +
            Math.pow(g - bgColor.g, 2) +
            Math.pow(b - bgColor.b, 2)
        );

        const pixelIndex = i / 4;
        if (dist < threshold) {
            alphaMap[pixelIndex] = 0;
        } else if (dist < feather) {
            alphaMap[pixelIndex] = Math.round(((dist - threshold) / (feather - threshold)) * 255);
        } else {
            alphaMap[pixelIndex] = 255;
        }
    }

    // Pass 2: Edge smoothing (3x3 averaging)
    const smoothed = new Uint8Array(width * height);
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            let sum = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    sum += alphaMap[(y + dy) * width + (x + dx)];
                }
            }
            smoothed[idx] = Math.round(sum / 9);
        }
    }

    // Apply final alpha
    for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = smoothed[i / 4];
    }
}

// Rewarded Ad
function autoShowRewardedAd() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:999999;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s`;

    const adBox = document.createElement('div');
    adBox.style.cssText = `background:linear-gradient(135deg,#667eea,#f093fb);padding:48px;border-radius:24px;text-align:center;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.5);color:white`;
    adBox.innerHTML = `<div style="font-size:48px;margin-bottom:16px">📺</div><h2 style="font-size:28px;margin-bottom:16px;font-weight:700">Watch Ad to Download</h2><p style="font-size:16px;margin-bottom:24px;opacity:0.9">Background removed! Watch a short video to download your PNG.</p><div id="ad-countdown" style="font-size:72px;font-weight:800;margin:32px 0">15</div><div id="ad-status" style="font-size:14px;opacity:0.8">Advertisement playing...</div><div style="margin-top:24px;padding:16px;background:rgba(255,255,255,0.1);border-radius:12px"><p style="font-size:12px;margin:0">⚡ Download starts automatically after ad</p></div>`;

    overlay.appendChild(adBox);
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(style);

    let countdown = 15;
    const countdownEl = document.getElementById('ad-countdown');
    const statusEl = document.getElementById('ad-status');

    const adInterval = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        if (countdown <= 5) {
            countdownEl.style.color = '#ffd700';
            statusEl.textContent = 'Almost done...';
        }
        if (countdown <= 0) {
            clearInterval(adInterval);
            countdownEl.textContent = '✓';
            countdownEl.style.fontSize = '96px';
            statusEl.textContent = 'Downloading...';
            setTimeout(() => {
                autoDownloadImage('png');
                setTimeout(() => overlay.remove(), 500);
            }, 1000);
        }
    }, 1000);
}

// Download with proper BLOB handling
function autoDownloadImage(format = 'png') {
    if (!processedImageData) return;

    try {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const base64 = processedImageData.split(',')[1];
        const bytes = atob(base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);

        const blob = new Blob([arr], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bg-removed-${Date.now()}.${format}`;
        link.click();

        setTimeout(() => URL.revokeObjectURL(url), 100);

        const notif = document.createElement('div');
        notif.style.cssText = `position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#667eea,#f093fb);color:white;padding:20px 32px;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:10000;font-size:16px;font-weight:600`;
        notif.innerHTML = `<div style="display:flex;align-items:center;gap:12px"><span style="font-size:24px">✓</span><span>${format.toUpperCase()} Downloaded!</span></div>`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    } catch (e) {
        alert('Download failed. Please try again.');
    }
}

function downloadImage() {
    if (!processedImageData) {
        alert('No image to download');
        return;
    }

    const format = prompt('Choose format:\nType "png" for PNG (transparent)\nType "jpg" for JPG (white background)', 'png');
    const selectedFormat = (format && format.toLowerCase() === 'jpg') ? 'jpg' : 'png';

    if (selectedFormat === 'jpg') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const jpgData = canvas.toDataURL('image/jpeg', 0.95);
            performDownload(jpgData, 'jpg');
        };
        img.src = processedImageData;
    } else {
        performDownload(processedImageData, 'png');
    }
}

function performDownload(imageData, format) {
    try {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        const base64 = imageData.split(',')[1];
        const bytes = atob(base64);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);

        const blob = new Blob([arr], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bg-removed-${Date.now()}.${format}`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (e) {
        alert('Download failed');
    }
}

function resetApp() {
    uploadedFile = null;
    processedImageData = null;
    fileInput.value = '';
    originalImage.src = '';
    resultImage.src = '';
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
    statusText.textContent = loadingMessages[0];
    uploadSection.style.display = 'block';
    processingSection.style.display = 'none';
    resultSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

let lastScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        header.style.background = 'rgba(10,10,15,0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        header.style.background = 'rgba(10,10,15,0.8)';
        header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

console.log('%c🎨 BG Remover AI - Enhanced Quality', 'font-size:20px;font-weight:bold;color:#667eea');
console.log('%c✨ Auto Ad + PNG/JPG Download', 'font-size:14px;color:#a855f7');
console.log('%c⚡ Upload → Process → Ad → Download', 'font-size:12px;color:#f093fb');
