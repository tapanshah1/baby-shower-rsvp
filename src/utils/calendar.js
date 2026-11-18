import { eventData } from '../config/eventData';

export function getGoogleCalendarUrl() {
  const start = new Date(eventData.eventDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(eventData.eventEndDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");
  
  const title = encodeURIComponent(`Baby Shower for ${eventData.parentsNames}`);
  const details = encodeURIComponent(
    `Join us for ${eventData.parentsNames}'s Baby Shower!\nVenue: ${eventData.venue.name}, ${eventData.venue.addressLine1}, ${eventData.venue.addressLine2}\nRSVP & Info: ${window.location.href}`
  );
  const location = encodeURIComponent(`${eventData.venue.name}, ${eventData.venue.addressLine1}, ${eventData.venue.addressLine2}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function downloadIcsFile() {
  const start = new Date(eventData.eventDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(eventData.eventEndDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Baby Shower RSVP//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:Baby Shower for ${eventData.parentsNames}`,
    `DESCRIPTION:Join us for ${eventData.parentsNames}'s Baby Shower celebration!`,
    `LOCATION:${eventData.venue.name}, ${eventData.venue.addressLine1}, ${eventData.venue.addressLine2}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `baby-shower-${eventData.parentsNames.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
