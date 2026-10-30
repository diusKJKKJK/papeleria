import { useState } from 'react';
import { PRODUCTOS } from './productos';

function Catalogo({ agregar }) {
const [busqueda, setBusqueda] = useState('');
const [precioMaximo, setPrecioMaximo] = useState('');

const filtrados = PRODUCTOS.filter((p) =>
p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
(precioMaximo === '' || p.precio <= Number(precioMaximo))
);

return ( <section className="catalogo"> <div className="buscador">
<input
type="search"
placeholder="Buscar productos"
value={busqueda}
onChange={(e) => setBusqueda(e.target.value)}
/> </div>

```
  <div className="filtro-precio">
    <label htmlFor="precioMaximo">Precio máximo:</label>
    <select
      id="precioMaximo"
      value={precioMaximo}
      onChange={(e) => setPrecioMaximo(e.target.value)}
    >
      <option value="">Todos los precios</option>
      <option value="10">Hasta $10</option>
      <option value="50">Hasta $50</option>
      <option value="100">Hasta $100</option>
      <option value="200">Hasta $200</option>
    </select>
  </div>

  {filtrados.length === 0 && (
    <p className="vacio">No encontramos productos con esos filtros.</p>
  )}

  <div className="rejilla">
    {filtrados.map((p) => (
      <article className="tarjeta" key={p.id}>
        <div className="tarjeta-img">
          <img
            src={p.imagen}
            alt={p.nombre}
            onError={(e) => {
              e.target.style.display = 'none';
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
