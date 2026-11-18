import React, { useState, useEffect } from 'react';
import { X, Download, Users, Check, Trash2, ExternalLink, HelpCircle, FileSpreadsheet } from 'lucide-react';
import { eventData } from '../config/eventData';

export const AdminModal = ({ isOpen, onClose }) => {
  const [rsvps, setRsvps] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'guide'

  useEffect(() => {
    if (isOpen) {
      const stored = JSON.parse(localStorage.getItem('baby_shower_rsvps') || '[]');
      setRsvps(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAttending = rsvps.filter((r) => r.attending === 'yes');
  const totalDeclined = rsvps.filter((r) => r.attending === 'no');
  const totalGuests = totalAttending.reduce((acc, curr) => acc + (parseInt(curr.guestCount, 10) || 1), 0);

  const exportCSV = () => {
    if (rsvps.length === 0) return;
    const headers = ['Timestamp', 'Full Name', 'Email', 'Phone', 'Attending', 'Guests Count', 'Additional Guest Names', 'Message'];
    const rows = rsvps.map((r) => [
      `"${r.timestamp || ''}"`,
      `"${r.fullName || ''}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.attending === 'yes' ? 'Attending' : 'Declined'}"`,
      `"${r.guestCount || '1'}"`,
      `"${(r.guestNames || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `baby-shower-rsvp-list-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all local RSVP records?')) {
      localStorage.removeItem('baby_shower_rsvps');
      setRsvps([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] border border-[#CAD4C7] rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#CAD4C7]/60 flex items-center justify-between bg-white/70">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#71856C]">
              Organizer Panel
            </span>
            <h3 className="font-serif text-2xl text-[#2F3F2C]">
              RSVP Guest Responses & Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EBF0E7] hover:bg-[#DCE5D7] flex items-center justify-center text-[#4B5E46] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 bg-white/40 border-b border-[#CAD4C7]/40 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 border-b-2 cursor-pointer transition ${
              activeTab === 'list'
                ? 'border-[#6B7F62] text-[#2F3F2C]'
                : 'border-transparent text-[#71856C] hover:text-[#2F3F2C]'
            }`}
          >
            Guest Responses ({rsvps.length})
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-[#6B7F62] text-[#2F3F2C]'
                : 'border-transparent text-[#71856C] hover:text-[#2F3F2C]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#6B7F62]" />
            <span>Google Sheets Sync Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'list' ? (
            <div className="space-y-5">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#CAD4C7] shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#71856C] block">Total Responses</span>
                  <span className="font-serif text-2xl font-bold text-[#2F3F2C]">{rsvps.length}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#EBF0E7] border border-[#CAD4C7] shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#556B4E] block">Attending</span>
                  <span className="font-serif text-2xl font-bold text-[#2F3F2C]">{totalAttending.length}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#CAD4C7] shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#71856C] block">Total Headcount</span>
                  <span className="font-serif text-2xl font-bold text-[#2F3F2C]">{totalGuests}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={exportCSV}
                  disabled={rsvps.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B7F62] hover:bg-[#586A50] text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to Excel / CSV</span>
                </button>

                {rsvps.length > 0 && (
                  <button
                    onClick={clearData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Local Records</span>
                  </button>
                )}
              </div>

              {/* Table / List */}
              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-[#71856C] bg-white/60 rounded-2xl border border-dashed border-[#CAD4C7]">
                  <Users className="w-10 h-10 mx-auto text-[#A3B89B] mb-2" />
                  <p className="font-serif text-lg text-[#2F3F2C]">No RSVPs Submitted Yet</p>
                  <p className="text-xs text-[#5D6F59] mt-1">Submit the RSVP form on the page to see entries appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#CAD4C7] bg-white">
                  <table className="w-full text-left text-xs text-[#3E4F3B]">
                    <thead className="bg-[#F2F5ED] text-[#2F3F2C] font-semibold border-b border-[#CAD4C7]">
                      <tr>
                        <th className="p-3">Guest Name</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Party Size</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBF0E7]">
                      {rsvps.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF9F5]">
                          <td className="p-3 font-medium text-[#2C3829] whitespace-nowrap">
                            {row.fullName}
                            {row.guestNames && (
                              <span className="block text-[10px] text-[#71856C]">+{row.guestNames}</span>
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                row.attending === 'yes'
                                  ? 'bg-[#EBF0E7] text-[#4F624A]'
                                  : 'bg-[#FAF5EE] text-[#8A714C]'
                              }`}
                            >
                              {row.attending === 'yes' ? 'Attending' : 'Declined'}
                            </span>
                          </td>
                          <td className="p-3 font-semibold">{row.guestCount || 1}</td>
                          <td className="p-3 whitespace-nowrap text-[11px] text-[#5C6E57]">
                            <div>{row.email}</div>
                            {row.phone && <div>{row.phone}</div>}
                          </td>
                          <td className="p-3 max-w-xs truncate text-[11px] text-[#5C6E57]" title={row.message}>
                            {row.message || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* Google Sheets Instructions Guide */
            <div className="space-y-4 text-xs md:text-sm text-[#4E5E4B]">
              <div className="p-4 rounded-2xl bg-[#EBF0E7] border border-[#CAD4C7] space-y-1">
                <h4 className="font-bold text-[#2F3F2C] text-sm">
                  ⚡ 2-Minute Free Google Sheets Setup
                </h4>
                <p>
                  You can stream every RSVP directly into a Google Sheet in real-time using Google Apps Script (100% free, no third-party account required).
                </p>
              </div>

              <ol className="list-decimal list-inside space-y-3 pl-1 leading-relaxed">
                <li>
                  <strong>Create a new Google Sheet:</strong> Name it <em>Baby Shower RSVPs</em>.
                </li>
                <li>
                  <strong>Add Headers in Row 1:</strong>
                  <code className="block mt-1 p-2 rounded-lg bg-white border border-[#CAD4C7] font-mono text-xs text-[#2F3F2C]">
                    Timestamp, Full Name, Email, Phone, Attending, Guest Count, Guest Names, Message
                  </code>
                </li>
                <li>
                  Click <strong>Extensions &gt; Apps Script</strong> in the top menu of your Google Sheet.
                </li>
                <li>
                  Replace the code in the editor with this script:
                  <pre className="mt-2 p-3 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto leading-normal">
{`function doPost(e) {
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
}`}
                  </pre>
                </li>
                <li>
                  Click <strong>Deploy &gt; New deployment</strong>.
                </li>
                <li>
                  Select type: <strong>Web app</strong>. Set <em>Who has access</em> to <strong>Anyone</strong>.
                </li>
                <li>
                  Copy the generated Web App URL and paste it into <code className="px-1.5 py-0.5 rounded bg-white border font-mono">src/config/eventData.js</code> in the <code className="px-1.5 py-0.5 rounded bg-white border font-mono">googleSheetScriptUrl</code> field!
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
