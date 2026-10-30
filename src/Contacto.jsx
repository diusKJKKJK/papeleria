function Contacto() {
  return (
    <section className="contacto">
      <h2>📍 Contáctanos</h2>

      <div className="contacto-tarjeta">
        <h3>📞 Teléfono</h3>
        <p>56 2077 3586</p>
        <a href="https://wa.me/525620773586" target="_blank" rel="noreferrer">
          Enviar mensaje por WhatsApp
        </a>
      </div>

      <div className="contacto-tarjeta">
        <h3>📍 Dirección</h3>
        <p>Ejido Santa María Tianguistengo, Estado de México.</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Ejido+Santa+Maria+Tianguistengo+Estado+de+Mexico"
          target="_blank"
          rel="noreferrer"
        >
          Ver ubicación en Google Maps
        </a>
      </div>
    </section>
  );
}

export default Contacto;