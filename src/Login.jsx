import React, { useState } from 'react';
import { supabase } from './supabase';

function Login({ aviso, setPagina }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function iniciarSesion(e) {
    e.preventDefault();
    setCargando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password
    });
    setCargando(false);

    if (error) {
      setError('Correo o contraseña incorrectos.');
      return;
    }
    setPagina('catalogo');
  }

  return (
    <section className="auth">
      <form className="arco-form" onSubmit={iniciarSesion}>
        <h2>Iniciar sesión</h2>
        {aviso && <p className="aviso">{aviso}</p>}
        {error && <p className="error" role="alert">{error}</p>}

        <input type="email" placeholder="Correo electrónico" value={correo}
          onChange={(e) => setCorreo(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        <button className="btn" type="submit" disabled={cargando}>
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
        <button className="enlace" type="button" onClick={() => setPagina('registro')}>
          ¿No tienes cuenta? Regístrate
        </button>
      </form>
    </section>
  );
}

export default Login;
