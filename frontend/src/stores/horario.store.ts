import { create } from 'zustand';
import type { Curso, Docente, Aula, AsignacionHorario, EstadoHorario } from '@/lib/tipos';
import { resolverHorario } from '@/lib/resolvedorCliente';

interface RawCourse {
  _id: string;
  codigo: string;
  nombre: string;
  creditos: number;
  horasSemanales: number;
  requiereLaboratorio: boolean;
  prerrequisitos?: Array<string | { toString(): string }>;
  capacidadMaxima: number;
  activo: boolean;
  carreraId?: string | { toString(): string };
  semestre: number;
}

interface RawTeacher {
  _id: string;
  usuarioId?: { _id: string; nombreCompleto: string } | string;
  codigoEmpleado: string;
  departamento: string;
  horasMaximasSemanales: number;
  disponibilidad?: { diaSemana: number; horaInicio: string; horaFin: string }[];
  cursosHabilitados?: Array<string | { toString(): string }>;
  activo: boolean;
}

interface RawClassroom {
  _id: string;
  nombre: string;
  pabellon: string;
  piso: number;
  capacidad: number;
  esLaboratorio: boolean;
  tieneProyector: boolean;
  activo: boolean;
}

interface RawAssignment {
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  classroomId: string;
  classroomName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  groupSize?: number;
}

interface EstadoHorarioStore {
  /* Datos del catálogo */
  cursos: Curso[];
  docentes: Docente[];
  aulas: Aula[];

  /* Paginación de Cursos */
  cursosPaginacion: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };

  /* Estado del horario generado */
  estado: EstadoHorario;
  asignaciones: AsignacionHorario[];
  tiempoGeneracionMs: number;
  nodosExplorados: number;
  retrocesos: number;
  mensajeError: string | null;
  cspTreeId: string | null;

  /* Métricas de Sostenibilidad */
  bytesTransferidos: number;

  /* Acciones */
  cargarDatosDeMongo: (force?: boolean, page?: number, limit?: number) => Promise<void>;
  generarHorario: () => void;
  generarHorarioEnServidor: (periodId: string) => Promise<void>;
  reiniciarHorario: () => void;
  agregarCurso: (curso: Curso) => void;
  eliminarCurso: (id: string) => void;
  agregarDocente: (docente: Docente) => void;
  eliminarDocente: (id: string) => void;
  agregarAula: (aula: Aula) => void;
  eliminarAula: (id: string) => void;
}

export const useHorarioStore = create<EstadoHorarioStore>((set, get) => ({
  cursos: [],
  docentes: [],
  aulas: [],
  bytesTransferidos: 0,

  cursosPaginacion: {
    total: 0,
    page: 1,
    limit: 30,
    totalPages: 1,
  },

  estado: 'inactivo',
  asignaciones: [],
  tiempoGeneracionMs: 0,
  nodosExplorados: 0,
  retrocesos: 0,
  mensajeError: null,
  cspTreeId: null,

  cargarDatosDeMongo: async (force = false, page = 1, limit = 30) => {
    // Si no es forzado, ya tenemos datos cargados en Zustand y estamos solicitando la pag 1,
    // evitamos volver a realizar solicitudes HTTP repetidas (Caché local)
    if (
      !force &&
      page === 1 &&
      get().cursos.length > 0 &&
      get().docentes.length > 0 &&
      get().aulas.length > 0
    ) {
      console.log('⚡ Cargando datos del catálogo desde el caché local (Zustand)...');
      return;
    }

    try {
      // Fetch Cursos con paginación
      const resCursos = await fetch(
        `http://localhost:5000/api/courses?page=${page}&limit=${limit}`,
      );
      const dataCursos = await resCursos.json();

      // Fetch Docentes
      const resDocentes = await fetch('http://localhost:5000/api/teachers');
      const dataDocentes = await resDocentes.json();

      // Fetch Aulas
      const resAulas = await fetch('http://localhost:5000/api/classrooms');
      const dataAulas = await resAulas.json();

      // Mapeador (Anti-Corruption Layer) para resolver inconsistencias entre la base de datos MERN y el resolvedor del cliente
      const mappedCursos: Curso[] = dataCursos.success
        ? (dataCursos.data as RawCourse[]).map((c) => ({
            id: c._id,
            _id: c._id,
            codigo: c.codigo,
            nombre: c.nombre,
            creditos: c.creditos,
            horasSemanales: c.horasSemanales,
            requiereLab: c.requiereLaboratorio,
            requiereLaboratorio: c.requiereLaboratorio,
            prerrequisitos: c.prerrequisitos ? c.prerrequisitos.map((p) => p.toString()) : [],
            capacidadMaxima: c.capacidadMaxima,
            activo: c.activo,
            estaActivo: c.activo,
            carreraId: c.carreraId ? c.carreraId.toString() : '',
            semestre: c.semestre,
          }))
        : [];

      const mappedDocentes: Docente[] = dataDocentes.success
        ? (dataDocentes.data as RawTeacher[]).map((d) => ({
            id: d._id,
            _id: d._id,
            usuarioId: d.usuarioId
              ? (typeof d.usuarioId === 'string' ? d.usuarioId : d.usuarioId._id).toString()
              : '',
            codigoEmpleado: d.codigoEmpleado,
            departamento: d.departamento,
            horasMaximasSemanales: d.horasMaximasSemanales,
            disponibilidad: d.disponibilidad
              ? d.disponibilidad.map((disp) => ({
                  diaSemana: disp.diaSemana,
                  horaInicio: disp.horaInicio,
                  horaFin: disp.horaFin,
                }))
              : [],
            cursosHabilitados: d.cursosHabilitados
              ? d.cursosHabilitados.map((c) => c.toString())
              : [],
            cursosCalificados: d.cursosHabilitados
              ? d.cursosHabilitados.map((c) => c.toString())
              : [],
            activo: d.activo,
            nombreCompleto: d.usuarioId
              ? typeof d.usuarioId === 'string'
                ? `Prof. ${d.codigoEmpleado}`
                : d.usuarioId.nombreCompleto
              : `Prof. ${d.codigoEmpleado}`,
          }))
        : [];

      const mappedAulas: Aula[] = dataAulas.success
        ? (dataAulas.data as RawClassroom[]).map((a) => ({
            id: a._id,
            _id: a._id,
            nombre: a.nombre,
            edificio: a.pabellon,
            pabellon: a.pabellon,
            piso: a.piso,
            capacidad: a.capacidad,
            esLaboratorio: a.esLaboratorio,
            tieneProyector: a.tieneProyector,
            activo: a.activo,
            estaActiva: a.activo,
          }))
        : [];

      const paginacion = dataCursos.pagination || {
        total: mappedCursos.length,
        page: 1,
        limit: 30,
        totalPages: 1,
      };

      const bytesCursos = JSON.stringify(dataCursos).length;
      const bytesDocentes = JSON.stringify(dataDocentes).length;
      const bytesAulas = JSON.stringify(dataAulas).length;
      const bytesTransferred = bytesCursos + bytesDocentes + bytesAulas;

      set({
        cursos: mappedCursos,
        docentes: mappedDocentes,
        aulas: mappedAulas,
        cursosPaginacion: paginacion,
        bytesTransferidos: get().bytesTransferidos + bytesTransferred,
      });
    } catch (error) {
      console.error('Error cargando datos de MongoDB:', error);
    }
  },

  generarHorario: async () => {
    set({ estado: 'generando', mensajeError: null });

    // Ejecutar en un setTimeout para permitir que la UI muestre el estado "generando"
    setTimeout(async () => {
      const { cursos, docentes, aulas } = get();
      const resultado = resolverHorario(cursos, docentes, aulas);

      let treeId = null;
      if (resultado.arbolDeBusqueda) {
        const { guardarArbolCspEnFirebase } = await import('@/lib/cspLogger');
        treeId = await guardarArbolCspEnFirebase(resultado.arbolDeBusqueda, resultado.estadisticas);
      }

      if (resultado.exito) {
        set({
          estado: 'generado',
          asignaciones: resultado.asignaciones,
          tiempoGeneracionMs: resultado.estadisticas.tiempoTotalMs,
          nodosExplorados: resultado.estadisticas.nodosExplorados,
          retrocesos: resultado.estadisticas.retrocesos,
          mensajeError: null,
          cspTreeId: treeId,
        });
      } else {
        set({
          estado: 'fallido',
          asignaciones: [],
          tiempoGeneracionMs: resultado.estadisticas.tiempoTotalMs,
          nodosExplorados: resultado.estadisticas.nodosExplorados,
          retrocesos: resultado.estadisticas.retrocesos,
          cspTreeId: treeId,
          mensajeError:
            'No se encontró una asignación de horario válida con las restricciones actuales.',
        });
      }
    }, 500);
  },

  generarHorarioEnServidor: async (periodId: string) => {
    set({ estado: 'generando', mensajeError: null });
    try {
      const response = await fetch('http://localhost:5000/api/schedules/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ periodId }),
      });
      const data = await response.json();

      if (!data.success) {
        set({
          estado: 'fallido',
          asignaciones: [],
          mensajeError: data.message || 'No se encontró solución con los datos actuales.',
          tiempoGeneracionMs: 0,
          nodosExplorados: 0,
          retrocesos: 0,
        });
        return;
      }

      // Obtener el detalle del horario generado con GET /api/schedules/:id
      const resDetail = await fetch(`http://localhost:5000/api/schedules/${data.data.scheduleId}`);
      const dataDetail = await resDetail.json();

      if (dataDetail.success && dataDetail.data) {
        // Mapear de las propiedades del backend a las del frontend
        const mappedAssignments = (dataDetail.data.assignments as RawAssignment[]).map((a) => ({
          cursoId: a.courseId,
          cursoNombre: a.courseName,
          docenteId: a.teacherId,
          docenteNombre: a.teacherName,
          aulaId: a.classroomId,
          aulaNombre: a.classroomName,
          diaSemana: a.dayOfWeek,
          horaInicio: a.startTime,
          horaFin: a.endTime,
          tamanoGrupo: a.groupSize || 30,
        }));

        const bytesGen = JSON.stringify(data).length;
        const bytesDetail = JSON.stringify(dataDetail).length;
        const totalGenBytes = bytesGen + bytesDetail;

        set({
          estado: 'generado',
          asignaciones: mappedAssignments,
          tiempoGeneracionMs: data.data.generationTimeMs,
          nodosExplorados: data.data.nodesExplored,
          retrocesos: data.data.backtracks,
          mensajeError: null,
          cspTreeId: data.data.scheduleId,
          bytesTransferidos: get().bytesTransferidos + totalGenBytes,
        });
      } else {
        throw new Error('No se pudo recuperar el detalle del horario generado.');
      }
    } catch (error: unknown) {
      console.error('Error generando horario en el servidor MERN:', error);
      set({
        estado: 'fallido',
        asignaciones: [],
        mensajeError:
          error instanceof Error ? error.message : 'Error de conexión con el servidor MERN.',
        tiempoGeneracionMs: 0,
        nodosExplorados: 0,
        retrocesos: 0,
      });
    }
  },

  reiniciarHorario: () => {
    set({
      estado: 'inactivo',
      asignaciones: [],
      tiempoGeneracionMs: 0,
      nodosExplorados: 0,
      retrocesos: 0,
      mensajeError: null,
      cspTreeId: null,
    });
  },

  agregarCurso: (curso) => set((s) => ({ cursos: [...s.cursos, curso] })),
  eliminarCurso: (id) => set((s) => ({ cursos: s.cursos.filter((c) => c._id !== id) })),
  agregarDocente: (docente) => set((s) => ({ docentes: [...s.docentes, docente] })),
  eliminarDocente: (id) => set((s) => ({ docentes: s.docentes.filter((d) => d._id !== id) })),
  agregarAula: (aula) => set((s) => ({ aulas: [...s.aulas, aula] })),
  eliminarAula: (id) => set((s) => ({ aulas: s.aulas.filter((a) => a._id !== id) })),
}));
