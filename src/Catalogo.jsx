import { useState } from 'react';
import { PRODUCTOS } from './productos';

function Catalogo({ agregar, favoritos = [], cambiarFavorito = () => {} }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [precioMaximo, setPrecioMaximo] = useState('Todos');

  const filtrados = PRODUCTOS.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria;
    const coincidePrecio = precioMaximo === 'Todos' || p.precio <= Number(precioMaximo);

    return coincideNombre && coincideCategoria && coincidePrecio;
  });

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

      <div className="filtro-precio">
        <label>Categoría:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Todas">Todas</option>
          <option value="Adhesivos">Adhesivos</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Escritura">Escritura</option>
          <option value="Papelería">Papelería</option>
          <option value="Arte">Arte</option>
          <option value="Geometría">Geometría</option>
        </select>

        <label>Precio máximo:</label>
        <select value={precioMaximo} onChange={(e) => setPrecioMaximo(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="10">$10</option>
          <option value="50">$50</option>
          <option value="100">$100</option>
          <option value="200">$200</option>
        </select>
      </div>

      {filtrados.length === 0 && (
        <p className="vacio">No encontramos productos.</p>
      )}

      <div className="rejilla">
        {filtrados.map((p) => (
          <article className="tarjeta" key={p.id}>
            <div className="tarjeta-img">
              <img src={p.imagen} alt={p.nombre} />
            </div>

            <p className="tarjeta-nombre">{p.nombre}</p>
            <p className="tarjeta-precio">$ {p.precio}</p>
            <p>{p.categoria}</p>

            <p style={{ color: p.stock > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
              {p.stock > 0 ? `Disponible: ${p.stock} unidades` : 'Agotado'}
            </p>

            <button
              className="btn-carrito"
              type="button"
              disabled={p.stock === 0}
              onClick={() => agregar(p)}
            >
              {p.stock > 0 ? '🛒 Agregar' : 'No disponible'}
            </button>

            <button
              className="btn-carrito"
              type="button"
              onClick={() => cambiarFavorito(p)}
            >
              {favoritos.some((f) => f.id === p.id)
                ? '❤️ Quitar favorito'
                : '🤍 Favorito'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;