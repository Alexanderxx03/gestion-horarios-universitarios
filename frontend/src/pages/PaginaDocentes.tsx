import { useHorarioStore } from '@/stores/horario.store';
import { NOMBRES_DIAS } from '@/lib/datosDemostracion';

export function PaginaDocentes() {
  const { docentes } = useHorarioStore();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Docentes</h1>
          <p className="page-subtitle">{docentes.length} docentes registrados</p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {docentes.map((docente) => (
          <div key={docente.id} className="glass-card" style={{ padding: '1.5rem' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: 'var(--accent-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                👨‍🏫
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{docente.nombreCompleto}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {docente.codigoEmpleado} · {docente.departamento}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-dimmed)' }}>Máx. horas/semana:</span>{' '}
              <strong>{docente.maxHorasSemana}h</strong>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-dimmed)',
                  marginBottom: '0.375rem',
                }}
              >
                Disponibilidad:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {docente.disponibilidad.map((franja, i) => (
                  <span key={i} className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                    {NOMBRES_DIAS[franja.diaSemana]?.slice(0, 3)} {franja.horaInicio}-
                    {franja.horaFin}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-dimmed)',
                  marginBottom: '0.375rem',
                }}
              >
                Cursos calificados:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {docente.cursosCalificados.map((cid) => (
                  <span key={cid} className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                    {cid}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
