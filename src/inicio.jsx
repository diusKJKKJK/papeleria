function Inicio({ usuarioActual, irA }) {
  return (
    <section className="inicio">
      <p className="inicio-saludo">
        {usuarioActual ? `Bienvenido/a, ${usuarioActual.nombre}` : 'Bienvenido/a'}
      </p>

      <h2 className="inicio-titulo">Papelería Arcoíris</h2>

      <button className="btn" type="button" onClick={() => irA('catalogo')}>
        ver catálogo
      </button>
    </section>
  );
}

export default Inicio;