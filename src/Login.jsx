function Login({ usuarios, setUsuarioActual, setPagina }) {
  const [correo, setCorreo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  function iniciarSesion(e) {
    e.preventDefault();

    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (!usuario) {
      setError('Correo o contraseña incorrectos');
      return;
    }

    setUsuarioActual(usuario);
    setPagina('inicio');
  }

  return (
    <section className="auth">
      <form className="arco-form" onSubmit={iniciarSesion}>
        <h2>Iniciar sesión</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Login;