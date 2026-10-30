import React, { useState } from 'react';
import { PRODUCTOS } from './productos';

import Registro from './Registro';
import Login from './Login';
import Catalogo from './Catalogo';
import Inicio from './inicio';
import Carrito from './Carrito';
import Finalizar from './Finalizar';
import Contacto from './Contacto';

import './App.css';

function App() {
  const [pagina, setPagina] = useState('login');
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const paginasProtegidas = [
    'catalogo',
    'carrito',
    'finalizar',
    'favoritos',
    'tramites'
  ];

  const paginaMostrada =
    paginasProtegidas.includes(pagina) && !usuarioActual
      ? 'login'
      : pagina;

  function agregarAlCarrito(producto) {
    if (producto.stock <= 0) return;

    setCarrito((actual) => {
      const existe = actual.find((p) => p.id === producto.id);

      if (existe) {
        if (existe.cantidad >= producto.stock) return actual;

        return actual.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((p) => p.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function cambiarFavorito(id) {
    setFavoritos((actual) =>
      actual.includes(id)
        ? actual.filter((favorito) => favorito !== id)
        : [...actual, id]
    );
  }

  function cerrarSesion() {
    setUsuarioActual(null);
    setPagina('login');
  }

  const totalArticulos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const productosFavoritos = PRODUCTOS.filter((producto) =>
    favoritos.includes(producto.id)
  );

  return (
    <div className="app">
      <header className="banner">
        <h1>🌈 PAPELERÍA ARCOÍRIS</h1>
        <p>Todo lo que necesitas en un solo lugar</p>
      </header>

      <nav className="nav">
        <button className="nav-link" onClick={() => setPagina('inicio')}>
          Inicio
        </button>

        {!usuarioActual ? (
          <>
            <button className="nav-link" onClick={() => setPagina('login')}>
              Iniciar sesión
            </button>

            <button className="nav-link" onClick={() => setPagina('registro')}>
              Registro
            </button>
          </>
        ) : (
          <button className="nav-link" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        )}

        <button className="nav-link" onClick={() => setPagina('catalogo')}>
          Catálogo
        </button>

        <button className="nav-link" onClick={() => setPagina('favoritos')}>
          ❤️ Favoritos
        </button>

        <button className="nav-link" onClick={() => setPagina('promociones')}>
          Promociones
        </button>

        <button className="nav-link" onClick={() => setPagina('contacto')}>
          Contacto
        </button>

        <button className="nav-link" onClick={() => setPagina('carrito')}>
          🛒 Carrito ({totalArticulos})
        </button>
      </nav>

      <main>
        {paginaMostrada === 'inicio' && (
          <Inicio
            usuario={usuarioActual}
            irCatalogo={() => setPagina('catalogo')}
          />
        )}

        {paginaMostrada === 'login' && (
          <Login
            usuarios={usuarios}
            setUsuarioActual={setUsuarioActual}
            setPagina={setPagina}
          />
        )}

        {paginaMostrada === 'registro' && (
          <Registro
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setUsuarioActual={setUsuarioActual}
            irA={setPagina}
          />
        )}

        {paginaMostrada === 'catalogo' && (
          <Catalogo
            agregar={agregarAlCarrito}
            favoritos={favoritos}
            cambiarFavorito={cambiarFavorito}
          />
        )}

        {paginaMostrada === 'carrito' && (
          <Carrito
            carrito={carrito}
            quitar={quitarDelCarrito}
            setPagina={setPagina}
          />
        )}

        {paginaMostrada === 'finalizar' && (
          <Finalizar
            carrito={carrito}
            vaciar={vaciarCarrito}
            irA={setPagina}
            usuarioActual={usuarioActual}
          />
        )}

        {paginaMostrada === 'favoritos' && (
          <section className="catalogo">
            <h2>❤️ Mis favoritos</h2>

            {productosFavoritos.length === 0 ? (
              <p className="vacio">Todavía no tienes favoritos.</p>
            ) : (
              <div className="rejilla">
                {productosFavoritos.map((producto) => (
                  <article className="tarjeta" key={producto.id}>
                    <div className="tarjeta-img">
                      <img src={producto.imagen} alt={producto.nombre} />
                    </div>

                    <p className="tarjeta-nombre">{producto.nombre}</p>
                    <p className="tarjeta-precio">$ {producto.precio}</p>

                    <button
                      className="btn-carrito"
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={producto.stock <= 0}
                    >
                      {producto.stock <= 0 ? 'Agotado' : '🛒 Agregar'}
                    </button>

                    <button
                      className="enlace"
                      onClick={() => cambiarFavorito(producto.id)}
                    >
                      Quitar favorito
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {paginaMostrada === 'promociones' && (
          <section className="promociones">
            <h2>🎉 Promociones</h2>

            <div className="rejilla">
              <article className="tarjeta">
                <h3>Promoción de lápices</h3>
                <p>Lápices a solo $10</p>
              </article>

              <article className="tarjeta">
                <h3>Colores</h3>
                <p>Cajas de colores a $199</p>
              </article>

              <article className="tarjeta">
                <h3>Libretas</h3>
                <p>Libretas a solo $10</p>
              </article>
            </div>
          </section>
        )}

        {paginaMostrada === 'contacto' && <Contacto />}

        {paginaMostrada === 'tramites' && (
          <section>
            <h2>Trámites</h2>
            <p>Próximamente...</p>
          </section>
        )}
      </main>

      <footer className="pie">
        <p>© 2026 Papelería Arcoíris</p>
      </footer>
    </div>
  );
}

export default App;