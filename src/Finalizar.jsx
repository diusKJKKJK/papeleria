import { useState } from 'react';
import { PRODUCTOS } from './productos';

function Finalizar({ carrito, vaciar, irA, usuarioActual }) {
  const [datos, setDatos] = useState({
    nombre: usuarioActual ? usuarioActual.nombre : '',
    telefono: '',
    direccion: '',
    pago: 'efectivo',
  });
  const [pedido, setPedido] = useState(null);

  const lineas = carrito.map((item) => ({
    ...item,
    producto: PRODUCTOS.find((p) => p.id === item.id),
  }));

  const total = lineas.reduce(
    (suma, linea) => suma + linea.producto.precio * linea.cantidad,
    0
  );

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    setPedido({
      numero: Math.floor(10000 + Math.random() * 90000),
      nombre: datos.nombre,
      total: total,
    });

    vaciar();
  };

  if (pedido) {
    return (
      <section className="finalizar">
        <h2>¡Gracias por tu compra, {pedido.nombre}!</h2>
        <p className="finalizar-texto">Tu número de pedido es #{pedido.numero}</p>
        <p className="finalizar-texto">Total: $ {pedido.total}</p>
        <div className="carrito-centro">
          <button className="btn" type="button" onClick={() => irA('inicio')}>
            volver al inicio
          </button>
        </div>
      </section>
    );
  }

  if (lineas.length === 0) {
    return (
      <section className="finalizar">
        <h2>Finalizar compra</h2>
        <p className="finalizar-texto">Tu carrito está vacío.</p>
        <div className="carrito-centro">
          <button className="btn" type="button" onClick={() => irA('catalogo')}>
            ver catálogo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="finalizar">
      <h2>Finalizar compra</h2>

      <div className="finalizar-resumen">
        <h3>Tu pedido</h3>
        <ul>
          {lineas.map((linea) => (
            <li key={linea.id}>
              <span>
                {linea.producto.nombre} x {linea.cantidad}
              </span>
              <strong>$ {linea.producto.precio * linea.cantidad}</strong>
            </li>
          ))}
        </ul>
        <p className="finalizar-total">
          Total: <strong>$ {total}</strong>
        </p>
      </div>

      <form className="finalizar-form" onSubmit={enviar}>
        <h3>Tus datos</h3>

        <label>
          Nombre
          <input
            name="nombre"
            value={datos.nombre}
            onChange={cambiar}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            name="telefono"
            type="tel"
            placeholder="10 números"
            pattern="[0-9]{10}"
            title="Escribe 10 números, sin espacios"
            value={datos.telefono}
            onChange={cambiar}
            required
          />
        </label>

        <label>
          Dirección de entrega
          <input
            name="direccion"
            value={datos.direccion}
            onChange={cambiar}
            required
          />
        </label>

        <label>
          Forma de pago
          <select name="pago" value={datos.pago} onChange={cambiar}>
            <option value="efectivo">Efectivo al recibir</option>
            <option value="tarjeta">Tarjeta al recibir</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </label>

        <div className="finalizar-botones">
          <button className="btn" type="submit">
            confirmar pedido
          </button>
          <button
            className="enlace"
            type="button"
            onClick={() => irA('carrito')}
          >
            volver al carrito
          </button>
        </div>
      </form>
    </section>
  );
}

export default Finalizar;