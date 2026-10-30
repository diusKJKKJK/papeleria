import { useState } from 'react';
import './App.css';
import Registro from './Registro';
import Login from './Login';
import Catalogo from './Catalogo';
import Inicio from './Inicio';
import Carrito from './Carrito';
import Finalizar from './Finalizar';

function App() {
  const [pagina, setPagina] = useState('login');
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const paginasProtegidas = ['catalogo', 'carrito', 'finalizar', 'tramites'];

  const paginaMostrada =
    paginasProtegidas.includes(pagina) && !usuarioActual ? 'login' : pagina;

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { id: producto.id, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalArticulos = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <div className="app">
      <header className="banner">
        <h1>PAPELERÍA ARCOÍRIS</h1>
      </header>

      <nav className="nav">
        <button className="nav-link morado" onClick={() => setPagina('inicio')}>
          Inicio
        </button>
        <button className="nav-link celeste" onClick={() => setPagina('login')}>
          Login
        </button>
        <button className="nav-link rosa" onClick={() => setPagina('registro')}>
          Registro
        </button>
        <button className="nav-link naranja" onClick={() => setPagina('catalogo')}>
          Catálogo
        </button>
        <button className="nav-link verde" onClick={() => setPagina('carrito')}>
          Carrito{totalArticulos > 0 && ` (${totalArticulos})`}
        </button>
      </nav>

      <main>
        {paginaMostrada === 'inicio' && (
          <Inicio usuarioActual={usuarioActual} irA={setPagina} />
        )}

        {paginaMostrada === 'login' && (
          <Login
            irA={setPagina}
            usuarios={usuarios}
            setUsuarioActual={setUsuarioActual}
          />
        )}

        {paginaMostrada === 'registro' && (
          <Registro
            irA={setPagina}
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setUsuarioActual={setUsuarioActual}
          />
        )}

        {paginaMostrada === 'catalogo' && <Catalogo agregar={agregarAlCarrito} />}

        {paginaMostrada === 'carrito' && (
          <Carrito carrito={carrito} quitar={quitarDelCarrito} irA={setPagina} />
        )}

        {paginaMostrada === 'finalizar' && (
          <Finalizar
            carrito={carrito}
            vaciar={vaciarCarrito}
            irA={setPagina}
            usuarioActual={usuarioActual}
          />
        )}

        {paginaMostrada === 'tramites' && <h2>Trámites</h2>}
      </main>

      <footer className="pie">© 2026 Papelería Arcoíris</footer>
    </div>
  );
}

export default App;