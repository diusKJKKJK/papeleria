function Inicio({ usuario, irCatalogo }) {
  return (
    <section className="inicio">
      {usuario ? (
        <>
          <h2>¡Bienvenido, {usuario.nombre}! 🌈</h2>
          <p>Nos alegra tenerte de vuelta en Papelería Arcoíris.</p>
        </>
      ) : (
        <>
          <h2>Bienvenido a Papelería Arcoíris 🌈</h2>
          <p>Todo lo que necesitas en un solo lugar.</p>
        </>
      )}

      <button className="btn" onClick={irCatalogo}>
        Ver catálogo
      </button>
    </section>
  );
}

export default Inicio;