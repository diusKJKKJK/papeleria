import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { PRODUCTOS } from './productos';

import Registro from './Registro';
import Login from './Login';
import Catalogo from './Catalogo';
import Carrito from './Carrito';
import Finalizar from './Finalizar';
import Contacto from './Contacto';

import './App.css';

function App() {
  const [pagina, setPagina] = useState('catalogo');
  const [aviso, setAviso] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Solo estas páginas piden sesión. El catálogo y el carrito son libres.
  const paginasProtegidas = ['finalizar', 'favoritos', 'tramites'];

  const paginaMostrada =
    paginasProtegidas.includes(pagina) && !usuarioActual
      ? 'login'
      : pagina;

  function aSesion(mensaje) {
    setAviso(mensaje);
    setMenuAbierto(false);
    setPagina('login');
  }

  function irA(destino) {
    setAviso('');
    setMenuAbierto(false);
    setPagina(destino);
  }

  // Sesión de Supabase
  useEffect(() => {
    const aUsuario = (u) =>
      u
        ? { id: u.id, correo: u.email, nombre: u.user_metadata?.nombre || u.email }
        : null;

    supabase.auth.getSession().then(({ data }) => {
      setUsuarioActual(aUsuario(data.session?.user));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUsuarioActual(aUsuario(session?.user));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Favoritos guardados en la base de datos
  useEffect(() => {
    if (!usuarioActual) {
      setFavoritos([]);
      return;
    }
    supabase
      .from('favoritos')
      .select('producto_id')
      .then(({ data }) => setFavoritos((data || []).map((f) => f.producto_id)));
  }, [usuarioActual?.id]);

  function agregarAlCarrito(producto) {
    if (!usuarioActual) {
      aSesion('Inicia sesión para agregar productos al carrito.');
      return;
    }
    if (producto.stock <= 0) return;
    setToast(`🛒 ${producto.nombre} agregado al carrito`);

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

  async function cambiarFavorito(id) {
    if (!usuarioActual) {
      aSesion('Inicia sesión para guardar tus favoritos.');
      return;
    }

    const esFavorito = favoritos.includes(id);
    setToast(esFavorito ? '🤍 Quitado de favoritos' : '❤️ Agregado a favoritos');
    setFavoritos((actual) =>
      esFavorito ? actual.filter((f) => f !== id) : [...actual, id]
    );

    const { error } = esFavorito
      ? await supabase.from('favoritos').delete()
          .eq('user_id', usuarioActual.id).eq('producto_id', id)
      : await supabase.from('favoritos')
          .insert({ user_id: usuarioActual.id, producto_id: id });

    if (error) {
      // revertir si falló
      setFavoritos((actual) =>
        esFavorito ? [...actual, id] : actual.filter((f) => f !== id)
      );
    }
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    setCarrito([]);
    irA('catalogo');
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
      <header className="topbar">
        <button
          className="menu-btn"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1 className="marca" onClick={() => irA('catalogo')}>
          <span className="marca-icono" aria-hidden="true">🌈</span>
          <span className="marca-texto">PAPELERÍA ARCOÍRIS</span>
        </h1>

        <button className="carrito-btn" onClick={() => irA('carrito')}>
          🛒 <span className="contador">{totalArticulos}</span>
        </button>
      </header>

      {menuAbierto && (
        <div className="overlay" onClick={() => setMenuAbierto(false)} />
      )}

      <nav className={`drawer ${menuAbierto ? 'abierto' : ''}`}>
        <p className="drawer-titulo">
          {usuarioActual ? `Hola, ${usuarioActual.nombre}` : 'Menú'}
        </p>

        <button className="nav-link" onClick={() => irA('catalogo')}>
          Catálogo
        </button>
        <button className="nav-link" onClick={() => irA('favoritos')}>
          ❤️ Favoritos
        </button>
        <button className="nav-link" onClick={() => irA('promociones')}>
          Promociones
        </button>
        <button className="nav-link" onClick={() => irA('contacto')}>
          Contacto
        </button>
        <button className="nav-link" onClick={() => irA('carrito')}>
          🛒 Carrito ({totalArticulos})
        </button>

        <hr />

        {!usuarioActual ? (
          <>
            <button className="nav-link" onClick={() => irA('login')}>
              Iniciar sesión
            </button>
            <button className="nav-link destacado" onClick={() => irA('registro')}>
              Crear cuenta
            </button>
          </>
        ) : (
          <button className="nav-link" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        )}
      </nav>

      <main>
        {paginaMostrada === 'login' && (
          <Login
            aviso={aviso}
            setPagina={irA}
          />
        )}

        {paginaMostrada === 'registro' && (
          <Registro irA={irA} />
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
            setPagina={irA}
          />
        )}

        {paginaMostrada === 'finalizar' && (
          <Finalizar
            carrito={carrito}
            vaciar={vaciarCarrito}
            irA={irA}
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

      {toast && (
        <div className="toast" key={toast} role="status">
          {toast}
        </div>
      )}

      <footer className="pie">
        <p>© 2026 Papelería Arcoíris</p>
      </footer>
    </div>
  );
}

export default App;