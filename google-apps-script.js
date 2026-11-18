/**
 * Google Apps Script for Harsh & Meera's Baby Shower RSVP
 *
 * HOW TO SET UP:
 * 1. Create a Google Sheet named "Harsh & Meera Baby Shower RSVPs"
 * 2. Set Row 1 headers as:
 *    A1: Timestamp
 *    B1: Full Name
 *    C1: Email
 *    D1: Phone
 *    E1: Attending Status
 *    F1: Party Size
 *    G1: Additional Guest Names
 *    H1: Wishes / Message
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code and save (Cmd+S or Ctrl+S)
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 *    - Description: "RSVP Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click Deploy, Authorize access, and copy the Web App URL!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent requests

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Format submission date/time
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Append row matching the form fields
    sheet.appendRow([
      formattedDate,
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.attending === 'yes' ? 'Joyfully Attends 🌿' : 'Regretfully Declines 🕊️',
      data.attending === 'yes' ? (data.guestCount || '1') : '0',
      data.guestNames || '',
      data.message || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "RSVP recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Test function: visiting URL in browser returns friendly confirmation
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "Harsh & Meera's Baby Shower RSVP Webhook is active!"
  })).setMimeType(ContentService.MimeType.JSON);
}
