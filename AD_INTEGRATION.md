# 💰 Ad Integration Guide

Complete guide for monetizing your BG Remover AI application.

## 📋 Table of Contents
1. [Google AdSense Integration](#google-adsense)
2. [Rewarded Video Ads](#rewarded-ads)
3. [Native Ads Setup](#native-ads)
4. [Alternative Ad Networks](#alternatives)
5. [Best Practices](#best-practices)

---

## 🎯 Google AdSense Integration

### Step 1: Apply for AdSense

1. Visit [Google AdSense](https://www.google.com/adsense)
2. Sign in with your Google account
3. Provide your website URL
4. Fill in contact and payment information
5. Accept terms and conditions
6. Wait for approval (typically 1-2 weeks)

### Step 2: Add AdSense Code to Your Site

Once approved, add this to the `<head>` section of `index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

Replace `XXXXXXXXXXXXXX` with your AdSense Publisher ID.

---

## 📱 Native Ads Setup

### Current Placeholders

The website has two native ad areas:
- **Top Ad**: Below header, above hero section
- **Bottom Ad**: After result section

### Implementation

Replace the placeholder in `index.html`:

**Find this:**
```html
<div class="ad-container native-ad" id="native-ad-top">
    <div class="ad-placeholder">
        <span class="ad-label">Advertisement</span>
        <p class="ad-text">Your Native Ad Here</p>
    </div>
</div>
```

**Replace with:**
```html
<div class="ad-container native-ad" id="native-ad-top">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXX"
         data-ad-slot="YYYYYYYYYY"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

### Get Your Ad Slot ID

1. Log in to AdSense
2. Go to **Ads** → **By ad unit** → **Display ads**
3. Click **New ad unit**
4. Choose **Display ad**
5. Name it (e.g., "BG Remover Top Ad")
6. Choose size: **Responsive**
7. Click **Create**
8. Copy the code and extract the `data-ad-slot` number

---

## 🎬 Rewarded Video Ads

Rewarded ads give users a benefit (faster processing) for watching an ad.

### Option 1: Google Ad Manager (Recommended)

1. **Set up Google Ad Manager**
   - Visit [Google Ad Manager](https://admanager.google.com)
   - Create an account
   - Set up rewarded video ad units

2. **Add AdSense for Games SDK**

Add to `<head>` in `index.html`:
```html
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script async src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
```

3. **Update script.js**

Replace the `simulateRewardedAd()` function:

```javascript
function simulateRewardedAd() {
    // Check if Ad API is available
    if (typeof adBreak !== 'undefined') {
        adBreak({
            type: 'reward',
            name: 'background-removal-boost',
            beforeAd: () => {
                watchAdBtn.textContent = 'Loading Ad...';
                watchAdBtn.disabled = true;
            },
            afterAd: () => {
                watchAdBtn.textContent = '✓ Ad Complete - Processing!';
                // Process immediately after ad
                setTimeout(() => {
                    processImage();
                }, 500);
            },
            adDismissed: () => {
                // User dismissed ad before completion
                alert('Please watch the complete ad to unlock instant processing');
                watchAdBtn.textContent = 'Watch Ad & Process';
                watchAdBtn.disabled = false;
            },
            adViewed: () => {
                // Ad was successfully viewed
                console.log('Rewarded ad completed successfully');
            }
        });
    } else {
        // Fallback if ads not available
        alert('Ads are loading. Please try again in a moment.');
    }
}
```

4. **Initialize Ad Config**

Add this to your HTML before closing `</head>`:

```html
<script>
    window.adConfig = {
        preloadAdBreaks: 'on',
        sound: 'on'
    };
</script>
```

### Option 2: AdMob Web SDK

1. **Create AdMob Account**
   - Go to [AdMob](https://admob.google.com)
   - Create rewarded ad unit
   - Get your Ad Unit ID

2. **Add AdMob SDK**
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-admob.js"></script>
```

3. **Initialize and Show Ads**
```javascript
// Initialize AdMob
const rewardedAd = firebase.admob().RewardedVideo('ca-app-pub-XXXXXX/YYYYYY');

function showRewardedAd() {
    rewardedAd.load();
    
    rewardedAd.on('rewarded', (reward) => {
        console.log('User earned reward:', reward);
        processImage(); // Start processing
    });
    
    rewardedAd.show();
}
```

---

## 🔄 Alternative Ad Networks

### 1. Carbon Ads (Developer-Focused)

Perfect for tech-oriented sites:

```html
<script async type="text/javascript" 
    src="//cdn.carbonads.com/carbon.js?serve=XXXXXX&placement=yoursite" 
    id="carbon">
</script>
```

**Pros:**
- Developer-friendly
- Less intrusive
- Quick approval
- Good CPM for tech audience

**Apply:** [carbonads.net](https://www.carbonads.net)

### 2. Media.net (Yahoo! Bing Network)

```html
<div id="XXXXXX">
    <script type="text/javascript">
        try {
            window._mNHandle.queue.push(function (){
                window._mNDetails.loadTag("XXXXXX", "728x90", "XXXXXX");
            });
        }
        catch (error) {}
    </script>
</div>
```

**Apply:** [media.net](https://www.media.net)

### 3. PropellerAds

Good for rewarded ads:

```html
<script type="text/javascript">
    var ad_idzone = "XXXXXX",
    ad_width = "300",
    ad_height = "250";
</script>
<script type="text/javascript" src="//serve.popadblocker.com/js/show_ads.js"></script>
```

**Apply:** [propellerads.com](https://www.propellerads.com)

---

## 📊 Revenue Optimization Tips

### 1. Ad Placement Strategy

**Best Performing Positions:**
1. **Above the fold** (top native ad) - Highest visibility
2. **After results** (bottom native ad) - User engagement peak
3. **Rewarded ads** - Highest CPM, voluntary engagement

### 2. Ad Density

**Recommended Ratio:**
- 70% content
- 30% ads
- Never exceed 50% ads

**Our Implementation:**
- 2 native ads
- 1 rewarded ad option
- Perfect balance ✓

### 3. User Experience First

```javascript
// Example: Don't show ads too frequently
let lastAdShown = 0;
const AD_COOLDOWN = 30000; // 30 seconds

function shouldShowAd() {
    const now = Date.now();
    if (now - lastAdShown > AD_COOLDOWN) {
        lastAdShown = now;
        return true;
    }
    return false;
}
```

---

## 🎯 Best Practices

### DO ✅

- **Clear labeling**: Always label ads as "Advertisement"
- **Non-intrusive**: Blend with design but clearly distinguish
- **Value exchange**: Rewarded ads provide clear benefit
- **Mobile-friendly**: Responsive ad units
- **Fast loading**: Async loading for all ad scripts
- **Monitor performance**: Track CTR, viewability, revenue

### DON'T ❌

- **Auto-play video ads**: Annoying and may violate policies
- **Click fraud**: Never click your own ads
- **Deceptive placement**: Don't make ads look like buttons
- **Too many ads**: Overwhelms users
- **Block content**: Ads shouldn't interfere with functionality
- **Ignore policies**: Read and follow ad network terms

---

## 📈 Expected Revenue

### Realistic Estimates (US Traffic)

**Traffic Level:**
- 1,000 daily users
- 50% ad viewability
- $2 CPM average

**Monthly Revenue:**
- Native ads: ~$60-90
- Rewarded ads: ~$100-150 (higher CPM)
- **Total: $160-240/month**

**10,000 daily users:**
- **Total: $1,600-2,400/month**

**Note:** Actual revenue varies by:
- Geographic location
- User engagement
- Ad quality score
- Seasonal trends
- Niche relevance

---

## 🔧 Testing Your Ads

### Google AdSense Test Mode

Add this to enable test ads:
```html
<meta name="google-adsense-platform-account" content="ca-host-pub-1556223355139109">
<meta name="google-adsense-platform-domain" content="sitekit.withgoogle.com">
```

### Manual Testing

1. **Use test IDs**
   - Google provides test ad unit IDs
   - Never use production IDs during development

2. **Different devices**
   - Desktop
   - Mobile
   - Tablet

3. **Different browsers**
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Ad blockers**
   - Test with and without
   - Consider showing message to ad-blocker users

---

## 🚨 Common Issues & Solutions

### Issue 1: "Ads Not Showing"

**Solutions:**
- Check if ad blocker is enabled
- Verify ad code is correct
- Check browser console for errors
- Ensure site is approved in AdSense
- Wait 24-48 hours after adding code

### Issue 2: "Low Revenue"

**Solutions:**
- Improve site traffic
- Optimize ad placement
- Target better keywords
- Improve content quality
- Check geo-targeting

### Issue 3: "Policy Violation"

**Solutions:**
- Review AdSense policies
- Remove copyrighted content
- Ensure proper labeling
- Check for prohibited content
- Appeal if necessary

---

## 📞 Support Resources

- **Google AdSense Help**: [support.google.com/adsense](https://support.google.com/adsense)
- **AdMob Help**: [support.google.com/admob](https://support.google.com/admob)
- **Community Forum**: [adsense.google.com/community](https://www.adsense.google.com/community)

---

## ✅ Ad Integration Checklist

- [ ] Applied for ad network account
- [ ] Account approved
- [ ] Added ad code to `<head>`
- [ ] Replaced native ad placeholders
- [ ] Implemented rewarded ad logic
- [ ] Tested on multiple devices
- [ ] Verified ads load correctly
- [ ] Checked mobile responsiveness
- [ ] Monitored for policy compliance
- [ ] Set up payment information
- [ ] Tracking revenue in dashboard

---

**Ready to monetize? Start with Google AdSense and expand from there!**

💡 **Pro Tip**: Focus on growing your traffic first. More users = more ad revenue. Quality content and good UX are key!
