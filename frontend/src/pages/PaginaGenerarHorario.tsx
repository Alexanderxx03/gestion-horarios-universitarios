import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHorarioStore } from '@/stores/horario.store';

export function PaginaGenerarHorario() {
  const [selectedCarrera, setSelectedCarrera] = useState<string>('');
  const [selectedCiclo, setSelectedCiclo] = useState<string>('');
  
  const {
    carreras,
    cursos,
    docentes,
    aulas,
    estado,
    tiempoGeneracionMs,
    nodosExplorados,
    retrocesos,
    mensajeError,
    cspTreeId,
    generarHorario,
    generarHorarioEnServidor,
    reiniciarHorario,
    asignaciones,
  } = useHorarioStore();

  const cursosActivos = cursos.filter((c) => {
    let pass = c.estaActivo;
    if (selectedCarrera) pass = pass && c.carreraId === selectedCarrera;
    if (selectedCiclo) pass = pass && c.semestre === parseInt(selectedCiclo);
    return pass;
  });
  const aulasActivas = aulas.filter((a) => a.estaActiva);
  const cursosConLab = cursosActivos.filter((c) => c.requiereLab);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">🧠 Generar Horario Académico</h1>
          <p className="page-subtitle">Motor CSP: Backtracking + MRV + Forward Checking</p>
        </div>
      </div>

      {/* Resumen de datos de entrada */}
      <div className="stat-cards" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{cursosActivos.length}</div>
          <div className="stat-card-label">Cursos a Asignar</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">👨‍🏫</div>
          <div className="stat-card-value">{docentes.length}</div>
          <div className="stat-card-label">Docentes Disponibles</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🏫</div>
          <div className="stat-card-value">{aulasActivas.length}</div>
          <div className="stat-card-label">Aulas Activas</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔬</div>
          <div className="stat-card-value">{cursosConLab.length}</div>
          <div className="stat-card-label">Requieren Laboratorio</div>
        </div>
      </div>

      {/* Selectores de Carrera y Ciclo */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Carrera:</label>
          <select 
            className="form-control" 
            value={selectedCarrera} 
            onChange={(e) => setSelectedCarrera(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
          >
            <option value="">-- Seleccione una Carrera --</option>
            {carreras.map(c => (
              <option key={c._id} value={c._id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ciclo (Semestre):</label>
          <select 
            className="form-control" 
            value={selectedCiclo} 
            onChange={(e) => setSelectedCiclo(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
          >
            <option value="">-- Seleccione un Ciclo --</option>
            {[1,2,3,4,5,6,7,8,9,10].map(ciclo => (
              <option key={ciclo} value={ciclo}>Ciclo {ciclo}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón de generación */}
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        {estado === 'inactivo' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Listo para Generar</h3>
            <p
              style={{
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
                maxWidth: '500px',
                margin: '0 auto 1.5rem',
              }}
            >
              El motor CSP analizará {cursosActivos.length} cursos, {docentes.length} docentes y{' '}
              {aulasActivas.length} aulas para encontrar una asignación sin conflictos.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary btn-lg" 
                onClick={() => generarHorario(selectedCarrera, selectedCiclo ? parseInt(selectedCiclo) : undefined)} 
                id="btn-generar"
                disabled={!selectedCarrera || !selectedCiclo}
                title={(!selectedCarrera || !selectedCiclo) ? 'Seleccione una Carrera y un Ciclo' : ''}
              >
                ⚡ Generar (Local CSP)
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => generarHorarioEnServidor('2026-I', selectedCarrera, selectedCiclo ? parseInt(selectedCiclo) : undefined)}
                disabled={!selectedCarrera || !selectedCiclo}
                title={(!selectedCarrera || !selectedCiclo) ? 'Seleccione una Carrera y un Ciclo' : ''}
              >
                🌐 Generar en Servidor MERN
              </button>
            </div>
          </>
        )}

        {estado === 'generando' && (
          <>
            <div className="spinner spinner-lg" style={{ margin: '0 auto 1.5rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Generando Horario...</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Ejecutando Backtracking con MRV y Forward Checking
            </p>
            <p className="animate-pulse" style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>
              Explorando espacio de soluciones...
            </p>
          </>
        )}

        {estado === 'generado' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>
              ¡Horario Generado Exitosamente!
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Se asignaron {asignaciones.length} cursos sin conflictos
            </p>

            {/* Estadísticas del resolvedor */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                maxWidth: '600px',
                margin: '0 auto 1.5rem',
              }}
            >
              <div
                style={{
                  background: 'var(--accent-subtle)',
                  padding: '1rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{tiempoGeneracionMs} ms</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Tiempo de generación
                </div>
              </div>
              <div
                style={{
                  background: 'var(--accent-subtle)',
                  padding: '1rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{nodosExplorados}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Nodos explorados
                </div>
              </div>
              <div
                style={{
                  background: 'var(--accent-subtle)',
                  padding: '1rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{retrocesos}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Retrocesos (backtracks)
                </div>
              </div>
              <div
                style={{
                  background: 'var(--success-subtle)',
                  padding: '1rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>0</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Conflictos</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Link to="/dashboard/horario" className="btn btn-primary">
                📅 Ver Grilla de Horarios
              </Link>
              <button className="btn btn-secondary" onClick={reiniciarHorario}>
                🔄 Regenerar
              </button>
            </div>

            {cspTreeId && (
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255, 171, 0, 0.1)',
                  border: '1px solid var(--accent)',
                  borderRadius: '12px',
                  display: 'inline-block',
                }}
              >
                <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>🔥</span>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>Árbol CSP Guardado</span>
                <div
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}
                >
                  ID: {cspTreeId}
                </div>
              </div>
            )}
          </>
        )}

        {estado === 'fallido' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
            <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>
              No se encontró solución
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
                maxWidth: '500px',
                margin: '0 auto 1.5rem',
              }}
            >
              {mensajeError}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                maxWidth: '450px',
                margin: '0 auto 1.5rem',
              }}
            >
              <div
                style={{
                  background: 'var(--danger-subtle)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontWeight: 700 }}>{tiempoGeneracionMs} ms</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tiempo</div>
              </div>
              <div
                style={{
                  background: 'var(--danger-subtle)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontWeight: 700 }}>{nodosExplorados}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nodos</div>
              </div>
              <div
                style={{
                  background: 'var(--danger-subtle)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontWeight: 700 }}>{retrocesos}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Retrocesos</div>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={reiniciarHorario}>
              🔄 Intentar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
