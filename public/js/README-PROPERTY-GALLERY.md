# Property Gallery Footer Component

A reusable mini gallery that displays property thumbnails at the bottom of each property page, helping visitors discover other listings while preserving agent tracking parameters.

## Features

✅ **Automatic Property Listings** - Shows all properties except current page  
✅ **Agent Parameter Preservation** - Maintains `?agent=` across all links  
✅ **Responsive Design** - Optimized for mobile, tablet, and desktop  
✅ **Smooth Animations** - Fade-in effect and hover interactions  
✅ **Smart Filtering** - Excludes current page from gallery  
✅ **Index Page Skip** - Doesn't show on homepage  
✅ **Zero Configuration** - Works automatically on all pages  

## Installation

Simply add this script tag before `</body>` on any property page:

```html
<!-- Property Gallery Footer Component -->
<script src="/public/js/property-gallery-footer.js"></script>
```

**Note**: Do NOT add to `index.html` - the component automatically skips the homepage.

## What It Shows

The gallery displays:
- Property thumbnail image
- Property title
- Subtitle with key details
- "View Details" call-to-action
- "View All Properties" button linking to homepage

### Example Output

On **Chaweng Seaview** page, visitors see:
- Plailaem Beachfront Land
- Lipa Noi Beach Villa
- (Chaweng Seaview is excluded)

## Property Configuration

Edit the `PROPERTIES` array in `property-gallery-footer.js`:

```javascript
const PROPERTIES = [
  {
    title: 'Property Name',
    subtitle: 'Key Details • Price',
    image: '/public/img/property-image.webp',
    url: '/properties/property-page.html'
  },
  // Add more properties...
];
```

### Property Object Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Property main title | `'Chaweng Seaview Hillside'` |
| `subtitle` | string | Key details/price | `'Panoramic Views • ฿6M/rai'` |
| `image` | string | Path to thumbnail | `'/public/img/property.webp'` |
| `url` | string | Link to property page | `'/properties/page.html'` |

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width cards
- Touch-optimized spacing
- Smaller text sizes

### Tablet (640px - 1024px)
- 2-column grid
- Medium card sizes
- Balanced spacing

### Desktop (> 1024px)
- Up to 3-column grid (based on number of properties)
- Large card sizes
- Hover effects with scale transforms

## Styling

The component includes built-in styles for:
- Fade-in animation on load
- Smooth hover effects (image zoom, shadow, lift)
- Line clamping for text overflow
- Responsive grid layouts
- Gradient overlays

### Custom Styling

To override styles, add CSS after the script:

```html
<script src="/public/js/property-gallery-footer.js"></script>
<style>
  .property-gallery-footer {
    background: linear-gradient(to right, #your-colors);
  }
  
  .property-card {
    border-radius: 1rem;
    /* Your custom styles */
  }
</style>
```

## Agent Parameter Handling

The component automatically:
1. Reads `agent` from localStorage
2. Appends `?agent=VALUE` to all property links
3. Preserves agent when linking to homepage

This ensures tracking works across the entire user journey.

## Pages Using This Component

- ✅ `/properties/chaweng-seaview.html`
- ✅ `/properties/plailaem-beachfront.html`
- ✅ `/properties/lipanoi-villa.html`
- ❌ `/index.html` (intentionally excluded)

## How It Works

1. **Page loads** → Component checks if it's the index page
2. **If not index** → Retrieves property list
3. **Filters out current page** → Shows only other properties
4. **Injects HTML** → Inserts gallery before `<footer>`
5. **Adds agent params** → Appends tracking to all links

## Adding New Properties

To add a new property to the gallery:

1. Open `/public/js/property-gallery-footer.js`
2. Add entry to `PROPERTIES` array:
```javascript
{
  title: 'New Property Name',
  subtitle: 'Key Feature • Price',
  image: '/public/img/new-property.webp',
  url: '/properties/new-property.html'
}
```
3. Save file
4. Add the gallery script to the new property page
5. Done! It appears on all other property pages automatically

## Troubleshooting

### Gallery not showing?

**Check:**
- Are you on the index page? (It's intentionally hidden there)
- Is there a `<footer>` element? (Required for insertion)
- Are there other properties in the list? (Current page is excluded)
- Open console - look for `"Property gallery footer initialized"`

### Links missing agent parameter?

**Check:**
- Is agent stored in localStorage? 
- Test: `localStorage.getItem('agent')` in console
- Verify agent tracking script is running first

### Images not loading?

**Check:**
- Image paths are correct in `PROPERTIES` array
- Images exist in `/public/img/` directory
- Use browser DevTools Network tab to check 404s

### Styling issues?

**Check:**
- Tailwind CSS is loaded on the page
- No conflicting CSS overriding component styles
- Browser console for CSS errors

## Browser Support

✅ Modern browsers (Chrome, Firefox, Safari, Edge)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  
✅ Responsive on all screen sizes  
⚠️ IE11 not supported (uses modern JavaScript)  

## Performance

- **Lazy loading images** - Uses `loading="lazy"` attribute
- **Minimal DOM manipulation** - Single insertion operation
- **CSS animations** - GPU-accelerated transforms
- **Small footprint** - ~6KB unminified JavaScript

## Benefits

✅ **Increases engagement** - Visitors discover more properties  
✅ **Reduces bounce rate** - Easy navigation between listings  
✅ **Preserves tracking** - Agent params maintained automatically  
✅ **Professional appearance** - Modern, polished design  
✅ **Zero maintenance** - Add once, works everywhere  

## Example HTML Output

```html
<div class="property-gallery-footer bg-gradient-to-br...">
  <div class="max-w-7xl mx-auto...">
    <div class="text-center mb-6">
      <h3>Explore More Properties</h3>
      <p>Discover other exclusive opportunities...</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4...">
      <!-- Property cards here -->
    </div>
    <div class="text-center mt-8">
      <a href="/?agent=...">View All Properties</a>
    </div>
  </div>
</div>
```

---

**Last Updated**: October 2025  
**Version**: 1.0  
**Maintained by**: Samui Vista Team

