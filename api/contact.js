import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, service } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Champs manquants' });
    }

    const clean = (str) =>
      String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const safeName = clean(name);
    const safeEmail = clean(email);
    const safeMessage = clean(message);
    const safeService = clean(service || 'Non spécifié');

    const result = await resend.emails.send({
      from: 'contact@brewyart.com',
      to: ['sebastien@brewyart.com', 'sebbrouillard@gmail.com'],
      replyTo: safeEmail,
      subject: `Nouveau lead – ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="margin-bottom: 20px;">Nouveau message depuis Brewyart</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Service :</strong> ${safeService}</p>
          <hr style="margin: 20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="line-height: 1.6;">${safeMessage}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Erreur Resend:', error);
    return res.status(500).json({
      error: error?.message || "Erreur serveur lors de l'envoi",
    });
  }
}