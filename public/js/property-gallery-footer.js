/**
 * Property Gallery Footer Component
 * Shows thumbnails of all properties with automatic agent parameter preservation
 * 
 * Usage: Add before </body>:
 * <script src="/public/js/property-gallery-footer.js"></script>
 */

(function() {
  'use strict';

  // Property listings configuration
  const PROPERTIES = [
    {
      title: 'Chaweng Seaview Hillside',
      subtitle: 'Panoramic Views • ฿6M/rai',
      image: '/public/img/Chaweng_Samui_cityseaview_main.webp',
      url: '/properties/chaweng-seaview.html'
    },
    {
      title: 'Plailaem Beachfront Land',
      subtitle: '2 Rai • Private Beach',
      image: '/public/img/plailaem_beach_kohsamui.webp',
      url: '/properties/plailaem-beachfront.html'
    },
    {
      title: 'Lipa Noi Beach Villa',
      subtitle: 'Luxury Villa • ฿120M',
      image: '/public/img/Lipanoi_beach_villa_sunset_kohsamui.webp',
      url: '/properties/lipanoi-villa.html'
    }
  ];

  /**
   * Get current page URL to exclude from gallery
   */
  function getCurrentPagePath() {
    return window.location.pathname;
  }

  /**
   * Append agent parameter to URL if available
   */
  function appendAgentParam(url) {
    const agent = localStorage.getItem('agent');
    if (!agent) return url;
    
    try {
      const urlObj = new URL(url, window.location.origin);
      urlObj.searchParams.set('agent', agent);
      return urlObj.pathname + urlObj.search;
    } catch {
      return url;
    }
  }

  /**
   * Create the property gallery footer HTML
   */
  function createGalleryFooter() {
    const currentPath = getCurrentPagePath();
    
    // Filter out current page
    const otherProperties = PROPERTIES.filter(prop => {
      const propPath = new URL(prop.url, window.location.origin).pathname;
      return propPath !== currentPath;
    });

    if (otherProperties.length === 0) return null;

    const galleryHTML = `
      <div class="property-gallery-footer bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 py-8 sm:py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-6">
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Explore More Properties</h3>
            <p class="text-gray-600 text-sm sm:text-base">Discover other exclusive opportunities in Koh Samui</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-${otherProperties.length} gap-4 sm:gap-6">
            ${otherProperties.map(prop => `
              <a href="${appendAgentParam(prop.url)}" 
                 class="property-card group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                <div class="aspect-video relative overflow-hidden bg-gray-200">
                  <img src="${prop.image}" 
                       alt="${prop.title}"
                       class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                       loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="p-4 sm:p-5">
                  <h4 class="font-bold text-gray-900 text-base sm:text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    ${prop.title}
                  </h4>
                  <p class="text-gray-600 text-xs sm:text-sm line-clamp-1">
                    ${prop.subtitle}
                  </p>
                  <div class="mt-3 flex items-center text-blue-600 text-sm font-medium">
                    <span>View Details</span>
                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </a>
            `).join('')}
          </div>

          <div class="text-center mt-8">
            <a href="${appendAgentParam('/')}" 
               class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              View All Properties
            </a>
          </div>
        </div>
      </div>
    `;

    return galleryHTML;
  }

  /**
   * Insert the gallery footer before the main footer
   */
  function insertGalleryFooter() {
    const galleryHTML = createGalleryFooter();
    if (!galleryHTML) return;

    // Find the footer element
    const footer = document.querySelector('footer');
    if (!footer) {
      console.warn('Footer element not found. Gallery footer not inserted.');
      return;
    }

    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = galleryHTML;
    const galleryElement = tempDiv.firstElementChild;

    // Insert before the footer
    footer.parentNode.insertBefore(galleryElement, footer);
    
    console.log('Property gallery footer initialized');
  }

  /**
   * Add responsive styles
   */
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .property-gallery-footer {
        animation: fadeInUp 0.6s ease-out;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .property-card img {
        will-change: transform;
      }

      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      @media (max-width: 640px) {
        .property-gallery-footer .grid {
          gap: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize the component
   */
  function init() {
    // Don't show on index page
    if (getCurrentPagePath() === '/' || getCurrentPagePath() === '/index.html') {
      console.log('Property gallery footer: Skipped on index page');
      return;
    }

    addStyles();
    insertGalleryFooter();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

