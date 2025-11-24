# 🎨 AI Background Remover - RMBG 2.0

Professional AI-powered background removal tool with stunning UI and commercial-use license.

## ✨ Features

- 🤖 **RMBG 2.0 AI Technology** - Advanced background removal with pixel-perfect accuracy
- 🎨 **Beautiful UI** - Blue-violet-pink gradient theme with glassmorphism effects
- ⚡ **Lightning Fast** - Process images in seconds with real-time progress tracking
- 📊 **Progress Loader** - Percentage-based loader with motivational messages
- 💰 **Ad Integration** - Native ads and rewarded ad support
- 📱 **Responsive Design** - Works perfectly on all devices
- 🆓 **Free for Commercial Use** - No restrictions on usage

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- Modern web browser
- Internet connection (for first-time model download)

### Installation

1. **Clone or download this repository**

2. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

3. **Start the backend server**
```bash
python server.py
```

The server will start on `http://localhost:5000`

4. **Open the web application**
   - Open `index.html` in your browser
   - Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve
   ```

5. **Access the app**
   - Navigate to `http://localhost:8000` (or wherever your frontend is hosted)
   - Upload an image and watch the magic happen!

## 📁 Project Structure

```
bg-remover/
├── index.html          # Main HTML file
├── styles.css          # Styling with blue-violet-pink theme
├── script.js           # Frontend JavaScript
├── server.py           # Flask backend with RMBG
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## 🎯 Usage

1. **Upload Image**
   - Drag and drop an image onto the upload area
   - Or click to browse and select an image
   - Supported formats: JPG, PNG, WEBP (max 10MB)

2. **Processing**
   - Watch the AI process your image with real-time progress
   - See motivational messages like "Loading fast" and "Enhance high quality"
   - Optional: Watch a rewarded ad for instant processing

3. **Download**
   - Compare original and processed images side-by-side
   - Download the result as a transparent PNG
   - Process more images as needed

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run: `vercel`
4. Follow the prompts to deploy

**Backend (Railway):**
1. Create a Railway account at [railway.app](https://railway.app)
2. Create new project
3. Connect your GitHub repository
4. Railway will auto-detect Python and deploy
5. Update `script.js` with your Railway URL

### Option 2: Netlify (Frontend) + Render (Backend)

**Frontend (Netlify):**
1. Create a Netlify account at [netlify.com](https://netlify.com)
2. Drag and drop your frontend files
3. Deploy instantly

**Backend (Render):**
1. Create a Render account at [render.com](https://render.com)
2. Create new Web Service
3. Connect repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `python server.py`
6. Update `script.js` with your Render URL

### Option 3: Hugging Face Spaces (All-in-One)

1. Create a Space at [huggingface.co/spaces](https://huggingface.co/spaces)
2. Select "Gradio" or "Streamlit" as SDK
3. Upload files
4. Auto-deploy

## 💰 Ad Integration Guide

### Native Ads

Replace the ad placeholders in `index.html`:

```html
<!-- Find these sections and add your ad code -->
<div class="ad-container native-ad" id="native-ad-top">
    <!-- Replace with Google AdSense or other native ad code -->
</div>
```

### Rewarded Ads

Modify the `simulateRewardedAd()` function in `script.js`:

```javascript
// Replace with actual ad network SDK (AdMob, Google Ads, etc.)
function simulateRewardedAd() {
    // Example: Google AdSense rewarded ads
    // adBreak({
    //     type: 'reward',
    //     name: 'remove-background',
    //     beforeReward: (showAdFn) => { showAdFn(); },
    //     adDismissed: () => { processImage(); }
    // });
}
```

## 🔧 Configuration

### Backend API URL

Update in `script.js`:
```javascript
const API_URL = 'https://your-backend-url.com/api/remove-background-base64';
```

### Model Settings

Modify in `server.py`:
```python
output_image = remove(
    input_image,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,  # Adjust for quality
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=10
)
```

## 🎨 Customization

### Color Theme

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #667eea;
    --primary-violet: #a855f7;
    --primary-pink: #f093fb;
    /* Customize as needed */
}
```

### Loading Messages

Edit in `script.js`:
```javascript
const loadingMessages = [
    "Loading fast...",
    "Enhancing high quality...",
    // Add your own messages
];
```

## 📦 API Endpoints

### Health Check
```
GET /api/health
Response: { "status": "healthy", "model": "RMBG 2.0" }
```

### Remove Background (File Upload)
```
POST /api/remove-background
Content-Type: multipart/form-data
Body: { image: [file] }
Response: PNG image file
```

### Remove Background (Base64)
```
POST /api/remove-background-base64
Content-Type: application/json
Body: { "image": "data:image/png;base64,..." }
Response: { "success": true, "image": "data:image/png;base64,..." }
```

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed
- Install dependencies: `pip install -r requirements.txt`
- Check if port 5000 is available

### CORS errors
- Make sure backend is running
- Check that `flask-cors` is installed
- Verify API URL in `script.js`

### Model download fails
- Ensure stable internet connection
- First run downloads ~170MB model file
- Check firewall settings

### Image processing fails
- Check file size (max 10MB)
- Verify file format (JPG, PNG, WEBP)
- Check backend logs for errors

## 📄 License

This project is free for personal and commercial use. The RMBG model (rembg) is licensed under MIT License.

## 🙏 Credits

- **RMBG Technology**: [rembg](https://github.com/danielgatis/rembg)
- **UI Design**: Custom design with modern web standards
- **Fonts**: Google Fonts (Inter, Poppins)

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code comments
3. Open an issue on GitHub

---

**Built with ❤️ for fast and high-quality background removal**

🌟 **Star this repo if you find it useful!**
