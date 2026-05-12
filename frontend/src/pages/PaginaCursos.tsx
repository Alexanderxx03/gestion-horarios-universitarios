import { useState } from 'react';
import { useHorarioStore } from '@/stores/horario.store';

export function PaginaCursos() {
  const { cursos, agregarCurso } = useHorarioStore();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    creditos: 4,
    horasSemanales: 4,
    capacidadMaxima: 40,
    semestre: 1,
    requiereLab: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    agregarCurso({
      id: `course-${Date.now()}`,
      ...formData,
      estaActivo: true,
      carreraId: 'SIS',
      prerrequisitos: [],
    });
    setMostrarForm(false);
    setFormData({
      codigo: '',
      nombre: '',
      creditos: 4,
      horasSemanales: 4,
      capacidadMaxima: 40,
      semestre: 1,
      requiereLab: false,
    });
  };

  return (
    <div>
      <div
        className="page-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h1 className="page-title">Catálogo de Cursos</h1>
          <p className="page-subtitle">{cursos.length} cursos registrados en el sistema</p>
        </div>
        <button className="btn btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Nuevo Curso'}
        </button>
      </div>

      {mostrarForm && (
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3>Añadir Nuevo Curso</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Código</label>
                <input
                  type="text"
                  required
                  value={formData.codigo}
                  onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <div>
                <label>Créditos</label>
                <input
                  type="number"
                  required
                  value={formData.creditos}
                  onChange={(e) => setFormData({ ...formData, creditos: Number(e.target.value) })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              <div>
                <label>Horas Semanales</label>
                <input
                  type="number"
                  required
                  value={formData.horasSemanales}
                  onChange={(e) =>
                    setFormData({ ...formData, horasSemanales: Number(e.target.value) })
                  }
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              <div>
                <label>Capacidad</label>
                <input
                  type="number"
                  required
                  value={formData.capacidadMaxima}
                  onChange={(e) =>
                    setFormData({ ...formData, capacidadMaxima: Number(e.target.value) })
                  }
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              <div>
                <label>Semestre</label>
                <input
                  type="number"
                  required
                  value={formData.semestre}
                  onChange={(e) => setFormData({ ...formData, semestre: Number(e.target.value) })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={formData.requiereLab}
                  onChange={(e) => setFormData({ ...formData, requiereLab: e.target.checked })}
                />
                Requiere Laboratorio
              </label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>
              Guardar Curso
            </button>
          </form>
        </div>
      )}

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table" id="tabla-cursos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Créditos</th>
              <th>Horas/Sem</th>
              <th>Capacidad</th>
              <th>Semestre</th>
              <th>Lab</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>
                  <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>
                    {curso.codigo}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{curso.nombre}</td>
                <td>{curso.creditos}</td>
                <td>{curso.horasSemanales}h</td>
                <td>{curso.capacidadMaxima} est.</td>
                <td>
                  <span className="badge badge-info">{curso.semestre}°</span>
                </td>
                <td>
                  {curso.requiereLab ? (
                    <span className="badge badge-warning">🔬 Sí</span>
                  ) : (
                    <span style={{ color: 'var(--text-dimmed)' }}>—</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${curso.estaActivo ? 'badge-success' : 'badge-danger'}`}>
                    {curso.estaActivo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
