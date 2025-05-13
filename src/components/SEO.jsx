import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing all meta tags and document head
 * 
 * @param {Object} props Component props
 * @param {string} props.title Page title
 * @param {string} props.description Page description
 * @param {string} props.canonicalUrl Canonical URL
 * @param {string} props.ogType Open Graph type (default: 'website')
 * @param {string} props.ogImage Open Graph image URL
 * @param {Array} props.keywords Keywords for meta tags
 * @param {boolean} props.noindex Should page be indexed (default: false)
 */
const SEO = ({
  title,
  description,
  canonicalUrl = 'https://wallzee.live',
  ogType = 'website',
  ogImage = 'https://wallzee.live/og-image.jpg', // Default OG image
  keywords = [],
  noindex = false,
  children
}) => {
  // Build the full title with brand name
  const fullTitle = title 
    ? `${title} | Wallzee - HD Wallpapers for Desktop & Mobile`
    : 'Wallzee - Premium HD Wallpapers for Desktop & Mobile Devices';
  
  // Build full URL if path is provided
  const fullUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `https://wallzee.live${canonicalUrl}`;

  // Default meta description if none provided
  const metaDescription = description || 
    'Download beautiful, high-quality wallpapers for desktop and mobile devices. Wallzee offers thousands of HD wallpapers for free.';
  
  // Convert keywords array to string
  const keywordsString = keywords.length > 0 
    ? keywords.join(', ') 
    : 'wallpapers, desktop wallpapers, mobile wallpapers, HD wallpapers, 4K wallpapers, phone backgrounds, desktop backgrounds';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Robots Control */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Wallzee" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional tags */}
      <meta name="application-name" content="Wallzee" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Wallzee" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#000000" />
      
      {/* Structured data for Google */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Wallzee",
            "url": "https://wallzee.live",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://wallzee.live/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "${metaDescription}"
          }
        `}
      </script>
      
      {children}
    </Helmet>
  );
};

export default SEO;
