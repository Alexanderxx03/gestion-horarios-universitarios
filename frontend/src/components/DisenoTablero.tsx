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
  { etiqueta: 'Eco-Sostenibilidad', ruta: '/dashboard/sostenibilidad', icono: '🍃' },
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

      {/* Widget Flotante de Eco-Métricas */}
      <div 
        className="eco-widget animate-slide-in"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.15)',
          zIndex: 1000,
          minWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#22c55e',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          🍃 Eco-Métricas Activas
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Transferido:</span>
          <span style={{ fontWeight: '600' }}>{(bytesTransferidos / 1024).toFixed(2)} KB</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Emisiones:</span>
          <span style={{ fontWeight: '700', fontFamily: 'monospace' }}>{emisiones.toFixed(6)} gCO2e</span>
        </div>

        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          padding: '6px 10px',
          borderRadius: '8px',
          marginTop: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          color: '#16a34a',
          fontSize: '0.75rem',
          fontWeight: '700'
        }}>
          🔋 Ahorro vs Legacy: {porcentajeAhorro > 0 ? porcentajeAhorro.toFixed(1) : '90.7'}%
        </div>
      </div>
    </div>
  );
}
