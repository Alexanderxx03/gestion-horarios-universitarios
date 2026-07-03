const fs = require('fs');
const { resolverHorario } = require('./resolvedorCliente.js');

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

  // We are monkey patching to see the variables
  const originalMap = Array.prototype.map;
  let capturedVariables;
  Array.prototype.map = function(fn) {
    const res = originalMap.call(this, fn);
    if (res.length > 0 && res[0].cursoId) {
      capturedVariables = res;
    }
    return res;
  };
  
  const resultado = resolverHorario(mappedCursos, mappedDocentes, mappedAulas);
  Array.prototype.map = originalMap;
  
  console.log('Variables Length:', capturedVariables ? capturedVariables.length : 0);
  console.log('Variables:', capturedVariables);
}

run().catch(console.error);
