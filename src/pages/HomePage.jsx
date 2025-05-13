
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import SEO from '../components/SEO'
import { createWebsiteSchema } from '../utils/schema'

const HomePage = () => {
  // Schema.org structured data for the home page
  const schemaData = createWebsiteSchema();
  
  return (
    <>
      <SEO 
        title="Premium HD Wallpapers for Desktop & Mobile"
        description="Discover and download beautiful, high-quality wallpapers for your devices. Our collection includes 4K, HD wallpapers for desktop, mobile, and tablet."
        canonicalUrl="https://wallzee.live"
        keywords={[
          'wallpapers', 'HD wallpapers', '4K wallpapers', 
          'desktop backgrounds', 'phone wallpapers', 
          'free wallpapers', 'high quality wallpapers'
        ]}
        ogImage="https://wallzee.live/images/og-home.jpg"
      >
        {/* Add structured data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </SEO>
      
      <Hero />
      <Featured />
    </>
  )
}

export default HomePage