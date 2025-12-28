# 🖼️ Image Guide - Devmali Heritage Website

## Quick Reference for Adding Images

### 📍 Where to Put Images

All images go in the **`public/images/`** directory. The website expects images in specific subdirectories:

```
public/images/
├── darshan/          # Virtual temple darshan images
├── heritage/         # Cultural heritage photos
├── architecture/     # Building and construction photos
├── traditions/       # Traditional practices photos
├── testimonials/     # Visitor profile photos
├── 360/             # 360-degree panoramic images
├── heritage-bg.jpg   # Homepage backgrounds
├── spiritual-bg.jpg
├── tourism-bg.jpg
└── village-landscape.jpg
```

### 🚀 Quick Start

1. **Check what's missing**: Run `npm run check-images`
2. **Add your images**: Place them in the correct subdirectories
3. **Follow naming**: Use lowercase with hyphens (e.g., `mud-house-exterior.jpg`)
4. **Optimize size**: Compress images before adding them
5. **Test**: Run `npm run dev` to see your images

### 📏 Image Size Guidelines

| Type | Size | Format | File Size |
|------|------|--------|-----------|
| **Hero Backgrounds** | 1920x1080px+ | JPEG | 300KB-1MB |
| **Gallery Images** | 1200x800px | JPEG | 200KB-500KB |
| **Thumbnails** | 400x300px | JPEG | 50KB-150KB |
| **Profile Photos** | 300x300px | JPEG | 30KB-100KB |
| **360° Images** | 4096x2048px | JPEG | 2MB-8MB |

### 🎯 Priority Images (Start Here)

**Most Important** (for homepage):
1. `heritage-bg.jpg` - Heritage section background
2. `spiritual-bg.jpg` - Spiritual section background  
3. `tourism-bg.jpg` - Tourism section background
4. `village-landscape.jpg` - Village overview
5. `devmali-hero-bg.jpg` - Main hero background

**Virtual Darshan** (for spiritual experience):
1. `darshan/main-deity-hd.jpg` - Main temple deity (high-res)
2. `darshan/main-deity-thumb.jpg` - Same image, smaller size
3. `darshan/sanctum-hd.jpg` - Inner sanctum (high-res)
4. `darshan/sanctum-thumb.jpg` - Same image, smaller size

### 🛠️ Tools for Image Optimization

**Free Online Tools:**
- [TinyPNG](https://tinypng.com/) - Compress JPEG/PNG
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [Compressor.io](https://compressor.io/) - Image compression

**Desktop Tools:**
- GIMP (free)
- Photoshop (paid)
- ImageOptim (Mac)

### 📝 Naming Examples

✅ **Good Names:**
- `mud-house-exterior.jpg`
- `festival-celebration.jpg`
- `main-deity-hd.jpg`
- `community-gathering.jpg`

❌ **Bad Names:**
- `IMG_1234.jpg`
- `Photo 1.jpeg`
- `temple image.png`
- `MudHouse_Exterior.JPG`

### 🎨 Image Content Guidelines

**Cultural Sensitivity:**
- Use authentic photos from Devmali village when possible
- Ensure religious images are respectful and appropriate
- Get permission for photos of people
- Avoid stock photos that don't represent the actual village

**Quality Standards:**
- High resolution and sharp focus
- Good lighting (natural light preferred)
- Culturally authentic and representative
- Professional appearance

### 🔍 Check Your Progress

Run this command anytime to see what images are missing:

```bash
npm run check-images
```

This will show you:
- ✅ Images you've added
- ❌ Images still needed
- 📊 Completion percentage

### 📞 Need Help?

**Common Issues:**
- **Image not showing**: Check file name spelling and location
- **Image too large**: Compress using tools above
- **Wrong format**: Convert to JPEG for photos, PNG for graphics
- **Blurry image**: Use higher resolution source image

**File Locations:**
- All images: `public/images/`
- Audio files: `public/audio/`
- Videos: `public/videos/`
- Downloads: `public/downloads/`

### 📋 Quick Checklist

Before adding images:
- [ ] Image is optimized/compressed
- [ ] File name uses lowercase and hyphens
- [ ] Image is in correct subdirectory
- [ ] Image represents Devmali village authentically
- [ ] You have permission to use the image

After adding images:
- [ ] Run `npm run check-images` to verify
- [ ] Test in development (`npm run dev`)
- [ ] Check image loads correctly on website

---

**💡 Pro Tip**: Start with the priority images listed above to get the most visual impact quickly. You can always add more detailed images later!