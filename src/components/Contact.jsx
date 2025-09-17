import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="bg-background text-primaryDark py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-kinddaily tracking-widest mb-6">CONTACT</h2>
        <p className="mb-4">Schreib mir gern eine Nachricht.</p>
        <a
          href="mailto:nils@narten.dev"
          className="inline-block bg-white/30 backdrop-blur-md border border-black/10 px-6 py-3 rounded-md hover:border-black/30 transition"
        >
          E-Mail senden
        </a>
      </div>
    </section>
  );
}


