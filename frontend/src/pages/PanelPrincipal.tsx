import { useHorarioStore } from '@/stores/horario.store';

export function PanelPrincipal() {
  const { cursos, docentes, aulas, estado, tiempoGeneracionMs, nodosExplorados } =
    useHorarioStore();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Panel Principal</h1>
          <p className="page-subtitle">Resumen del período académico 2026-I</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{cursos.length}</div>
          <div className="stat-card-label">Cursos Registrados</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">👨‍🏫</div>
          <div className="stat-card-value">{docentes.length}</div>
          <div className="stat-card-label">Docentes Disponibles</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🏫</div>
          <div className="stat-card-value">{aulas.length}</div>
          <div className="stat-card-label">Aulas Activas</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">
            {estado === 'generado' ? '✅' : estado === 'fallido' ? '❌' : '⏳'}
          </div>
          <div className="stat-card-value">
            {estado === 'generado' ? 'Generado' : estado === 'fallido' ? 'Fallido' : 'Pendiente'}
          </div>
          <div className="stat-card-label">Estado del Horario</div>
        </div>
      </div>

      {/* Info del motor CSP */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>🧠 Motor CSP — Información del Algoritmo</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{ color: 'var(--text-dimmed)', fontSize: '0.8rem', marginBottom: '0.25rem' }}
            >
              Algoritmo
            </div>
            <div style={{ fontWeight: 600 }}>Backtracking + MRV + FC</div>
          </div>
          <div>
            <div
              style={{ color: 'var(--text-dimmed)', fontSize: '0.8rem', marginBottom: '0.25rem' }}
            >
              Restricciones Duras
            </div>
            <div style={{ fontWeight: 600 }}>8 (HC1–HC8)</div>
          </div>
          <div>
            <div
              style={{ color: 'var(--text-dimmed)', fontSize: '0.8rem', marginBottom: '0.25rem' }}
            >
              Último Tiempo de Generación
            </div>
            <div style={{ fontWeight: 600 }}>
              {tiempoGeneracionMs > 0 ? `${tiempoGeneracionMs} ms` : '—'}
            </div>
          </div>
          <div>
            <div
              style={{ color: 'var(--text-dimmed)', fontSize: '0.8rem', marginBottom: '0.25rem' }}
            >
              Nodos Explorados
            </div>
            <div style={{ fontWeight: 600 }}>
              {nodosExplorados > 0 ? nodosExplorados.toLocaleString() : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Restricciones implementadas */}
      <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.25rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>🔒 Restricciones Implementadas</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {[
            { id: 'HC1', etiqueta: 'No solapamiento de docente', icono: '👨‍🏫' },
            { id: 'HC2', etiqueta: 'No solapamiento de aula', icono: '🏫' },
            { id: 'HC3', etiqueta: 'No solapamiento de estudiante', icono: '👨‍🎓' },
            { id: 'HC4', etiqueta: 'Disponibilidad del docente', icono: '📆' },
            { id: 'HC5', etiqueta: 'Capacidad del aula', icono: '👥' },
            { id: 'HC6', etiqueta: 'Tipo de aula (laboratorio)', icono: '🔬' },
            { id: 'HC7', etiqueta: 'Límite de créditos', icono: '📊' },
            { id: 'HC8', etiqueta: 'Prerrequisitos', icono: '🔗' },
          ].map((restriccion) => (
            <div
              key={restriccion.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'var(--accent-subtle)',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{restriccion.icono}</span>
              <div>
                <span className="badge badge-info" style={{ marginRight: '0.5rem' }}>
                  {restriccion.id}
                </span>
                <span style={{ fontSize: '0.85rem' }}>{restriccion.etiqueta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
