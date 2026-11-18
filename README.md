# 🌿 Baby Shower Invitation & RSVP Web App

A modern, elegant, and interactive Baby Shower Invitation and RSVP web application designed with a **Gender-Neutral Botanical & Eucalyptus** aesthetic (sage green, soft cream, and subtle gold accents).

---

## ✨ Features

- **🌿 Botanical Aesthetic:** Handcrafted eucalyptus sprigs, delicate botanical wreaths, and luxury serif typography (*Cormorant Garamond* & *Great Vibes*).
- **💌 Shareable Digital Invitation Card:**
  - One-click **Download Card (PNG)** to save a high-resolution invitation image formatted for mobile devices, WhatsApp, or Instagram.
  - One-click **Copy WhatsApp Message** pre-formatted with event details and the RSVP link.
- **⏰ Live Countdown Timer:** Real-time countdown clock to the celebration date and time.
- **📝 Interactive RSVP Form:**
  - Joyfully Accepts / Regretfully Declines
  - Guest and plus-one counts with additional guest names
  - Dietary requirements selection (Vegetarian, Vegan, Gluten-Free, Allergies, etc.)
  - Diaper Raffle opt-in checkbox
  - Personal note & wishes for the parents-to-be
  - Celebration confetti burst upon RSVP confirmation!
- **📅 Calendar Integration:**
  - One-click **Add to Google Calendar**
  - Downloadable **Apple Calendar / Outlook (`.ics`)** file
- **📍 Event Details & Timeline:**
  - Venue address with direct Google Maps link & parking directions
  - Afternoon schedule / itinerary with timeline checkpoints
  - Special notes: *Bring a Book Instead of a Card*, *Diaper Raffle*, and *Dress Palette*
- **🎁 Gift Registry:** Quick links to Babylist, Amazon Baby, and Target.
- **🔒 Host Dashboard (Organizer Panel):**
  - View all RSVP submissions in real-time
  - Overview statistics: Total responses, attending count, total headcount, diaper raffle count
  - One-click **Export to CSV / Excel**
  - Built-in Google Sheets sync integration guide.

---

## 🚀 Quick Start

The development server is running at:
```bash
http://localhost:5173
```

To run commands in the project:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 How to Customize Event Details

All event information is centralized in a single, simple configuration file:
👉 **[`src/config/eventData.js`](file:///Users/vartittech/Data/personal/rsvp/src/config/eventData.js)**

You can easily modify:
- **`parentsNames`**: Names of the parents-to-be (e.g., `"Tapan & Riddhi"`).
- **`babyTitle`**: Baby moniker (e.g., `"Baby Shah"`).
- **`dateFormatted`** & **`timeFormatted`**: Display date and time.
- **`eventDateTimeISO`**: ISO datetime used by the countdown timer and calendar links.
- **`venue`**: Name, address lines, and Google Maps URL.
- **`schedule`**: Time slots and activities for the afternoon.
- **`registries`**: Links and descriptions for your gift registries.
- **`faqs`**: Common guest questions and answers.
- **`googleSheetScriptUrl`**: Your Google Apps Script Web App URL for live spreadsheet logging.

---

## 📊 Connecting to Google Sheets (2 Minutes, Free)

1. Create a new Google Sheet named **Baby Shower RSVPs**.
2. Add column headers in Row 1:
   ```
   Timestamp | Full Name | Email | Phone | Attending | Guest Count | Guest Names | Dietary | Dietary Notes | Diaper Raffle | Message
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
       data.dietary || '',
       data.dietaryNotes || '',
       data.diaperRaffle ? 'Yes' : 'No',
       data.message || ''
     ]);
     return ContentService.createTextOutput(JSON.stringify({result: "success"}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
5. Click **Deploy > New deployment**.
6. Select **Web app**, set *Who has access* to **Anyone**, and click **Deploy**.
7. Copy the generated Web App URL and paste it into [`src/config/eventData.js`](file:///Users/vartittech/Data/personal/rsvp/src/config/eventData.js) under `googleSheetScriptUrl`.

> **Note:** Even without Google Sheets configured, all RSVPs are automatically stored locally in the browser and can be viewed or exported to CSV anytime via the **Host Dashboard** link in the footer!
