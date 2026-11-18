# 🌿 Baby Shower Invitation & RSVP • Meera

An interactive Baby Shower Invitation and RSVP web application designed with a **Gender-Neutral Botanical & Eucalyptus** aesthetic (sage green, soft cream, and subtle gold accents).

---

## ✨ Features

- **🌿 Botanical Aesthetic:** Handcrafted eucalyptus sprigs, delicate botanical wreaths, and luxury serif typography (*Cormorant Garamond* & *Great Vibes*).
- **💌 Shareable Digital Invitation Card:**
  - One-click **Save Card Photo (PNG)** to save a high-resolution invitation image formatted for mobile devices and WhatsApp.
  - Guided **Share on WhatsApp** flow.
  - One-click **Copy Text & Link** pre-formatted with event details and the RSVP link.
- **⏰ Live Countdown Timer:** Real-time countdown clock to the celebration date and time (**Sunday, January 17, 2027 at 11:00 AM**).
- **📍 Date & Location Card:**
  - Galileo Gardens, 1223 ON-8, Stoney Creek, ON L8E 5G8, Canada
  - Direct **Open in Google Maps** navigation
  - Add to Google Calendar & Apple Calendar (`.ics`)
- **📝 Streamlined RSVP Form:**
  - Joyfully Accepts / Regretfully Declines
  - Guest and plus-one counts with additional guest names
  - Personal note & wishes for Meera
  - Celebration confetti burst upon RSVP confirmation!
- **🔒 Host Dashboard (Organizer Panel):**
  - View all RSVP submissions in real-time
  - Overview statistics: Total responses, attending count, total headcount
  - One-click **Export to CSV / Excel**
  - Built-in Google Sheets sync integration guide.

---

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📊 Connecting to Google Sheets (2 Minutes, Free)

1. Create a new Google Sheet named **Baby Shower RSVPs**.
2. Add column headers in Row 1:
   ```
   Timestamp | Full Name | Email | Phone | Attending | Guest Count | Guest Names | Message
   ```
3. In the top menu, go to **Extensions > Apps Script**.
4. Replace the code in the editor with:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.timestamp || new Date(),
       data.fullName || '',
       data.email || '',
       data.phone || '',
       data.attending === 'yes' ? 'Attending' : 'Declined',
       data.guestCount || '1',
       data.guestNames || '',
       data.message || ''
     ]);
     return ContentService.createTextOutput(JSON.stringify({result: "success"}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
5. Click **Deploy > New deployment**.
6. Select **Web app**, set *Who has access* to **Anyone**, and click **Deploy**.
7. Copy the generated Web App URL and paste it into [`src/config/eventData.js`](src/config/eventData.js) under `googleSheetScriptUrl`.
