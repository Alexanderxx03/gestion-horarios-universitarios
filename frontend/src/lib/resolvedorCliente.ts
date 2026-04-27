/**
 * Motor CSP ligero que corre en el navegador para el prototipo.
 * Replica la misma lógica del resolvedor del backend pero trabaja
 * con los datos de demostración directamente.
 */
import type { Curso, Docente, Aula, AsignacionHorario, FranjaHoraria } from './tipos';

interface ValorCSP {
  docenteId: string;
  docenteNombre: string;
  aulaId: string;
  aulaNombre: string;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

interface VariableCSP {
  cursoId: string;
  cursoNombre: string;
  requiereLab: boolean;
  capacidadMaxima: number;
  docentesCalificadosIds: string[];
}

interface AsignacionInternaCSP {
  variable: VariableCSP;
  valor: ValorCSP;
}

type MapaDominios = Map<string, ValorCSP[]>;

function horaAMinutos(hora: string): number {
  const partes = hora.split(':').map(Number);
  return (partes[0] ?? 0) * 60 + (partes[1] ?? 0);
}

function franjasSeSuperponen(
  a: { diaSemana: number; horaInicio: string; horaFin: string },
  b: { diaSemana: number; horaInicio: string; horaFin: string },
): boolean {
  if (a.diaSemana !== b.diaSemana) return false;
  const aI = horaAMinutos(a.horaInicio),
    aF = horaAMinutos(a.horaFin);
  const bI = horaAMinutos(b.horaInicio),
    bF = horaAMinutos(b.horaFin);
  return aI < bF && bI < aF;
}

const FRANJAS_SISTEMA: FranjaHoraria[] = [];
for (let dia = 1; dia <= 5; dia++) {
  FRANJAS_SISTEMA.push(
    { diaSemana: dia, horaInicio: '07:00', horaFin: '09:00' },
    { diaSemana: dia, horaInicio: '09:00', horaFin: '11:00' },
    { diaSemana: dia, horaInicio: '11:00', horaFin: '13:00' },
    { diaSemana: dia, horaInicio: '14:00', horaFin: '16:00' },
    { diaSemana: dia, horaInicio: '16:00', horaFin: '18:00' },
  );
}
FRANJAS_SISTEMA.push(
  { diaSemana: 6, horaInicio: '08:00', horaFin: '10:00' },
  { diaSemana: 6, horaInicio: '10:00', horaFin: '12:00' },
);

export interface NodoArbolCSP {
  id: string;
  variable: string;
  valorAsignado: string;
  estado: 'explorando' | 'exito' | 'fallo' | 'podado';
  hijos: NodoArbolCSP[];
}

export interface ResultadoResolvedor {
  exito: boolean;
  asignaciones: AsignacionHorario[];
  estadisticas: {
    tiempoTotalMs: number;
    nodosExplorados: number;
    retrocesos: number;
  };
  arbolDeBusqueda?: NodoArbolCSP;
}

export function resolverHorario(
  cursos: Curso[],
  docentes: Docente[],
  aulas: Aula[],
): ResultadoResolvedor {
  const inicio = Date.now();
  let retrocesos = 0;
  let nodosExplorados = 0;

  // Mapear docentes calificados por curso
  const docentesPorCurso = new Map<string, string[]>();
  const disponibilidadDocente = new Map<string, FranjaHoraria[]>();
  const mapaDocenteNombre = new Map<string, string>();

  for (const d of docentes) {
    disponibilidadDocente.set(d.id, d.disponibilidad);
    mapaDocenteNombre.set(d.id, d.nombreCompleto);
    for (const cid of d.cursosCalificados) {
      const arr = docentesPorCurso.get(cid) ?? [];
      arr.push(d.id);
      docentesPorCurso.set(cid, arr);
    }
  }

  const mapaAulas = new Map(aulas.map((a) => [a.id, a]));

  // Variables
  const variables: VariableCSP[] = cursos
    .filter((c) => c.estaActivo)
    .map((c) => ({
      cursoId: c.id,
      cursoNombre: c.nombre,
      requiereLab: c.requiereLab,
      capacidadMaxima: c.capacidadMaxima,
      docentesCalificadosIds: docentesPorCurso.get(c.id) ?? [],
    }));

  // Construir dominios iniciales
  const dominios: MapaDominios = new Map();
  for (const v of variables) {
    const valores: ValorCSP[] = [];
    for (const did of v.docentesCalificadosIds) {
      const disp = disponibilidadDocente.get(did);
      if (!disp) continue;
      const nombreDoc = mapaDocenteNombre.get(did) ?? did;
      for (const [aulaId, aula] of mapaAulas) {
        if (aula.capacidad < v.capacidadMaxima) continue;
        if (v.requiereLab && !aula.esLaboratorio) continue;
        for (const franja of FRANJAS_SISTEMA) {
          const fI = horaAMinutos(franja.horaInicio);
          const fF = horaAMinutos(franja.horaFin);
          const disponible = disp.some(
            (d) =>
              d.diaSemana === franja.diaSemana &&
              horaAMinutos(d.horaInicio) <= fI &&
              horaAMinutos(d.horaFin) >= fF,
          );
          if (disponible) {
            valores.push({
              docenteId: did,
              docenteNombre: nombreDoc,
              aulaId: aulaId,
              aulaNombre: aula.nombre,
              diaSemana: franja.diaSemana,
              horaInicio: franja.horaInicio,
              horaFin: franja.horaFin,
            });
          }
        }
      }
    }
    dominios.set(v.cursoId, valores);
  }

  function esConsistente(valor: ValorCSP, asignaciones: AsignacionInternaCSP[]): boolean {
    for (const a of asignaciones) {
      const ev = a.valor;
      if (ev.docenteId === valor.docenteId && franjasSeSuperponen(ev, valor)) return false;
      if (ev.aulaId === valor.aulaId && franjasSeSuperponen(ev, valor)) return false;
    }
    return true;
  }

  function verificacionAdelante(
    _valor: ValorCSP,
    restantes: VariableCSP[],
    doms: MapaDominios,
    asignaciones: AsignacionInternaCSP[],
  ): MapaDominios | null {
    const nuevosDominios: MapaDominios = new Map();
    for (const v of restantes) {
      const d = doms.get(v.cursoId) ?? [];
      const filtrado = d.filter((cv) => esConsistente(cv, asignaciones));
      if (filtrado.length === 0) return null;
      nuevosDominios.set(v.cursoId, filtrado);
    }
    return nuevosDominios;
  }

  const nodoRaiz: NodoArbolCSP = {
    id: 'root',
    variable: 'Inicio del Motor CSP',
    valorAsignado: '-',
    estado: 'explorando',
    hijos: [],
  };

  function resolver(
    asignacionesActuales: AsignacionInternaCSP[],
    sinAsignar: VariableCSP[],
    doms: MapaDominios,
    nodoActual: NodoArbolCSP,
  ): AsignacionInternaCSP[] | null {
    if (Date.now() - inicio > 30_000) {
      nodoActual.estado = 'fallo';
      return null;
    }
    if (sinAsignar.length === 0) {
      nodoActual.estado = 'exito';
      return asignacionesActuales;
    }

    nodosExplorados++;

    // MRV: seleccionar variable con menor dominio
    let mejorIndice = 0;
    let mejorTamano = doms.get(sinAsignar[0]!.cursoId)?.length ?? Infinity;
    for (let i = 1; i < sinAsignar.length; i++) {
      const tam = doms.get(sinAsignar[i]!.cursoId)?.length ?? Infinity;
      if (tam < mejorTamano) {
        mejorIndice = i;
        mejorTamano = tam;
      }
    }
    const mejor = sinAsignar[mejorIndice]!;

    const dominio = doms.get(mejor.cursoId) ?? [];

    if (dominio.length === 0) {
      nodoActual.estado = 'podado';
      return null;
    }

    for (let idx = 0; idx < dominio.length; idx++) {
      const valor = dominio[idx]!;

      const hijoId = `${nodoActual.id}-${idx}`;
      const nodoHijo: NodoArbolCSP = {
        id: hijoId,
        variable: mejor.cursoNombre,
        valorAsignado: `${valor.docenteNombre} | ${valor.aulaNombre} | Día ${valor.diaSemana} (${valor.horaInicio}-${valor.horaFin})`,
        estado: 'explorando',
        hijos: [],
      };
      // Limitar el número de hijos renderizados para no saturar la BD si el árbol es masivo
      if (idx < 50) nodoActual.hijos.push(nodoHijo);

      if (!esConsistente(valor, asignacionesActuales)) {
        nodoHijo.estado = 'fallo';
        continue;
      }

      const nuevasAsignaciones: AsignacionInternaCSP[] = [
        ...asignacionesActuales,
        { variable: mejor, valor },
      ];
      const restantes = sinAsignar.filter((v) => v.cursoId !== mejor.cursoId);
      const podado = verificacionAdelante(valor, restantes, doms, nuevasAsignaciones);

      if (podado !== null) {
        const resultado = resolver(nuevasAsignaciones, restantes, podado, nodoHijo);
        if (resultado !== null) {
          nodoHijo.estado = 'exito';
          return resultado;
        }
      } else {
        nodoHijo.estado = 'podado';
      }

      if (nodoHijo.estado === 'explorando') {
        nodoHijo.estado = 'fallo';
      }
      retrocesos++;
    }

    nodoActual.estado = 'fallo';
    return null;
  }

  const solucion = resolver([], variables, dominios, nodoRaiz);
  const tiempoTotalMs = Date.now() - inicio;

  if (solucion) nodoRaiz.estado = 'exito';

  if (!solucion) {
    return {
      exito: false,
      asignaciones: [],
      estadisticas: { tiempoTotalMs, nodosExplorados, retrocesos },
      arbolDeBusqueda: nodoRaiz,
    };
  }

  const asignaciones: AsignacionHorario[] = solucion.map((a) => ({
    cursoId: a.variable.cursoId,
    cursoNombre: a.variable.cursoNombre,
    docenteId: a.valor.docenteId,
    docenteNombre: a.valor.docenteNombre,
    aulaId: a.valor.aulaId,
    aulaNombre: a.valor.aulaNombre,
    diaSemana: a.valor.diaSemana,
    horaInicio: a.valor.horaInicio,
    horaFin: a.valor.horaFin,
    tamanoGrupo: a.variable.capacidadMaxima,
  }));

  return {
    exito: true,
    asignaciones,
    estadisticas: { tiempoTotalMs, nodosExplorados, retrocesos },
    arbolDeBusqueda: nodoRaiz,
  };
}
