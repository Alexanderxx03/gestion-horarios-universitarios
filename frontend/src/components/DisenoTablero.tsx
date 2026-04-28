import { NavLink, Outlet } from 'react-router-dom';

const ELEMENTOS_NAV = [
  { etiqueta: 'Panel Principal', ruta: '/dashboard', icono: '📊' },
  { etiqueta: 'Cursos', ruta: '/dashboard/cursos', icono: '📚' },
  { etiqueta: 'Docentes', ruta: '/dashboard/docentes', icono: '👨‍🏫' },
  { etiqueta: 'Aulas', ruta: '/dashboard/aulas', icono: '🏫' },
  { etiqueta: 'Generar Horario', ruta: '/dashboard/generar', icono: '🧠' },
  { etiqueta: 'Ver Horario', ruta: '/dashboard/horario', icono: '📅' },
];

export function DisenoTablero() {
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
          </div>
        </header>
        <main className="page-content animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
