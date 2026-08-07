// INTIARA — contact form handler. Sends enquiries via Resend.
// Requires env var RESEND_API_KEY (Netlify → Site settings → Environment variables).
// Optional: CONTACT_TO (default hello@intiara.com.pe), CONTACT_FROM (default noreply@intiara.com.pe).

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return resp(405, { error: 'Method not allowed' });

  let d;
  try { d = JSON.parse(event.body || '{}'); }
  catch { return resp(400, { error: 'Invalid request.' }); }

  // Honeypot — real visitors leave this empty; bots fill it. Pretend success, send nothing.
  if (d.company) return resp(200, { ok: true });

  const name    = String(d.name    || '').trim().slice(0, 120);
  const email   = String(d.email   || '').trim().slice(0, 160);
  const subject = String(d.subject || 'General enquiry').trim().slice(0, 120);
  const message = String(d.message || '').trim().slice(0, 5000);

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return resp(400, { error: 'Please complete every field with a valid email address.' });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return resp(500, { error: 'Email is not configured yet.' });

  const to   = process.env.CONTACT_TO   || 'hello@intiara.com.pe';
  const from = process.env.CONTACT_FROM || 'INTIARA <noreply@intiara.com.pe>';

  let r;
  try {
    r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `INTIARA · ${subject} — ${name}`,
        text:
          'New enquiry from intiara.com.pe\n\n' +
          `Name:    ${name}\n` +
          `Email:   ${email}\n` +
          `Subject: ${subject}\n\n` +
          `${message}\n`,
      }),
    });
  } catch (err) {
    return resp(502, { error: 'Could not send. Please email hello@intiara.com.pe.' });
  }

  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    return resp(502, { error: 'Could not send. Please email hello@intiara.com.pe.', detail: detail.slice(0, 300) });
  }
  return resp(200, { ok: true });
};

function resp(statusCode, body) {
  return { statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}
