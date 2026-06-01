import { useState, FormEvent } from 'react';
import { useHorarioStore } from '@/stores/horario.store';

export function PaginaMatriculas() {
  const { cursos } = useHorarioStore();
  const [matriculas, setMatriculas] = useState<
    { id: string; estudiante: string; cursosIds: string[] }[]
  >([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [formData, setFormData] = useState({
    estudiante: '',
    cursosSeleccionados: [] as string[],
  });

  const cursosActivos = cursos.filter((c) => c.estaActivo);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.cursosSeleccionados.length === 0) return;

    setMatriculas([
      ...matriculas,
      {
        id: `enr-${Date.now()}`,
        estudiante: formData.estudiante,
        cursosIds: formData.cursosSeleccionados,
      },
    ]);
    setMostrarForm(false);
    setFormData({ estudiante: '', cursosSeleccionados: [] });
  };

  const handleCursoToggle = (cursoId: string) => {
    setFormData((prev) => ({
      ...prev,
      cursosSeleccionados: prev.cursosSeleccionados.includes(cursoId)
        ? prev.cursosSeleccionados.filter((id) => id !== cursoId)
        : [...prev.cursosSeleccionados, cursoId],
    }));
  };

  return (
    <div>
      <div
        className="page-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h1 className="page-title">Matrículas</h1>
          <p className="page-subtitle">Gestión de inscripciones de estudiantes para el CSP</p>
        </div>
        <button className="btn btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Nueva Matrícula'}
        </button>
      </div>

      {mostrarForm && (
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3>Añadir Nueva Matrícula</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label>Código o Nombre del Estudiante</label>
              <input
                type="text"
                required
                value={formData.estudiante}
                onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', maxWidth: '400px', display: 'block' }}
              />
            </div>

            <div>
              <label>Seleccionar Cursos a Inscribir</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {cursosActivos.map((curso) => (
                  <label
                    key={curso.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'var(--bg-secondary)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.cursosSeleccionados.includes(curso.id)}
                      onChange={() => handleCursoToggle(curso.id)}
                    />
                    {curso.codigo} - {curso.nombre}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ justifySelf: 'start', marginTop: '1rem' }}
            >
              Guardar Matrícula
            </button>
          </form>
        </div>
      )}

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Matrícula</th>
              <th>Estudiante</th>
              <th>Cursos Inscritos</th>
              <th>Créditos Totales</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}
                >
                  No hay matrículas registradas.
                </td>
              </tr>
            )}
            {matriculas.map((mat) => {
              const cursosMatriculados = cursos.filter((c) => mat.cursosIds.includes(c.id));
              const creditos = cursosMatriculados.reduce((acc, c) => acc + c.creditos, 0);
              return (
                <tr key={mat.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>
                      {mat.id}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{mat.estudiante}</td>
                  <td>{cursosMatriculados.map((c) => c.codigo).join(', ')}</td>
                  <td>{creditos}</td>
                  <td>
                    <span className="badge badge-success">Validada</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
