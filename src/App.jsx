import { useState } from 'react';
import './App.css';
import Registro from './Registro';
import Login from './Login';
import Catalogo from './Catalogo';
import Inicio from './inicio';
import Carrito from './Carrito';
import Finalizar from './Finalizar';
import { PRODUCTOS } from './productos';

function App() {
const [pagina, setPagina] = useState('login');
const [usuarios, setUsuarios] = useState([]);
const [usuarioActual, setUsuarioActual] = useState(null);
const [carrito, setCarrito] = useState([]);
const [favoritos, setFavoritos] = useState([]);

const paginasProtegidas = ['catalogo', 'carrito', 'finalizar', 'tramites'];

const paginaMostrada =
paginasProtegidas.includes(pagina) && !usuarioActual ? 'login' : pagina;

const agregarAlCarrito = (producto) => {
const existe = carrito.find((item) => item.id === producto.id);

```
if (existe) {
  setCarrito(carrito.map((item) =>
    item.id === producto.id
      ? { ...item, cantidad: item.cantidad + 1 }
      : item
  ));
} else {
  setCarrito([...carrito, { id: producto.id, cantidad: 1 }]);
}
```

};

const quitarDelCarrito = (id) => {
setCarrito(carrito.filter((item) => item.id !== id));
};

const vaciarCarrito = () => setCarrito([]);

const cambiarFavorito = (id) => {
setFavoritos((actuales) =>
actuales.includes(id)
? actuales.filter((favorito) => favorito !== id)
: [...actuales, id]
);
};

const totalArticulos = carrito.reduce(
(suma, item) => suma + item.cantidad, 0
);

return ( <div className="app"> <header className="banner"> <h1>PAPELERÍA ARCOÍRIS</h1> </header>

```
  <nav className="nav">
    <button className="nav-link morado" onClick={() => setPagina('inicio')}>Inicio</button>
    <button className="nav-link celeste" onClick={() => setPagina('login')}>Login</button>
    <button className="nav-link rosa" onClick={() => setPagina('registro')}>Registro</button>
    <button className="nav-link naranja" onClick={() => setPagina('catalogo')}>Catálogo</button>
    <button className="nav-link verde" onClick={() => setPagina('carrito')}>
      Carrito{totalArticulos > 0 && ` (${totalArticulos})`}
    </button>
    <button className="nav-link rosa" onClick={() => setPagina('promociones')}>Promociones</button>
    <button className="nav-link morado" onClick={() => setPagina('favoritos')}>
      Favoritos ❤️ ({favoritos.length})
    </button>
  </nav>

  <main>
    {paginaMostrada === 'inicio' && (
      <Inicio usuarioActual={usuarioActual} irA={setPagina} />
    )}

    {paginaMostrada === 'login' && (
      <Login irA={setPagina} usuarios={usuarios} setUsuarioActual={setUsuarioActual} />
    )}

    {paginaMostrada === 'registro' && (
      <Registro irA={setPagina} usuarios={usuarios} setUsuarios={setUsuarios} setUsuarioActual={setUsuarioActual} />
    )}

    {paginaMostrada === 'catalogo' && (
      <Catalogo agregar={agregarAlCarrito} favoritos={favoritos} cambiarFavorito={cambiarFavorito} />
    )}

    {paginaMostrada === 'carrito' && (
      <Carrito carrito={carrito} quitar={quitarDelCarrito} irA={setPagina} />
    )}

    {paginaMostrada === 'finalizar' && (
      <Finalizar carrito={carrito} vaciar={vaciarCarrito} irA={setPagina} usuarioActual={usuarioActual} />
    )}

    {paginaMostrada === 'promociones' && (
      <section className="promociones">
        <h2>🎉 Promociones especiales</h2>
        <div className="rejilla">
          <article className="tarjeta"><div className="tarjeta-img">✏️</div><h3>Lápices</h3><p>Precio especial: $10</p></article>
          <article className="tarjeta"><div className="tarjeta-img">🖍️</div><h3>Colores</h3><p>Precio especial: $199</p></article>
          <article className="tarjeta"><div className="tarjeta-img">📚</div><h3>Libretas</h3><p>Precio especial: $10</p></article>
        </div>
      </section>
    )}

    {paginaMostrada === 'favoritos' && (
      <section className="catalogo">
        <h2 style={{ textAlign: 'center' }}>❤️ Mis favoritos</h2>
        {favoritos.length === 0 ? (
          <p className="vacio">Todavía no tienes favoritos.</p>
        ) : (
          <div className="rejilla">
            {PRODUCTOS.filter((p) => favoritos.includes(p.id)).map((p) => (
              <article className="tarjeta" key={p.id}>
                <div className="tarjeta-img">
                  <img src={p.imagen} alt={p.nombre} />
                </div>
                <p className="tarjeta-nombre">{p.nombre}</p>
                <p className="tarjeta-precio">$ {p.precio}</p>
                <button className="btn-carrito" onClick={() => agregarAlCarrito(p)}>
                  🛒 Agregar
                </button>
                <button className="enlace" onClick={() => cambiarFavorito(p.id)}>
                  Quitar de favoritos
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    )}
  </main>

  <footer className="pie">© 2026 Papelería Arcoíris</footer>
</div>


);
}

export default App;
