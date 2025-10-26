/**
 * Contact Tracking Component with Google Ads Conversion Tracking
 * Include this script on any page where you want to track contact clicks
 * 
 * Usage: Add this script tag before </body>:
 * <script src="/public/js/contact-tracking.js"></script>
 */

(function() {
  'use strict';

  // Google Ads Configuration
  const ADS_CONFIG = {
    accountId: 'AW-859005700',
    conversions: {
      whatsapp: '8crhCNnMhaoZEITGzZkD',  // WhatsApp conversion label
      call: '7fJ9CNzMhaoZEITGzZkD',       // Phone call conversion label
      email: 'vwM5CN_MhaoZEITGzZkD'       // Email conversion label
    }
  };

  /**
   * Send conversion event to Google Ads
   */
  function trackConversion(conversionLabel, callback) {
    if (typeof window.gtag !== 'function') {
      console.warn('Google Analytics gtag not loaded');
      if (callback) callback();
      return;
    }

    gtag('event', 'conversion', {
      'send_to': ADS_CONFIG.accountId + '/' + conversionLabel,
      'event_callback': callback
    });
  }

  /**
   * Track contact click and ensure navigation happens
   */
  function handleContactClick(event, contactType, conversionLabel) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    
    if (!href) return;

    // Prevent default navigation temporarily
    event.preventDefault();

    // Track in dataLayer for additional analytics
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'contact_click',
        contact_type: contactType,
        href: href,
        agent: localStorage.getItem('agent') || null
      });
    }

    // Flag to ensure navigation happens only once
    let navigated = false;
    
    function navigate() {
      if (navigated) return;
      navigated = true;
      window.location.href = href;
    }

    // Set timeout fallback (500ms) to ensure navigation happens
    const timeout = setTimeout(navigate, 500);

    // Track conversion with callback
    trackConversion(conversionLabel, function() {
      clearTimeout(timeout);
      navigate();
    });
  }

  /**
   * Initialize tracking on all contact links
   */
  function initializeTracking() {
    // Track WhatsApp links
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], a[href*="api.whatsapp.com"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        handleContactClick(e, 'whatsapp', ADS_CONFIG.conversions.whatsapp);
      });
    });

    // Track phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        handleContactClick(e, 'call', ADS_CONFIG.conversions.call);
      });
    });

    // Track email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        handleContactClick(e, 'email', ADS_CONFIG.conversions.email);
      });
    });

    console.log('Contact tracking initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTracking);
  } else {
    initializeTracking();
  }

})();

