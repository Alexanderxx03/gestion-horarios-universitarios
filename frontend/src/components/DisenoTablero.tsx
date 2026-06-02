import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useHorarioStore } from '@/stores/horario.store';
import { calcularEmisionesCO2, calcularAhorroCO2 } from '@/lib/co2Calculator';

const ELEMENTOS_NAV = [
  { etiqueta: 'Panel Principal', ruta: '/dashboard', icono: '📊' },
  { etiqueta: 'Cursos', ruta: '/dashboard/cursos', icono: '📚' },
  { etiqueta: 'Docentes', ruta: '/dashboard/docentes', icono: '👨‍🏫' },
  { etiqueta: 'Aulas', ruta: '/dashboard/aulas', icono: '🏫' },
  { etiqueta: 'Matrículas', ruta: '/dashboard/matriculas', icono: '📝' },
  { etiqueta: 'Generar Horario', ruta: '/dashboard/generar', icono: '🧠' },
  { etiqueta: 'Ver Horario', ruta: '/dashboard/horario', icono: '📅' },
];

export function DisenoTablero() {
  const cargarDatosDeMongo = useHorarioStore((state) => state.cargarDatosDeMongo);
  const bytesTransferidos = useHorarioStore((state) => state.bytesTransferidos);

  const [tema, setTema] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('tema') as 'light' | 'dark') || 'light';
  });

  const emisiones = calcularEmisionesCO2(bytesTransferidos);
  const { porcentajeAhorro } = calcularAhorroCO2(bytesTransferidos);

  useEffect(() => {
    cargarDatosDeMongo();
  }, [cargarDatosDeMongo]);

  useEffect(() => {
    if (tema === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('tema', tema);
  }, [tema]);

  const toggleTema = () => {
    setTema((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="dashboard-layout">
      {/* Barra lateral */}
      <aside className="sidebar" id="barra-lateral-nav">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            Uni<span>Horarios</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">Menú principal</div>
            {ELEMENTOS_NAV.map((item) => (
              <NavLink
                key={item.ruta}
                to={item.ruta}
                end={item.ruta === '/dashboard'}
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              >
                <span className="icon">{item.icono}</span>
                {item.etiqueta}
              </NavLink>
            ))}
          </div>
          <div className="sidebar-section">
            <div className="sidebar-section-title">Sistema</div>
            <NavLink to="/" className="sidebar-link">
              <span className="icon">🏠</span>
              Inicio
            </NavLink>
          </div>

          {/* Sección de Sostenibilidad (CO2.js) */}
          <div className="sidebar-section green-it-card" style={{
            marginTop: 'auto',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(34, 197, 94, 0.03) 100%)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: '12px',
            margin: '16px 12px 0 12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              color: '#4ade80',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px'
            }}>
              🍃 Eco-Métricas (CO2.js)
            </div>
            <div style={{ display: 'grid', gap: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Transferido: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{(bytesTransferidos / 1024).toFixed(2)} KB</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Huella de Carbono:
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                {emisiones.toFixed(6)} gCO2e
              </div>
              <div style={{
                fontSize: '0.68rem',
                color: '#4ade80',
                fontWeight: 500,
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                🔋 Ahorro de red: <strong>{porcentajeAhorro.toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">Gestión de Horarios Universitarios</div>
          <div className="topbar-actions">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Período 2026-I</span>
            <span
              className="badge badge-success"
              style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Coordinador
            </span>
            <button
              onClick={toggleTema}
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '50%',
                transition: 'var(--transition-fast)',
                color: 'var(--text-main)',
                marginLeft: '8px',
              }}
              title={tema === 'light' ? 'Cambiar a Modo Noche' : 'Cambiar a Modo Día'}
            >
              {tema === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>
        <main className="page-content animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
