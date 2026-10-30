import { useState } from 'react';
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
    'tramites'
  ];

  const paginaMostrada =
    paginasProtegidas.includes(pagina) && !usuarioActual
      ? 'login'
      : pagina;

  function agregarAlCarrito(producto) {
    if (producto.stock === 0) return;

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

  function cambiarFavorito(producto) {
    setFavoritos((actual) =>
      actual.some((p) => p.id === producto.id)
        ? actual.filter((p) => p.id !== producto.id)
        : [...actual, producto]
    );
  }

  const totalArticulos = carrito.reduce(
    (total, p) => total + p.cantidad,
    0
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

        <button className="nav-link" onClick={() => setPagina('login')}>
          Iniciar sesión
        </button>

        <button className="nav-link" onClick={() => setPagina('registro')}>
          Registro
        </button>

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
            setPagina={setPagina}
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
            vaciarCarrito={vaciarCarrito}
            usuarioActual={usuarioActual}
            setPagina={setPagina}
          />
        )}

        {paginaMostrada === 'favoritos' && (
          <section className="catalogo">
            <h2>❤️ Mis favoritos</h2>

            {favoritos.length === 0 ? (
              <p className="vacio">Todavía no tienes favoritos.</p>
            ) : (
              <div className="rejilla">
                {favoritos.map((p) => (
                  <article className="tarjeta" key={p.id}>
                    <div className="tarjeta-img">
                      <img src={p.imagen} alt={p.nombre} />
                    </div>

                    <p className="tarjeta-nombre">{p.nombre}</p>
                    <p className="tarjeta-precio">$ {p.precio}</p>

                    <button
                      className="btn-carrito"
                      onClick={() => agregarAlCarrito(p)}
                      disabled={p.stock === 0}
                    >
                      🛒 Agregar
                    </button>

                    <button
                      className="btn-carrito"
                      onClick={() => cambiarFavorito(p)}
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