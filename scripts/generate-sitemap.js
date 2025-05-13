import { createWriteStream } from 'fs';
import { SitemapStream } from 'sitemap';

// Create a stream to write to
const sitemap = new SitemapStream({ hostname: 'https://wallzee.live' });
const writeStream = createWriteStream('./dist/sitemap.xml');

sitemap.pipe(writeStream);

// Add your URLs with their metadata
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/phone-wallpapers', changefreq: 'daily', priority: 0.9 });
sitemap.write({ url: '/desktop-wallpapers', changefreq: 'daily', priority: 0.9 });
sitemap.write({ url: '/about-us', changefreq: 'monthly', priority: 0.7 });
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });
sitemap.write({ url: '/privacy', changefreq: 'yearly', priority: 0.5 });
sitemap.write({ url: '/terms', changefreq: 'yearly', priority: 0.5 });

// Add more dynamically generated URLs as needed
// You can replace this with code that gets URLs from your actual data

// End the stream
sitemap.end();

console.log('Sitemap generated successfully');
