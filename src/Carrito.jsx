import React from 'react';

function Carrito({ carrito, quitar, setPagina }) {
  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0
  );

  return (
    <section className="carrito">
      <h2>🛒 Mi carrito</h2>

      {carrito.length === 0 ? (
        <>
          <p className="vacio">Tu carrito está vacío.</p>

          <div className="carrito-centro">
            <button
              className="btn"
              onClick={() => setPagina('catalogo')}
            >
              Ver catálogo
            </button>
          </div>
        </>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((producto) => (
              <li key={producto.id}>
                <div className="carrito-foto">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>

                <span>{producto.nombre}</span>

                <span>
                  {producto.cantidad} × ${producto.precio}
                </span>

                <strong>
                  $ {producto.cantidad * producto.precio}
                </strong>

                <button
                  className="carrito-quitar"
                  onClick={() => quitar(producto.id)}
                  aria-label={`Quitar ${producto.nombre}`}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          <h3 className="carrito-total">
            Total: $ {total}
          </h3>

          <div className="carrito-acciones">
            <button
              className="btn"
              onClick={() => setPagina('finalizar')}
            >
              Finalizar compra
            </button>
          </div>

          <div className="carrito-centro">
            <button
              className="enlace"
              onClick={() => setPagina('catalogo')}
            >
              Seguir comprando
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;