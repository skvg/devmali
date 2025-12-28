# Devmali Heritage Website

A modern, responsive website showcasing the rich cultural heritage of Devmali village and the spiritual significance of Lord Devnarayan. Built with Next.js, TypeScript, and Tailwind CSS, optimized for static deployment on AWS S3.

## 🌟 Features

- **Modern Design**: Clean, responsive design that works across all devices
- **Multilingual Support**: Content available in English, Hindi, and Rajasthani
- **Cultural Heritage**: Comprehensive showcase of village traditions and customs
- **Spiritual Content**: Devotional materials, prayers, and virtual darshan experience
- **Virtual Tours**: Immersive 360-degree experiences of the village
- **Performance Optimized**: Static site generation for fast loading
- **SEO Friendly**: Optimized for search engines and social sharing

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- AWS CLI (for deployment)

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd devmali-heritage-website

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Run quality checks and build
npm run deploy:build

# Or use the deployment script (Windows)
scripts\deploy.bat build

# Or use the deployment script (Unix/Linux/macOS)
scripts/deploy.sh build
```

### Local Testing of Production Build

```bash
# Build the project
npm run build

# Serve the static files locally
npm run serve

# Open http://localhost:3000 to test the production build
```

## 📦 Deployment

This website is configured for static deployment on AWS S3 with CloudFront CDN. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment

1. **Set Environment Variables**:
   ```bash
   # Windows
   set S3_BUCKET_NAME=your-bucket-name
   set AWS_REGION=us-east-1
   set CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id

   # Unix/Linux/macOS
   export S3_BUCKET_NAME=your-bucket-name
   export AWS_REGION=us-east-1
   export CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
   ```

2. **Deploy**:
   ```bash
   # Windows
   scripts\deploy.bat deploy

   # Unix/Linux/macOS
   scripts/deploy.sh deploy
   ```

### GitHub Actions

Automatic deployment is configured via GitHub Actions:
- **Production**: Deploys on push to `production` branch
- **Manual**: Can be triggered manually from GitHub Actions tab

Required GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID` (optional)

## 🛠️ Development

### Project Structure

```
devmali-heritage-website/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # UI components
│   │   └── layout/         # Layout components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── content/                # Markdown content files
│   ├── heritage/           # Cultural heritage content
│   ├── spiritual/          # Spiritual and devotional content
│   ├── tourism/            # Tourism information
│   └── community/          # Community stories
├── public/                 # Static assets
├── scripts/                # Deployment scripts
└── out/                    # Generated static files (after build)
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (not used for static deployment)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run deploy:build` - Run all checks and build
- `npm run serve` - Serve production build locally

### Content Management

Content is managed through Markdown files in the `content/` directory:

- **Heritage Content**: Stories, traditions, and cultural information
- **Spiritual Content**: Prayers, teachings, and devotional materials
- **Tourism Content**: Virtual tours and visitor information
- **Community Content**: Testimonials and community stories

Each content file includes frontmatter with metadata and multilingual support.

### Adding New Content

1. Create a new Markdown file in the appropriate content directory
2. Add frontmatter with required metadata
3. Write content in Markdown format
4. Include translations for multilingual support
5. Rebuild the site to see changes

Example content file:
```markdown
---
title:
  en: "English Title"
  hi: "हिंदी शीर्षक"
  raj: "राजस्थानी शीर्षक"
type: story
featured: true
publishedDate: 2024-01-01
---

# Your content here

Content in English...
```

## 🎨 Customization

### Styling

The website uses Tailwind CSS with a custom theme inspired by Rajasthani culture:

- **Colors**: Saffron orange, deep maroon, golden yellow, earth brown
- **Fonts**: Inter (primary), Noto Sans Devanagari (Hindi/Rajasthani)
- **Components**: Reusable UI components in `src/components/ui/`

### Configuration

Key configuration files:
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🔧 Technical Details

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Deployment**: Static export to AWS S3
- **CDN**: CloudFront for global distribution

### Performance Features

- **Static Site Generation**: All pages pre-generated at build time
- **Image Optimization**: Optimized images for web delivery
- **Code Splitting**: Automatic code splitting for faster loading
- **Caching**: Optimized cache headers for different asset types
- **Compression**: Gzip compression for text assets

### SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD structured data for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling configuration

## 🌍 Internationalization

The website supports three languages:
- **English** (en) - Primary language
- **Hindi** (hi) - Secondary language
- **Rajasthani** (raj) - Regional language

Language switching preserves navigation state and provides culturally appropriate translations.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: Touch-friendly navigation and optimized layouts
- **Tablet**: Enhanced gallery layouts and split-screen content
- **Desktop**: Full-screen experiences and advanced interactions

## ♿ Accessibility

- **WCAG 2.1 AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Optimized for assistive technologies
- **Color Contrast**: Meets contrast requirements
- **Semantic HTML**: Proper heading structure and landmarks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run quality checks: `npm run deploy:build`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Devmali Village Community** - For sharing their rich cultural heritage
- **Lord Devnarayan Devotees** - For spiritual guidance and content
- **Contributors** - For their valuable contributions to the project

---

**Built with ❤️ for preserving and sharing the cultural heritage of Devmali village**