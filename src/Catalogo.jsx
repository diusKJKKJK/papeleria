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

  // Ignora mayúsculas, acentos y plurales (lapices → lápiz)
  const normalizar = (texto) =>
    texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const singular = (palabra) => {
    if (palabra.length <= 3) return palabra;
    if (palabra.endsWith('ces')) return palabra.slice(0, -3) + 'z';
    if (palabra.endsWith('es')) return palabra.slice(0, -2);
    if (palabra.endsWith('s')) return palabra.slice(0, -1);
    return palabra;
  };

  const termino = normalizar(busqueda);
  const terminoSingular = singular(termino);

  const coincide = (producto) => {
    const texto = normalizar(`${producto.nombre} ${producto.categoria}`);
    return texto.includes(termino) || texto.includes(terminoSingular);
  };

  const filtrados = PRODUCTOS.filter((producto) =>
    coincide(producto) &&
    (precioMaximo === '' || producto.precio <= Number(precioMaximo)) &&
    (categoria === '' || producto.categoria === categoria)
  );

  return (
    <section className="catalogo">
      <div className="hero">
        <span className="hero-etiqueta">✨ Nueva colección</span>
        <p className="hero-titulo">Todo para crear, escribir y soñar</p>
        <p className="hero-texto">
          Útiles escolares y de arte con estilo, a precios que sí te gustan.
        </p>
      </div>

      <div className="cinta" aria-hidden="true">
        <div className="cinta-pista">
          {[0, 1].map((i) => (
            <span key={i}>
              ✦ Envíos rápidos ✦ Precios bajos ✦ Calidad escolar ✦ Arte y creatividad
            </span>
          ))}
        </div>
      </div>

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
              {producto.stock <= 0 ? (
                <span className="etiqueta agotado">Agotado</span>
              ) : producto.stock <= 5 ? (
                <span className="etiqueta pocas">Últimas piezas</span>
              ) : null}
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