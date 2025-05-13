/**
 * Utility functions to generate structured data for Schema.org
 * This helps search engines better understand the content on the site
 */

/**
 * Creates WebSite schema for the homepage
 * @returns {Object} Schema.org WebSite object
 */
export const createWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Wallzee",
    "url": "https://wallzee.live",
    "description": "Download beautiful, high-quality wallpapers for desktop and mobile devices.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://wallzee.live/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Creates ImageGallery schema for wallpaper collections
 * @param {string} title - Gallery title
 * @param {string} description - Gallery description
 * @param {Array} images - Array of image objects with URL and name
 * @returns {Object} Schema.org ImageGallery object
 */
export const createImageGallerySchema = (title, description, images = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": title,
    "description": description,
    "image": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "name": img.name,
      "description": img.description || img.name
    }))
  };
};

/**
 * Creates Organization schema for about page
 * @returns {Object} Schema.org Organization object
 */
export const createOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Wallzee",
    "url": "https://wallzee.live",
    "logo": "https://wallzee.live/images/logo.png",
    "sameAs": [
      "https://facebook.com/wallzeewallpapers",
      "https://instagram.com/wallzee"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@wallzee.live"
    }
  };
};

/**
 * Creates FAQPage schema for FAQ sections
 * @param {Array} faqs - Array of FAQ objects with question and answer
 * @returns {Object} Schema.org FAQPage object
 */
export const createFaqSchema = (faqs = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Creates BreadcrumbList schema for navigation paths
 * @param {Array} items - Array of breadcrumb items with name and url
 * @returns {Object} Schema.org BreadcrumbList object
 */
export const createBreadcrumbSchema = (items = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Creates ImageObject schema for a single wallpaper
 * @param {Object} wallpaper - Wallpaper object with details
 * @returns {Object} Schema.org ImageObject
 */
export const createWallpaperSchema = (wallpaper) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": wallpaper.imageUrl,
    "name": wallpaper.title,
    "description": wallpaper.description || `${wallpaper.title} wallpaper for ${wallpaper.category}`,
    "uploadDate": wallpaper.createdAt,
    "author": {
      "@type": "Organization",
      "name": "Wallzee"
    },
    "copyrightNotice": "Wallzee - Free for personal use",
    "license": "https://wallzee.live/terms"
  };
};