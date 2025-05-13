import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';
import wallpaperService from '../appwrite/wallpaper';
import adminService from '../appwrite/admin';
import { storage } from '../appwrite/config';
import config from '../appwrite/config';
import SEO from '../components/SEO';
import { createImageGallerySchema } from '../utils/schema';

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

// Helper function to get a direct preview URL for an image
const getImagePreviewUrl = (imageId) => {
  if (!imageId) return "https://placehold.co/800x450?text=No+Image";
  
  try {
    // For desktop wallpapers, use a wider aspect ratio
    return storage.getFilePreview(
      config.storageId,
      imageId,
      1280, // width for desktop preview
      720, // height - wider aspect ratio (16:9)
      'center', // gravity
      100 // quality
    ).toString();
  } catch (error) {
    console.error("Error generating image URL:", error);
    return "https://placehold.co/800x450?text=Error";
  }
};

const DesktopWallpapers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wallpapers, setWallpapers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadMessage, setDownloadMessage] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [wallpapersPerPage] = useState(40);
  const [paginatedWallpapers, setPaginatedWallpapers] = useState([]);
  
  // Fetch categories and wallpapers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories from Appwrite
        const fetchedCategories = await adminService.getAllCategories();
        console.log("Fetched categories:", fetchedCategories);
        
        // Store the full category objects and extract names for the UI
        const categoryNames = ["All"];
        
        // Add the names from the fetched categories
        if (fetchedCategories && Array.isArray(fetchedCategories)) {
          fetchedCategories.forEach(cat => {
            if (cat && cat.name) {
              categoryNames.push(cat.name);
            }
          });
        }
        
        setCategories(categoryNames);
        
        // Fetch all wallpapers with 'desktop' category
        const desktopWallpapers = await wallpaperService.getWallpapersByCategory('desktop');
        console.log("Fetched desktop wallpapers:", desktopWallpapers);
        
        if (desktopWallpapers && Array.isArray(desktopWallpapers)) {
          // Sort wallpapers in descending order (latest first) - though this should already be done by the API
          const sortedWallpapers = [...desktopWallpapers].sort((a, b) => 
            new Date(b.$createdAt) - new Date(a.$createdAt)
          );
          
          setWallpapers(sortedWallpapers);
          setFilteredWallpapers(sortedWallpapers);
        } else {
          setWallpapers([]);
          setFilteredWallpapers([]);
          setError('No wallpapers found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load wallpapers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Store original fetched categories for filtering
  const [categoriesData, setCategoriesData] = useState([]);
  
  // Update categoriesData when categories change
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategoriesData = await adminService.getAllCategories();
        setCategoriesData(fetchedCategoriesData);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };
    
    // Only fetch if we have category names but not the full data
    if (categories.length > 0 && categoriesData.length === 0) {
      fetchCategoriesData();
    }
  }, [categories, categoriesData.length]);
  
  // Filter wallpapers based on selected category and search query
  useEffect(() => {
    let filtered = wallpapers;
    
    // Filter by category (if not "All")
    if (selectedCategory !== "All") {
      // Find the category ID by name
      const categoryObj = categoriesData.find(cat => cat.name === selectedCategory);
      
      if (categoryObj) {
        // Filter wallpapers by matching categoryId
        filtered = filtered.filter(wallpaper => wallpaper.categoryId === categoryObj.$id);
      } else {
        // If we can't find a category object, try direct name matching as fallback
        filtered = filtered.filter(wallpaper => {
          // Try to match by name if categoryId isn't available
          return wallpaper.category === selectedCategory;
        });
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(wallpaper => 
        wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredWallpapers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery, wallpapers, categoriesData]);
  
  // Update paginated wallpapers when filteredWallpapers or current page changes
  useEffect(() => {
    const indexOfLastWallpaper = currentPage * wallpapersPerPage;
    const indexOfFirstWallpaper = indexOfLastWallpaper - wallpapersPerPage;
    const currentWallpapers = filteredWallpapers.slice(indexOfFirstWallpaper, indexOfLastWallpaper);
    
    setPaginatedWallpapers(currentWallpapers);
  }, [filteredWallpapers, currentPage, wallpapersPerPage]);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredWallpapers.length / wallpapersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle wallpaper selection for preview
  const handleWallpaperClick = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    document.getElementById('desktop_wallpaper_preview_modal').showModal();
  };
  
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
      
      // Format the filename as requested: title+wallzee.extension
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
  };    return (
    <div className="min-h-screen bg-base-100/50 pb-12">
      <SEO 
        title="Desktop HD Wallpapers & Backgrounds"
        description="Download high-resolution desktop wallpapers and backgrounds. Free 4K, HD, and UltraHD wallpapers for all computer screens and monitors."
        canonicalUrl="https://wallzee.live/desktop-wallpapers"
        keywords={[
          'desktop wallpapers', 'computer backgrounds', 'PC wallpapers', 
          '4K desktop wallpapers', 'HD computer backgrounds', 'ultra-wide wallpapers',
          'dual monitor wallpapers', 'free desktop backgrounds'
        ]}
        ogImage="https://wallzee.live/images/og-desktop-wallpapers.jpg"
      >
        {/* Add structured data for image gallery */}
        <script type="application/ld+json">
          {JSON.stringify(createImageGallerySchema(
            "Desktop Wallpapers Collection", 
            "High-quality wallpapers for desktop computers, laptops, and monitors.",
            wallpapers.slice(0, 10).map(w => ({
              url: w.imageId ? getImagePreviewUrl(w.imageId) : w.imageUrl,
              name: w.title,
              description: `${w.title} desktop wallpaper`
            }))
          ))}
        </script>
      </SEO>
      
      {/* Hero Section */}
      <div className="hero py-16 md:py-24 bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Desktop Wallpapers</h1>
            <p className="text-lg mb-8 opacity-80">
              Transform your workspace with stunning high-resolution premium desktop wallpapers
            </p>
            <div className="flex justify-center">
              <div className="form-control w-full max-w-lg">
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Search wallpapers..." 
                    className="input input-bordered w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success message toast */}
      {downloadMessage && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>{downloadMessage}</span>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="alert alert-error max-w-2xl mx-auto my-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button 
              key={category} 
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Wallpapers Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
            <p className="text-base-content/70">Loading wallpapers...</p>
          </div>
        ) : (
          <>
            {filteredWallpapers.length === 0 ? (
              <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-semibold">No wallpapers found</h3>
                <p className="mt-2 text-base-content/70">Try a different search or category</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {paginatedWallpapers.map((wallpaper) => (
                    <div 
                      key={wallpaper.$id} 
                      className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full"
                      onClick={() => handleWallpaperClick(wallpaper)}
                    >
                      <figure className="relative aspect-[16/9] w-full overflow-hidden">
                        <img 
                          src={wallpaper.imageId ? getImagePreviewUrl(wallpaper.imageId) : wallpaper.imageUrl} 
                          alt={wallpaper.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                          loading="lazy"
                          onError={(e) => {
                            console.error("Image failed to load:", wallpaper.imageUrl);
                            e.target.src = "https://placehold.co/800x450?text=Image+Error";
                          }}
                        />
                        {wallpaper.featured && (
                          <div className="absolute top-2 right-2">
                            <div className="badge badge-primary">Featured</div>
                          </div>
                        )}
                      </figure>
                      <div className="card-body">
                        <h3 className="card-title text-sm sm:text-base line-clamp-1 capitalize">{wallpaper.title}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <div className="flex items-center gap-1 text-xs opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {(wallpaper.downloads || 0).toLocaleString()}
                          </div>
                          <div className="text-xs opacity-60">
                            {formatDate(wallpaper.$createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination - Improved to show limited page numbers */}
                {filteredWallpapers.length > wallpapersPerPage && (
                  <div className="flex justify-center mt-10">
                    <div className="join">
                      <button 
                        className="join-item btn"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                      >
                        «
                      </button>
                      
                      {/* Page numbers - Limit displayed pages for better UX */}
                      {(() => {
                        const totalPages = Math.ceil(filteredWallpapers.length / wallpapersPerPage);
                        let startPage = Math.max(1, currentPage - 2);
                        let endPage = Math.min(totalPages, startPage + 4);
                        
                        // Adjust start if we're near the end
                        if (endPage - startPage < 4) {
                          startPage = Math.max(1, endPage - 4);
                        }
                        
                        const pages = [];
                        
                        // First page
                        if (startPage > 1) {
                          pages.push(
                            <button
                              key={1}
                              onClick={() => paginate(1)}
                              className="join-item btn"
                            >
                              1
                            </button>
                          );
                          
                          // Ellipsis if needed
                          if (startPage > 2) {
                            pages.push(
                              <button
                                key="ellipsis1"
                                className="join-item btn btn-disabled"
                              >
                                ...
                              </button>
                            );
                          }
                        }
                        
                        // Page numbers
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => paginate(i)}
                              className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
                            >
                              {i}
                            </button>
                          );
                        }
                        
                        // Last page
                        if (endPage < totalPages) {
                          // Ellipsis if needed
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <button
                                key="ellipsis2"
                                className="join-item btn btn-disabled"
                              >
                                ...
                              </button>
                            );
                          }
                          
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => paginate(totalPages)}
                              className="join-item btn"
                            >
                              {totalPages}
                            </button>
                          );
                        }
                        
                        return pages;
                      })()}
                      
                      <button 
                        className="join-item btn"
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(filteredWallpapers.length / wallpapersPerPage)}
                      >
                        »
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>      <dialog id="desktop_wallpaper_preview_modal" className="modal modal-bottom sm:modal-middle">
        {selectedWallpaper && (
          <div className="modal-box max-w-4xl">
            {/* Wallpaper Preview */}
            <div className="w-full relative mb-6">
              <div className="mockup-window border bg-base-300 shadow-xl">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={selectedWallpaper.imageId ? getImagePreviewUrl(selectedWallpaper.imageId) : selectedWallpaper.imageUrl} 
                    alt={selectedWallpaper.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", selectedWallpaper.imageId || selectedWallpaper.imageUrl);
                      e.target.src = "https://placehold.co/800x450?text=Image+Error";
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Wallpaper Details */}
            <div className="w-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 capitalize">{selectedWallpaper.title}</h3>
                  <div className="flex gap-2 items-center">
                    <p className="text-sm opacity-70">
                      {selectedWallpaper.category || 'Desktop Wallpaper'}
                    </p>
                    {selectedWallpaper.featured && (
                      <div className="badge badge-primary">Featured</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-70">Added on</p>
                  <p className="font-medium">{formatDate(selectedWallpaper.$createdAt)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Stats */}
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value text-lg">{(selectedWallpaper.downloads || 0).toLocaleString()}</div>
                  </div>
                </div>
                
                {/* Resolution info - use metadata if available */}
                <div className="flex items-center justify-end">
                  <div className="badge badge-lg">
                    {selectedWallpaper.resolution || "HD Desktop Wallpaper"}
                  </div>
                </div>
              </div>
              
              {/* Download button */}
              <div className="mb-6">
                <button 
                  className="btn btn-primary w-full md:w-auto px-6"
                  onClick={() => handleDownload(selectedWallpaper)}
                  disabled={downloadingId === selectedWallpaper.$id}
                >
                  {downloadingId === selectedWallpaper.$id ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Wallpaper
                    </>
                  )}
                </button>
              </div>
              
              {/* Related tags */}
              <div>
                <p className="text-sm font-semibold mb-2">Related Tags</p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge">{selectedWallpaper.category || 'Desktop'}</span>
                  <span className="badge badge-outline">Desktop</span>
                  <span className="badge badge-outline">HD</span>
                  <span className="badge badge-secondary">{new Date(selectedWallpaper.$createdAt).getFullYear()}</span>
                  {selectedWallpaper.featured && (
                    <span className="badge badge-primary">Featured</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default DesktopWallpapers;