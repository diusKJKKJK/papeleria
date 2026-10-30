import { PRODUCTOS } from './productos';

function Carrito({ carrito, quitar, irA }) {
  const lineas = carrito.map((item) => ({
    ...item,
    producto: PRODUCTOS.find((p) => p.id === item.id),
  }));

  const total = lineas.reduce(
    (suma, linea) => suma + linea.producto.precio * linea.cantidad,
    0
  );

  if (lineas.length === 0) {
    return (
      <section className="carrito">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío.</p>
        <div className="carrito-centro">
          <button className="btn" type="button" onClick={() => irA('catalogo')}>
            ver catálogo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="carrito">
      <h2>Carrito</h2>

      <ul className="carrito-lista">
        {lineas.map((linea) => (
          <li key={linea.id}>
            <span className="carrito-foto">
              {linea.producto.imagen ? (
                <img src={linea.producto.imagen} alt={linea.producto.nombre} />
              ) : (
                linea.producto.emoji
              )}
            </span>
            <span className="carrito-nombre">{linea.producto.nombre}</span>
            <span>x {linea.cantidad}</span>
            <strong>$ {linea.producto.precio * linea.cantidad}</strong>
            <button
              className="carrito-quitar"
              type="button"
              onClick={() => quitar(linea.id)}
              aria-label={`Quitar ${linea.producto.nombre}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="carrito-total">
        Total: <strong>$ {total}</strong>
      </p>

      <div className="carrito-acciones">
        <button className="btn" type="button" onClick={() => irA('finalizar')}>
          finalizar compra
        </button>
      </div>
    </section>
  );
}

export default Carrito;