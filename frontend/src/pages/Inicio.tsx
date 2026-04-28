import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

gsap.registerPlugin(useGSAP);

type AuthMode = 'login' | 'register';

export function Inicio() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [resetMsg, setResetMsg] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animation
  const container = useRef<HTMLDivElement>(null);
  const leftPanel = useRef<HTMLDivElement>(null);
  const formWrapper = useRef<HTMLDivElement>(null);

  // Refs for GSAP counter animation
  const studentCountRef = useRef<HTMLSpanElement>(null);
  const facultyCountRef = useRef<HTMLSpanElement>(null);
  const careersCountRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Left panel animations
      const tlLeft = gsap.timeline();
      tlLeft
        .from('.branding', { y: -30, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(
          '.university-label',
          { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.4',
        )
        .from('.hero-heading', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .from(
          '.hero-description',
          { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4',
        )
        .from(
          '.split-stat-box',
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.5)',
          },
          '-=0.2',
        )
        .from(
          '.split-feature-item',
          {
            x: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .from('.footer-meta', { opacity: 0, duration: 0.5 }, '-=0.2');

      // Numbers animation
      gsap.to(studentCountRef.current, {
        innerHTML: 30000,
        duration: 2,
        snap: 'innerHTML',
        ease: 'power2.out',
        delay: 1,
      });
      gsap.to(facultyCountRef.current, {
        innerHTML: 12,
        duration: 1.5,
        snap: 'innerHTML',
        ease: 'power2.out',
        delay: 1,
      });
      gsap.to(careersCountRef.current, {
        innerHTML: 60,
        duration: 2,
        snap: 'innerHTML',
        ease: 'power2.out',
        delay: 1,
      });

      // Initial Right panel (form) animations
      gsap.from('.split-form-container', {
        scale: 0.95,
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('.form-stagger', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5,
      });
    },
    { scope: container },
  );

  // Function to animate mode transition
  const switchMode = (newMode: AuthMode) => {
    if (newMode === mode) return;
    setErrorMsg('');
    setEmail('');
    setPassword('');

    gsap.to(formWrapper.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        setMode(newMode);
        gsap.fromTo(
          formWrapper.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        );
      },
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth Error:', err);
      if (err.code === 'auth/invalid-credential') setErrorMsg('Credenciales incorrectas');
      else if (err.code === 'auth/email-already-in-use')
        setErrorMsg('Este correo ya está registrado');
      else if (err.code === 'auth/weak-password')
        setErrorMsg('La contraseña debe tener al menos 6 caracteres');
      else setErrorMsg('Error de autenticación: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('Error al iniciar con Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setResetMsg({ type: '', text: '' });

    if (!email) {
      setResetMsg({ type: 'error', text: 'Por favor ingresa tu correo primero.' });
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg({ type: 'success', text: 'Enlace enviado. Revisa tu correo.' });
    } catch (err: any) {
      console.error('Reset Error:', err);
      if (err.code === 'auth/user-not-found') {
        setResetMsg({ type: 'error', text: 'No hay usuario registrado con este correo.' });
      } else {
        setResetMsg({ type: 'error', text: 'Error al enviar enlace.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="split-layout" ref={container}>
      {/* Left Panel - Dynamic Deep Blue Branding */}
      <div className="split-left" ref={leftPanel}>
        <div className="branding">
          <div
            className="branding-logo"
            style={{ background: 'var(--accent)', color: 'var(--primary)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.2 }}>
              Uni<span style={{ color: 'var(--accent)' }}>Horarios</span>
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Sistema de Gestión Académica</div>
          </div>
        </div>

        <div className="university-label" style={{ color: 'var(--accent)' }}>
          UNIVERSIDAD INSTITUCIONAL
        </div>

        <h1 className="hero-heading">
          Tu horario,
          <br />
          siempre a la mano.
        </h1>

        <p className="hero-description">
          Consulta tus horarios, clases y actividades académicas desde un solo lugar, con nuestro
          motor CSP que resuelve conflictos en tiempo real.
        </p>

        <div className="split-stats">
          <div className="split-stat-box">
            <h3 style={{ color: 'var(--accent)' }}>
              <span ref={studentCountRef}>0</span>+
            </h3>
            <p>Estudiantes</p>
          </div>
          <div className="split-stat-box">
            <h3 style={{ color: 'var(--accent)' }}>
              <span ref={facultyCountRef}>0</span>
            </h3>
            <p>Facultades</p>
          </div>
          <div className="split-stat-box">
            <h3 style={{ color: 'var(--accent)' }}>
              <span ref={careersCountRef}>0</span>+
            </h3>
            <p>Carreras</p>
          </div>
        </div>

        <div className="split-features">
          <div className="split-feature-item">
            <div className="split-feature-icon" style={{ color: 'var(--accent)' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
            </div>
            Generación óptima sin choques de cruce
          </div>
          <div className="split-feature-item">
            <div className="split-feature-icon" style={{ color: 'var(--accent)' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            Accede a tus cursos y docentes asignados
          </div>
          <div className="split-feature-item">
            <div className="split-feature-icon" style={{ color: 'var(--accent)' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            Ahorra semanas de planificación académica
          </div>
        </div>

        <div
          className="footer-meta"
          style={{
            marginTop: 'auto',
            paddingTop: '4rem',
            fontSize: '0.8rem',
            opacity: 0.6,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div>📍 Huancayo, Perú</div>
            <div style={{ marginTop: '0.5rem' }}>© 2026 UniHorarios CSP Engine</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form (Glassmorphism) */}
      <div className="split-right">
        <div className="split-form-container">
          <div ref={formWrapper}>
            <div className="form-stagger" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2
                style={{
                  fontSize: '1.75rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {mode === 'login' ? 'Acceso al Sistema' : 'Crea tu Cuenta'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {mode === 'login'
                  ? 'Ingresa tus credenciales para empezar a gestionar.'
                  : 'Regístrate para obtener acceso al motor CSP.'}
              </p>
            </div>

            <button
              type="button"
              className="split-google-btn form-stagger"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </button>

            <div className="split-divider form-stagger">
              <span>o con email</span>
            </div>

            {errorMsg && (
              <div
                className="form-error form-stagger"
                style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                  background: 'var(--danger-subtle)',
                  padding: '0.5rem',
                  borderRadius: '8px',
                }}
              >
                {errorMsg}
              </div>
            )}

            {resetMsg.text && (
              <div
                className="form-stagger"
                style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                  background:
                    resetMsg.type === 'success'
                      ? 'var(--success-subtle, #d4edda)'
                      : 'var(--danger-subtle)',
                  color: resetMsg.type === 'success' ? 'var(--success, #155724)' : 'var(--danger)',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              >
                {resetMsg.text}
              </div>
            )}

            <form onSubmit={handleEmailAuth}>
              <div className="form-group form-stagger" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="usuario@universidad.edu.pe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group form-stagger" style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <label className="form-label">Contraseña</label>
                  {mode === 'login' && (
                    <a
                      href="#"
                      onClick={handlePasswordReset}
                      style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none' }}
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="split-button-action"
                disabled={isLoading}
                style={{ zIndex: 10, position: 'relative' }}
              >
                {isLoading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Registrarme'}
              </button>
            </form>

            <div
              className="form-stagger"
              style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}
            >
              {mode === 'login' ? (
                <>
                  ¿No tienes cuenta?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      switchMode('register');
                    }}
                    style={{ color: 'var(--accent)', fontWeight: 600 }}
                  >
                    Regístrate aquí
                  </a>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      switchMode('login');
                    }}
                    style={{ color: 'var(--accent)', fontWeight: 600 }}
                  >
                    Inicia sesión
                  </a>
                </>
              )}
            </div>

            <div
              className="form-stagger"
              style={{
                textAlign: 'center',
                marginTop: '1.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              Al {mode === 'login' ? 'ingresar' : 'registrarte'} aceptas los{' '}
              <a href="#" style={{ color: 'white' }}>
                Términos de uso
              </a>{' '}
              de la plataforma CSP.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
