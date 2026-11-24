
import React, { useState } from 'react';
import { supabase } from './supabase';
 
function Registro({ irA }) {
  const [datos, setDatos] = useState({ nombre: '', correo: '', contrasena: '', confirma: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
 
  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
 
  const enviar = async (e) => {
    e.preventDefault();
 
    if (datos.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (datos.contrasena !== datos.confirma) {
      setError('Las contraseñas no coinciden.');
      return;
    }
 
    setCargando(true);
    const { data, error } = await supabase.auth.signUp({
      email: datos.correo,
      password: datos.contrasena,
      options: { data: { nombre: datos.nombre } }
    });
    setCargando(false);
 
    if (error) {
      console.error('Error de registro:', error);
      const msg = (error.message || '').toLowerCase();
 
      if (msg.includes('registered')) {
        setError('Ese correo ya tiene una cuenta.');
      } else if (msg.includes('rate limit')) {
        setError('Se enviaron demasiados correos. Espera un rato o desactiva "Confirm email" en Supabase.');
      } else if (msg.includes('invalid') && msg.includes('email')) {
        setError('Ese correo no es válido. Prueba con uno real (Gmail, Outlook…).');
      } else if (msg.includes('signups not allowed') || msg.includes('disabled')) {
        setError('El registro está desactivado en Supabase.');
      } else if (msg.includes('fetch') || msg.includes('network')) {
        setError('No hay conexión con la base de datos. Revisa tu archivo .env.');
      } else {
        setError(`No se pudo crear la cuenta: ${error.message}`);
      }
      return;
    }
 
    // Si Supabase pide confirmar el correo, no hay sesión todavía
    if (!data.session) {
      setError('');
      alert('Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.');
      irA('login');
      return;
    }
 
    irA('catalogo');
  };
 
  return (
    <section className="auth">
      <div className="arco-form">
        <h2>Crear cuenta</h2>
        <form onSubmit={enviar}>
          <input name="nombre" placeholder="Nombre" value={datos.nombre} onChange={cambiar} required />
          <input name="correo" type="email" placeholder="Correo electrónico" value={datos.correo} onChange={cambiar} required />
          <input name="contrasena" type="password" placeholder="Contraseña" value={datos.contrasena} onChange={cambiar} required />
          <input name="confirma" type="password" placeholder="Confirma contraseña" value={datos.confirma} onChange={cambiar} required />
 
          {error && <p className="error" role="alert">{error}</p>}
 
          <button className="btn" type="submit" disabled={cargando}>
            {cargando ? 'Creando…' : 'Crear cuenta'}
          </button>
        </form>
        <button className="enlace" type="button" onClick={() => irA('login')}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </section>
  );
}
 
export default Registro;
 
