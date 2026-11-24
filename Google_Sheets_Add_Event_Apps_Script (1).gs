/** iWave Event Dashboard - Add Event endpoint (fixed header mapping)
 * Spreadsheet: iWave Event Tracker
 * Deploy as Web App: Execute as Me; Who has access: Anyone
 */
const SPREADSHEET_ID = '12F6rJ1C5wRYuuHjSfDSLx6W4LykCKLUn_KggggykjNA';
const EVENTS_TAB_NAME = 'Events';

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!String(payload.name || '').trim() || !String(payload.region || '').trim()) {
      return json_({ ok: false, error: 'Event name and region/city are required.' });
    }
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(EVENTS_TAB_NAME);
    if (!sheet) throw new Error('Events sheet not found: ' + EVENTS_TAB_NAME);

    const lastCol = sheet.getLastColumn();
    if (!lastCol) throw new Error('Events sheet has no header row. Add headers first.');
    const headers = sheet.getRange(1, 1, 1, lastCol).getDisplayValues()[0];
    const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    const start = payload.start || '';
    const end = payload.end || '';
    const dateShown = payload.dates || [start, end].filter(Boolean).join(' – ');
    const values = {
      id: '',
      event: payload.name || '',
      month: payload.month || '',
      dates: dateShown,
      start: start,
      end: end,
      region: payload.region || '',
      category: payload.category || '',
      attendees: Array.isArray(payload.attendees) ? payload.attendees.join(', ') : (payload.attendees || ''),
      leads: payload.leads ?? '',
      contacts: payload.contacts ?? '',
      reg: payload.reg ?? '',
      setup: payload.setup ?? '',
      mkt: payload.mkt ?? '',
      logistics: payload.logistics ?? '',
      travelCost: payload.travelCost ?? '',
      booth: payload.booth || '',
      rev3: payload.rev3 ?? '',
      rev6: payload.rev6 ?? '',
      rev12: payload.rev12 ?? '',
      feedback: payload.feedback || '',
      notes: payload.notes || ''
    };

    const aliases = {
      id: ['id'],
      event: ['event', 'eventname', 'name'],
      month: ['month'],
      dates: ['datesasshown', 'dates'],
      start: ['startdate', 'start'],
      end: ['enddate', 'end'],
      region: ['regioncity', 'region', 'city'],
      category: ['category'],
      attendees: ['attendeescommaseparated', 'attendees'],
      leads: ['leads', 'leadcount'],
      contacts: ['contacts', 'contactcount'],
      reg: ['registrationusd', 'registration'],
      setup: ['boothsetupusd', 'boothsetup'],
      mkt: ['marketingusd', 'marketing'],
      logistics: ['logisticsusd', 'logistics'],
      travelCost: ['travelstayusd', 'travelandstayusd', 'travelstay'],
      booth: ['boothno', 'boothnumber'],
      rev3: ['revenueexpected3mousd', 'revenueexpected3monthsusd', 'revenueexpected3mo'],
      rev6: ['revenueexpected6mousd', 'revenueexpected6monthsusd', 'revenueexpected6mo'],
      rev12: ['revenueexpected1yrusd', 'revenueexpected1yearusd', 'revenueexpected12monthsusd'],
      feedback: ['feedback'],
      notes: ['notes']
    };

    const row = headers.map(header => {
      const h = norm(header);
      for (const key of Object.keys(aliases)) {
        if (aliases[key].some(alias => h === norm(alias) || h.includes(norm(alias)))) {
          return values[key] === undefined || values[key] === null ? '' : values[key];
        }
      }
      return '';
    });
    sheet.appendRow(row);
    return json_({ ok: true, message: 'Event added', appendedRow: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}
function doGet() {
  return json_({ ok: true, message: 'iWave Event form endpoint is running' });
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
