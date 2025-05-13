import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {  return (    <div className="hero min-h-screen bg-base-100/50 flex items-center py-20">
      <div className="hero-content max-w-7xl w-full mx-auto flex-col lg:flex-row-reverse gap-8 px-4 py-8 md:py-8">          {/* Phone showcase container */}        <div className="lg:w-1/2 w-full flex justify-center items-center relative h-[250px] md:h-[300px] my-4 lg:my-0">
          {/* First phone (back) */}          <div 
            className="mockup-phone border-primary shadow-xl absolute transform -rotate-12 translate-x-[-50px] translate-y-[10px] opacity-70"            style={{ 
              transformOrigin: 'center',
              transform: 'scale(0.3)'
            }}
          >
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display">
              <img 
                alt="wallpaper preview 1" 
                src="https://img.daisyui.com/images/stock/453966.webp"
                className="object-cover h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
            {/* Second phone (middle) */}          
            <div className="mockup-phone border-secondary shadow-xl absolute transform -rotate-6 translate-x-[-35px] translate-y-[5px] opacity-85"            style={{ 
              transformOrigin: 'center',
              transform: 'scale(0.35)'
            }}
          >
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display">
              <img 
                alt="wallpaper preview 2" 
                src="https://img.daisyui.com/images/stock/453966.webp"
                className="object-cover h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
            {/* Third phone (front) */}          
            <div className="mockup-phone border-accent shadow-xl absolute z-10"            style={{ 
              transformOrigin: 'center',
              transform: 'scale(0.4)'
            }}
          >
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display">
              <img 
                alt="wallpaper preview 3" 
                src="https://fra.cloud.appwrite.io/v1/storage/buckets/6820988300220f701b9b/files/68235d4e0022bbfb70d1/view?project=68209798000cedff539c&mode=admin"
                className="object-cover h-full w-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
        
        {/* Content section */}        <div className="lg:w-1/2 flex flex-col justify-center">
        <div className="badge badge-success mt-4 text-xs">
  <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" sstrokemiterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></polyline></g></svg>
  New Wallpapers Daily
</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Premium Wallpapers for Your{" "}
            <span className="sm:hidden">Phone</span>
            <span className="hidden sm:inline md:hidden">Tablet</span>
            <span className="hidden md:inline">Desktop</span>
          </h1>
          <p className="py-4 text-base-content/80 max-w-2xl text-sm md:text-base">
            Discover and download beautiful, high-quality wallpapers for your phone, tablet, or desktop. 
            Our curated collection updates weekly with fresh designs.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Link to="/phone-wallpapers" className="btn btn-primary btn-sm md:btn-md">
             Phone Wallpapers
            </Link>
            <Link to="/desktop-wallpapers" className="btn btn-secondary btn-sm md:btn-md">
              Desktop Wallpapers
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero