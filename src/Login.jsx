import { useState } from 'react';

function Login({ irA, usuarios, setUsuarioActual }) {
  const [datos, setDatos] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();

    const encontrado = usuarios.find(
      (u) => u.correo === datos.correo && u.contrasena === datos.contrasena
    );

    if (!encontrado) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    setError('');
    setUsuarioActual(encontrado);
    irA('catalogo');
  };

  return (
    <section className="auth">
      <div className="arco-form">
        <h2>Iniciar sesión</h2>

        <form onSubmit={enviar}>
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

          {error && <p className="error" role="alert">{error}</p>}

          <button className="btn" type="submit">Iniciar</button>
        </form>
      </div>
    </section>
  );
}

export default Login;