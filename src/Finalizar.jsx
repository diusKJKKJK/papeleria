import { useState } from 'react';
import { PRODUCTOS } from './productos';
import { supabase } from './supabase';

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

  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');

    const numero = Math.floor(10000 + Math.random() * 90000);

    const { data, error: errPedido } = await supabase
      .from('pedidos')
      .insert({
        user_id: usuarioActual.id,
        numero,
        nombre: datos.nombre,
        telefono: datos.telefono,
        direccion: datos.direccion,
        pago: datos.pago,
        total
      })
      .select('id')
      .single();

    if (errPedido) {
      setError('No se pudo guardar tu pedido. Intenta de nuevo.');
      setEnviando(false);
      return;
    }

    const { error: errItems } = await supabase.from('pedido_items').insert(
      lineas.map((l) => ({
        pedido_id: data.id,
        producto_id: l.id,
        nombre: l.producto.nombre,
        precio: l.producto.precio,
        cantidad: l.cantidad
      }))
    );

    setEnviando(false);

    if (errItems) {
      setError('No se pudo guardar el detalle del pedido.');
      return;
    }

    setPedido({ numero, nombre: datos.nombre, total });
    vaciar();
  };

  if (pedido) {
    return (
      <section className="finalizar">
        <h2>¡Gracias por tu compra, {pedido.nombre}!</h2>
        <p className="finalizar-texto">Tu número de pedido es #{pedido.numero}</p>
        <p className="finalizar-texto">Total: $ {pedido.total}</p>
        <div className="carrito-centro">
          <button className="btn" type="button" onClick={() => irA('catalogo')}>
            seguir comprando
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
          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn" type="submit" disabled={enviando}>
            {enviando ? 'guardando…' : 'confirmar pedido'}
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