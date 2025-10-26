# Contact Tracking Component

This reusable JavaScript component tracks WhatsApp, phone, and email clicks with Google Ads conversion tracking.

## Features

- ✅ Tracks WhatsApp link clicks
- ✅ Tracks phone (tel:) link clicks  
- ✅ Tracks email (mailto:) link clicks
- ✅ Sends conversion events to Google Ads
- ✅ Pushes events to dataLayer for additional analytics
- ✅ Ensures navigation happens even if tracking fails (500ms timeout)
- ✅ Includes agent tracking from localStorage
- ✅ Works on all pages automatically

## Installation

### 1. Add Google Ads Tag (in `<head>`)

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-859005700"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-859005700');
</script>
```

### 2. Include Contact Tracking Script (before `</body>`)

```html
<!-- Contact Tracking Component with Google Ads Conversion -->
<script src="/public/js/contact-tracking.js"></script>
```

That's it! The script will automatically:
- Find all WhatsApp, phone, and email links
- Attach click event listeners
- Track conversions to Google Ads
- Ensure navigation completes

## Google Ads Conversion Labels

The component uses these conversion labels (configured in `contact-tracking.js`):

- **WhatsApp**: `AW-859005700/8crhCNnMhaoZEITGzZkD`
- **Phone Call**: `AW-859005700/7fJ9CNzMhaoZEITGzZkD`
- **Email**: `AW-859005700/vwM5CN_MhaoZEITGzZkD`

To update these labels, edit the `ADS_CONFIG` object in `contact-tracking.js`:

```javascript
const ADS_CONFIG = {
  accountId: 'AW-859005700',
  conversions: {
    whatsapp: 'YOUR_WHATSAPP_LABEL',
    call: 'YOUR_CALL_LABEL',
    email: 'YOUR_EMAIL_LABEL'
  }
};
```

## How It Works

1. **Page loads** → Script initializes on `DOMContentLoaded`
2. **User clicks contact link** → Event is intercepted
3. **Conversion tracked** → Sent to Google Ads via `gtag('event', 'conversion', ...)`
4. **Event logged** → Pushed to `dataLayer` with contact type, href, and agent
5. **Navigation happens** → Either via callback or 500ms timeout fallback

## DataLayer Events

Each contact click pushes this event to `dataLayer`:

```javascript
{
  event: 'contact_click',
  contact_type: 'whatsapp' | 'call' | 'email',
  href: 'the-link-url',
  agent: 'saved-agent-from-localStorage' || null
}
```

You can use these events in Google Tag Manager or other analytics tools.

## Pages Using This Component

- ✅ `/index.html`
- ✅ `/properties/chaweng-seaview.html`
- ✅ `/properties/plailaem-beachfront.html`
- ✅ `/properties/lipanoi-villa.html`
- ✅ `/properties/bb/index.html`

## Troubleshooting

### Conversions not tracking?

1. Check browser console for errors
2. Verify `gtag` is loaded: Type `gtag` in console, should show function
3. Check Network tab for hits to `google-analytics.com/collect` or `/g/collect`
4. Verify conversion labels in Google Ads match the component

### Navigation not working?

- The component has a 500ms timeout fallback
- If gtag fails to load, navigation still happens
- Check browser console for any JavaScript errors

### How to test?

1. Open browser DevTools → Console
2. Click a contact link
3. You should see: `"Contact tracking initialized"`
4. Check Network tab for Google Analytics requests
5. In Google Ads, conversions may take 24-48 hours to appear

## Benefits of This Approach

✅ **DRY (Don't Repeat Yourself)**: Write once, use everywhere
✅ **Centralized**: Update labels in one place
✅ **Reliable**: Timeout fallback ensures navigation
✅ **Maintainable**: Easy to add new conversion types
✅ **Debuggable**: Console logs for troubleshooting

## Adding New Pages

To add tracking to a new page:

1. Add Google Ads tag in `<head>` (see step 1)
2. Add script before `</body>`: `<script src="/public/js/contact-tracking.js"></script>`
3. Done! All WhatsApp/phone/email links will be tracked automatically

---

**Last Updated**: October 2025  
**Maintained by**: Samui Vista Team

