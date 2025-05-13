# Wallzee - Premium HD Wallpapers

Wallzee is a modern web application for discovering and downloading beautiful, high-quality wallpapers for desktop and mobile devices. Built with React, Vite, DaisyUI, and Appwrite.

## Features

- Browse and download HD wallpapers for desktop and mobile
- Filter wallpapers by category
- Search functionality
- User-friendly interface with responsive design
- Fast performance with optimized image loading
- Admin panel for content management

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS, DaisyUI
- **Backend**: Appwrite (Authentication, Database, Storage)
- **Deployment**: Netlify
- **SEO**: React Helmet Async, Structured Data
- **API**: Web3Forms for contact form submissions

## SEO Optimizations

Wallzee implements comprehensive SEO best practices:

1. **Meta Tags**: Dynamic meta tags using React Helmet Async
2. **Structured Data**: Schema.org markup for better search engine understanding
3. **Canonical URLs**: Properly configured to prevent duplicate content issues
4. **Open Graph Tags**: Optimized for social media sharing
5. **Sitemap**: Auto-generated sitemap.xml
6. **Robots.txt**: Properly configured for search engine crawling
7. **Performance**: Optimized for Core Web Vitals
8. **Mobile-Friendly**: Fully responsive design

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/wallzee.git

# Navigate to the project directory
cd wallzee

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## SEO Setup

1. **Download OG Images**: Run the script to download Open Graph images
   ```bash
   # For Linux/Mac:
   sh scripts/download-og-images.sh
   
   # For Windows:
   powershell -ExecutionPolicy Bypass -File .\scripts\download-og-images.ps1
   ```

2. **Generate Sitemap**: The sitemap is automatically generated during build
   ```bash
   npm run generate-sitemap
   ```

## Deployment

The site is configured for deployment on Netlify with the following settings:

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Custom domain: wallzee.live

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to us at support@wallzee.live
