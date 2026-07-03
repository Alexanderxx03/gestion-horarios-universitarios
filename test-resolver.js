import fs from 'fs';

async function run() {
  const dataCursos = await fetch('http://localhost:5000/api/courses?limit=2000').then(res => res.json());
  const dataDocentes = await fetch('http://localhost:5000/api/teachers').then(res => res.json());
  const dataAulas = await fetch('http://localhost:5000/api/classrooms').then(res => res.json());
  const dataCarreras = await fetch('http://localhost:5000/api/careers').then(res => res.json());

  const carreraMedicina = dataCarreras.data.find(c => c.nombre === 'Medicina Humana');
  
  const mappedCursos = dataCursos.data
    .filter(c => c.carreraId === carreraMedicina._id && c.semestre === 1)
    .map((c) => ({
      id: c._id,
      nombre: c.nombre,
      requiereLab: c.requiereLaboratorio,
      capacidadMaxima: c.capacidadMaxima,
      estaActivo: c.activo
    }));

  const mappedDocentes = dataDocentes.data.map((d) => ({
    id: d._id,
    nombreCompleto: d.codigoEmpleado,
    disponibilidad: d.disponibilidad || [],
    cursosCalificados: d.cursosHabilitados || [],
  }));

  const mappedAulas = dataAulas.data.map((a) => ({
    id: a._id,
    nombre: a.nombre,
    capacidad: a.capacidad,
    esLaboratorio: a.esLaboratorio,
  }));

  // Simplified solver logic to just check domains
  const docentesPorCurso = new Map();
  for (const d of mappedDocentes) {
    for (const cid of d.cursosCalificados) {
      const arr = docentesPorCurso.get(cid) ?? [];
      arr.push(d.id);
      docentesPorCurso.set(cid, arr);
    }
  }

  for (const c of mappedCursos) {
    const profs = docentesPorCurso.get(c.id) || [];
    console.log(`Curso ${c.nombre} tiene ${profs.length} docentes`);
    if (profs.length === 0) {
      console.log('Fallo: No hay docentes calificados');
    }
    
    // Check valid slots
    let totalSlots = 0;
    for (const pid of profs) {
      const p = mappedDocentes.find(d => d.id === pid);
      for (const disp of p.disponibilidad) {
        // just count them loosely
        totalSlots++;
      }
    }
    console.log(`-> Slots totales de disponibilidad de estos profes: ${totalSlots}`);
  }
}

run().catch(console.error);
