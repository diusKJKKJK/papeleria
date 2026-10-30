import React, { useState } from 'react';
import { PRODUCTOS } from './productos';

function Catalogo({
  agregar,
  favoritos = [],
  cambiarFavorito = () => {}
}) {
  const [busqueda, setBusqueda] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [categoria, setCategoria] = useState('');

  const filtrados = PRODUCTOS.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (precioMaximo === '' || producto.precio <= Number(precioMaximo)) &&
    (categoria === '' || producto.categoria === categoria)
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

      <div className="filtro-precio">
        <label htmlFor="categoria">Categoría:</label>

        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="Adhesivos">Adhesivos</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Escritura">Escritura</option>
          <option value="Papelería">Papelería</option>
          <option value="Arte">Arte</option>
          <option value="Geometría">Geometría</option>
        </select>

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
        <p className="vacio">No encontramos productos.</p>
      )}

      <div className="rejilla">
        {filtrados.map((producto) => (
          <article className="tarjeta" key={producto.id}>
            <div className="tarjeta-img">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <p className="tarjeta-nombre">{producto.nombre}</p>
            <p>{producto.categoria}</p>
            <p className="tarjeta-precio">$ {producto.precio}</p>

            <p>
              {producto.stock > 0
                ? `Disponibles: ${producto.stock}`
                : 'Producto agotado'}
            </p>

            <button
              className="btn-carrito"
              onClick={() => agregar(producto)}
              disabled={producto.stock <= 0}
            >
              {producto.stock <= 0 ? 'Agotado' : '🛒 Agregar'}
            </button>

            <button
              className="enlace"
              onClick={() => cambiarFavorito(producto.id)}
            >
              {favoritos.includes(producto.id)
                ? '❤️ Quitar favorito'
                : '🤍 Agregar favorito'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;