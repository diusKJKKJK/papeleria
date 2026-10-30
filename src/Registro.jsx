import { useState } from 'react';

function Registro({ irA, usuarios, setUsuarios, setUsuarioActual }) {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirma: '',
  });
  const [error, setError] = useState('');

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    if (datos.contrasena !== datos.confirma) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const yaExiste = usuarios.some((u) => u.correo === datos.correo);

    if (yaExiste) {
      setError('Ese correo ya tiene una cuenta.');
      return;
    }

    const nuevo = {
      nombre: datos.nombre,
      correo: datos.correo,
      contrasena: datos.contrasena,
    };

    setUsuarios([...usuarios, nuevo]);
    setUsuarioActual(nuevo);
    setError('');
    irA('inicio');
  };

  return (
    <section className="auth">
      <div className="arco-form">
        <h2>crear cuenta</h2>

        <form onSubmit={enviar}>
          <input
            name="nombre"
            placeholder="nombre"
            value={datos.nombre}
            onChange={cambiar}
            required
          />
          <input
            name="correo"
            type="email"
            placeholder="correo electrónico"
            value={datos.correo}
            onChange={cambiar}
            required
          />
          <input
            name="contrasena"
            type="password"
            placeholder="contraseña"
            value={datos.contrasena}
            onChange={cambiar}
            required
          />
          <input
            name="confirma"
            type="password"
            placeholder="confirma contraseña"
            value={datos.confirma}
            onChange={cambiar}
            required
          />

          {error && <p className="error" role="alert">{error}</p>}

          <button className="btn" type="submit">crear cuenta</button>
        </form>

        <button className="enlace" type="button" onClick={() => irA('login')}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </section>
  );
}

export default Registro;