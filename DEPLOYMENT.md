# Deployment Guide - BG Remover AI

This guide provides detailed instructions for deploying your BG Remover AI application for free with commercial use support.

## 🌟 Recommended: Vercel + Render (100% Free)

### Step 1: Deploy Frontend to Vercel

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel
   ```

3. **Configure**
   - Project name: `bg-remover-ai`
   - Framework: `Other`
   - Build command: (leave empty)
   - Output directory: `./`

4. **Get your URL**
   - Your app will be live at: `https://your-project.vercel.app`

### Step 2: Deploy Backend to Render

1. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or deploy from GitHub:
     ```bash
     # Push your code to GitHub first
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/yourusername/bg-remover.git
     git push -u origin main
     ```

3. **Configure Service**
   - Name: `bg-remover-api`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python server.py`
   - Instance Type: `Free`

4. **Environment Variables** (if needed)
   - Add any API keys or configuration

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes for first deployment)
   - Get your API URL: `https://bg-remover-api.onrender.com`

### Step 3: Connect Frontend to Backend

1. **Update script.js**
   ```javascript
   // Change this line in script.js
   const API_URL = 'https://bg-remover-api.onrender.com/api/remove-background-base64';
   ```

2. **Redeploy Frontend**
   ```bash
   vercel --prod
   ```

## 🚀 Alternative: Netlify + Railway

### Frontend: Netlify

1. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your folder (index.html, styles.css, script.js)
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

2. **Configure**
   - Site name: Choose a name
   - Publish directory: `./`

### Backend: Railway

1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Deploy from GitHub or local files

2. **Configuration**
   - Railway auto-detects Python
   - It will run `pip install -r requirements.txt`
   - Then start with `python server.py`

3. **Get URL**
   - Railway provides a URL: `https://your-app.railway.app`

## 🤗 Option 3: Hugging Face Spaces

Perfect for AI applications!

1. **Create Space**
   - Go to [huggingface.co/spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Choose "Gradio" or "Static" SDK

2. **Upload Files**
   - Upload all your files
   - Create `app.py` for Gradio interface (alternative to Flask)

3. **Example app.py for Gradio**
   ```python
   import gradio as gr
   from rembg import remove
   from PIL import Image
   
   def remove_bg(image):
       return remove(image)
   
   interface = gr.Interface(
       fn=remove_bg,
       inputs=gr.Image(type="pil"),
       outputs=gr.Image(type="pil"),
       title="AI Background Remover",
       description="Remove backgrounds using RMBG 2.0"
   )
   
   interface.launch()
   ```

## 💰 Ad Integration for Production

### Google AdSense

1. **Apply for AdSense**
   - Go to [adsense.google.com](https://www.google.com/adsense)
   - Apply with your domain
   - Wait for approval (1-2 weeks)

2. **Add AdSense Code**
   ```html
   <!-- Add to <head> in index.html -->
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
        crossorigin="anonymous"></script>
   ```

3. **Native Ads**
   ```html
   <!-- Replace native ad placeholders -->
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
   </script>
   ```

4. **Rewarded Ads**
   ```html
   <!-- Add before closing </body> -->
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
        crossorigin="anonymous"></script>
   <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
   ```

### Carbon Ads (Developer-Friendly)

1. **Apply at [carbonads.net](https://www.carbonads.net)**
2. **Add Code**
   ```html
   <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=XXXXXX&placement=yoursite" id="carbon"></script>
   ```

## 🔒 Security Best Practices

1. **Rate Limiting**
   ```python
   # Add to server.py
   from flask_limiter import Limiter
   
   limiter = Limiter(
       app,
       key_func=lambda: request.remote_addr,
       default_limits=["200 per day", "50 per hour"]
   )
   ```

2. **CORS Configuration**
   ```python
   # Update server.py
   CORS(app, resources={
       r"/api/*": {
           "origins": ["https://your-frontend-domain.com"]
       }
   })
   ```

3. **Environment Variables**
   ```bash
   # Never commit API keys
   # Use .env file locally
   # Set in platform settings for production
   ```

## 📊 Monitoring & Analytics

### Google Analytics

```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎯 Performance Optimization

1. **Enable Compression** (automatic on Vercel/Netlify)

2. **Image Optimization**
   ```python
   # In server.py, optimize output
   output_image.save(img_byte_arr, format='PNG', optimize=True, quality=85)
   ```

3. **Caching**
   ```python
   # Add caching headers
   @app.after_request
   def add_header(response):
       response.cache_control.max_age = 300
       return response
   ```

## ✅ Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Frontend connected to backend API
- [ ] Test image upload works
- [ ] Test background removal works
- [ ] Test download works
- [ ] Ads integrated (if applicable)
- [ ] Analytics added
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on most platforms)
- [ ] Error handling tested
- [ ] Mobile responsiveness verified

## 🌐 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records

## 💡 Cost Estimates

**Free Tier Limits:**
- Vercel: Unlimited bandwidth, 100 GB-hours
- Render: 750 hours/month (enough for 24/7)
- Netlify: 100 GB bandwidth, 300 build minutes
- Railway: 500 hours/month, $5 credit

**Recommended for Production:**
- Start with free tiers
- Upgrade when you get consistent traffic
- Monitor usage in dashboards

## 🆘 Troubleshooting Deployment

### Error: "Build Failed"
- Check your requirements.txt
- Ensure Python 3.8+ specified
- Review build logs

### Error: "502 Bad Gateway"
- Backend may be sleeping (free tier)
- First request takes 30-60s to wake up
- Consider paid tier for instant response

### Error: "CORS Policy"
- Update CORS settings in server.py
- Ensure frontend URL is allowed

---

Need help? Check the main README.md or open an issue!

**Happy Deploying! 🚀**
