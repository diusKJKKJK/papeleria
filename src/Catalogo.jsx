import { useState } from 'react';
import { PRODUCTOS } from './productos';

function Catalogo({ agregar }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = PRODUCTOS.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="catalogo">
      <div className="buscador">
        <input
          type="search"
          placeholder="Buscar productos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {filtrados.length === 0 && (
        <p className="vacio">No encontramos productos con esa palabra.</p>
      )}

      <div className="rejilla">
        {filtrados.map((p) => (
          <article className="tarjeta" key={p.id}>
            <div className="tarjeta-img">
              <img
  src={p.imagen}
  alt={p.nombre}
  onError={(e) => {
    console.log("Error cargando:", e.target.src);
    e.target.style.display = "none";
  }}
  onLoad={(e) => {
    console.log("Imagen cargada:", e.target.src);
  }}
/>
            </div>
            <p className="tarjeta-nombre">{p.nombre}</p>
            <p className="tarjeta-precio">$ {p.precio}</p>
            <button
              className="btn-carrito"
              type="button"
              onClick={() => agregar(p)}
            >
              🛒 Agregar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;