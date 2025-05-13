import React, { useState, useEffect } from 'react';
import { Query } from 'appwrite';
import wallpaperService from '../appwrite/wallpaper';
import { storage } from '../appwrite/config';
import config from '../appwrite/config';

// Helper function to get a direct preview URL for an image
const getImagePreviewUrl = (imageId, category = "phone") => {
  if (!imageId) return category === "phone" ? 
    "https://placehold.co/400x600?text=No+Image" : 
    "https://placehold.co/800x450?text=No+Image";
  
  try {
    if (category === "phone") {
      // For phone wallpapers, use a taller aspect ratio (9:16)
      return storage.getFilePreview(
        config.storageId,
        imageId,
        1080, // width for mobile screens
        1920, // height - taller aspect ratio
        'center', // gravity
        100 // quality
      ).toString();
    } else {
      // For desktop wallpapers, use a wider aspect ratio (16:9)
      return storage.getFilePreview(
        config.storageId,
        imageId,
        1280, // width for desktop preview
        720, // height - wider aspect ratio
        'center', // gravity
        100 // quality
      ).toString();
    }
  } catch (error) {
    console.error("Error generating image URL:", error);
    return category === "phone" ? 
      "https://placehold.co/400x600?text=Error" : 
      "https://placehold.co/800x450?text=Error";
  }
};

// Categories for filtering
const categories = ["phone", "desktop"];

const Featured = () => {
  // State for filter
  const [selectedCategory, setSelectedCategory] = useState("phone");
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadMessage, setDownloadMessage] = useState(null);
  
  // Fetch featured wallpapers on component mount and when category changes
  useEffect(() => {
    const fetchFeaturedWallpapers = async () => {
      try {
        setLoading(true);
        // Query for featured wallpapers with the selected category, ordered by creation date descending
        const featuredQuery = [
          Query.equal('featured', true),
          Query.equal('category', selectedCategory),
          Query.orderDesc('$createdAt'),
          Query.limit(8) // Limit to 8 wallpapers
        ];
          const fetchedWallpapers = await wallpaperService.getAllWallpapers(featuredQuery);

        
        // Check a specific wallpaper's image URL if available
        if (fetchedWallpapers.length > 0) {
         
        }
        
        setWallpapers(fetchedWallpapers);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured wallpapers:', err);
        setError('Failed to load wallpapers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedWallpapers();
  }, [selectedCategory]);
    // Filter wallpapers based on selected category (now handled by the API query)
  const filteredWallpapers = wallpapers;
  // Handle wallpaper download
  const handleDownload = async (wallpaper) => {
    try {
      // Show downloading state
      setDownloadingId(wallpaper.$id);
      
      // Get direct file URL for download
      const fileUrl = wallpaper.imageId ? 
        storage.getFileDownload(
          config.storageId,
          wallpaper.imageId
        ).toString() : 
        wallpaper.imageUrl;
      
      // Determine file extension (.jpg or .png)
      const fileExtension = fileUrl.toLowerCase().includes('.png') ? 'png' : 'jpg';
      
      // Create a sanitized file name from the title
      const sanitizedTitle = (wallpaper.title || 'wallpaper')
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '_'); // Replace spaces with underscores
      
      // Format the filename as requested: title_wallzee.extension
      const fileName = `${sanitizedTitle}_wallzee.${fileExtension}`;
      
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Increment download count in Appwrite
      await wallpaperService.incrementDownloads(wallpaper.$id);
      
      // Update local state with incremented download count
      setWallpapers(prevWallpapers => 
        prevWallpapers.map(wp => 
          wp.$id === wallpaper.$id ? 
            { ...wp, downloads: (wp.downloads || 0) + 1 } : 
            wp
        )
      );
      
      // Show success message
      setDownloadMessage(`${wallpaper.title} downloaded successfully!`);
      setTimeout(() => setDownloadMessage(null), 3000);
    } catch (err) {
      console.error("Download error:", err);
      setError(`Failed to download: ${err.message}`);
      setTimeout(() => setError(null), 3000);
    } finally {
      setDownloadingId(null);
    }
  };
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Wallpapers</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Our top picks for your devices, refreshed weekly
          </p>
        </div>

        {/* Category filter */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm md:btn-md capitalize ${
                selectedCategory === category 
                  ? 'btn-primary' 
                  : 'btn-ghost'
              }`}
            >
              {category === "phone" ? "Phone Wallpapers" : "Desktop Wallpapers"}
            </button>
          ))}
        </div>
        
        {/* Success message toast */}
        {downloadMessage && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success">
              <span>{downloadMessage}</span>
            </div>
          </div>
        )}{/* Wallpaper grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 mt-16">
          {loading ? (
            // Loading state
            <div className="col-span-full flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-8">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          ) : filteredWallpapers.length === 0 ? (
            // No wallpapers found
            <div className="col-span-full text-center py-8">
              <h3 className="text-lg font-medium">No featured wallpapers found</h3>
              <p className="mt-2 text-gray-500">Check back later for featured wallpapers.</p>
            </div>
          ) : (
            // Display wallpapers
            filteredWallpapers.map(wallpaper => (
              <div 
                key={wallpaper.$id} 
                className="flex flex-col items-center group"
                style={{ 
                  marginBottom: wallpaper.category === "phone" ? "-300px" : "20px"
                }}
              >
                {wallpaper.category === "phone" ? (                  // Phone mockup
                  <div className="mockup-phone border-primary shadow-xl mb-0 transform scale-50 origin-top transition-all duration-300" style={{ marginTop: '-40px', height: 'auto' }}>
                    <div className="mockup-phone-camera"></div>
                    <div className="mockup-phone-display">
                      <div className="relative flex items-center justify-center overflow-hidden bg-base-300 h-full w-full aspect-[9/16]">                        <img 
                          src={wallpaper.imageId ? getImagePreviewUrl(wallpaper.imageId, "phone") : wallpaper.imageUrl} 
                          alt={wallpaper.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            console.error("Image failed to load:", wallpaper.imageUrl);
                            e.target.src = "https://placehold.co/200x400?text=Image+Error";
                          }}
                        />
                        
                        {/* Title and download overlay */}
                        <div className="absolute bottom-1 left-[-5] w-full p-2 text-white flex justify-between text-center items-center">
                          <div className="badge badge-info text-black capitalize">
                            {wallpaper.title}
                          </div>
                          <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => handleDownload(wallpaper)}
                            disabled={downloadingId === wallpaper.$id}
                          >
                            {downloadingId === wallpaper.$id ? 
                              <span className="loading loading-spinner loading-xs"></span> : 
                              'Download'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>                ) : (
                  // Improved laptop mockup
                  <div className="mockup-window border-base-300 shadow-xl mb-2 w-full transform hover:scale-[1.01] transition-all duration-300">
                     <div className="relative flex items-center justify-center overflow-hidden bg-base-300">
                      <img 
                        src={wallpaper.imageId ? 
                          storage.getFilePreview(
                            config.storageId,
                            wallpaper.imageId,
                            1280, // width for desktop preview
                            720, // height - proper 16:9 aspect ratio
                            'center', // gravity
                            100 // quality
                          ).toString() 
                          : wallpaper.imageUrl
                        } 
                        alt={wallpaper.title}
                        className="w-full object-cover aspect-[16/9]"
                        loading="lazy"
                        onError={(e) => {
                          console.error("Image failed to load:", wallpaper.imageUrl);
                          e.target.src = "https://placehold.co/800x450?text=Image+Error";
                        }}
                      />
                      
                      {/* Overlay for desktop wallpapers to show title and download button on hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
                        <h3 className="font-medium text-lg mb-2 px-4 text-center">{wallpaper.title}</h3>
                        <button 
                          className="btn btn-primary btn-sm mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(wallpaper);
                          }}
                          disabled={downloadingId === wallpaper.$id}
                        >
                          {downloadingId === wallpaper.$id ? 
                            <span className="loading loading-spinner loading-xs"></span> : 
                            'Download'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Wallpaper info - only shown for desktop wallpapers */}
                {wallpaper.category !== "phone" && (
                  <div className="text-center w-full">
                    <h3 className="font-medium text-lg mb-2 capitalize">{wallpaper.title}</h3>
                    <div className="flex justify-between items-center">                      <div className="flex items-center gap-2">
                        <span className="badge badge-sm badge-outline">16:9</span>
                        <span className="text-xs text-base-content/70 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {(wallpaper.downloads || 0).toLocaleString()}
                        </span>
                      </div>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleDownload(wallpaper)}
                        disabled={downloadingId === wallpaper.$id}
                      >
                        {downloadingId === wallpaper.$id ? 
                          <span className="loading loading-spinner loading-xs"></span> : 
                          'Download'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
          {/* View all button */}
        <div className="text-center mt-10">
          <a href={selectedCategory === "phone" ? "/phone-wallpapers" : "/desktop-wallpapers"} className="btn btn-outline gap-2">
            View All {selectedCategory === "phone" ? "Phone" : "Desktop"} Wallpapers
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Featured;

