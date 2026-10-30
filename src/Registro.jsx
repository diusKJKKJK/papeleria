import React, { useState } from 'react';

function Registro({ irA, usuarios, setUsuarios, setUsuarioActual }) {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirma: ''
  });

  const [error, setError] = useState('');

  const cambiar = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const enviar = (e) => {
    e.preventDefault();

    if (datos.contrasena !== datos.confirma) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const yaExiste = usuarios.some(
      (usuario) => usuario.correo === datos.correo
    );

    if (yaExiste) {
      setError('Ese correo ya tiene una cuenta.');
      return;
    }

    const nuevo = {
      nombre: datos.nombre,
      correo: datos.correo,
      contrasena: datos.contrasena
    };

    setUsuarios((actuales) => [...actuales, nuevo]);
    setUsuarioActual(nuevo);
    setError('');
    irA('inicio');
  };

  return (
    <section className="auth">
      <div className="arco-form">
        <h2>Crear cuenta</h2>

        <form onSubmit={enviar}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={datos.nombre}
            onChange={cambiar}
            required
          />

          <input
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            value={datos.correo}
            onChange={cambiar}
            required
          />

          <input
            name="contrasena"
            type="password"
            placeholder="Contraseña"
            value={datos.contrasena}
            onChange={cambiar}
            required
          />

          <input
            name="confirma"
            type="password"
            placeholder="Confirma contraseña"
            value={datos.confirma}
            onChange={cambiar}
            required
          />

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="btn" type="submit">
            Crear cuenta
          </button>
        </form>

        <button
          className="enlace"
          type="button"
          onClick={() => irA('login')}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </section>
  );
}

export default Registro;