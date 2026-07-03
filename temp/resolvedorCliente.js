"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolverHorario = resolverHorario;
function horaAMinutos(hora) {
    var _a, _b;
    var partes = hora.split(':').map(Number);
    return ((_a = partes[0]) !== null && _a !== void 0 ? _a : 0) * 60 + ((_b = partes[1]) !== null && _b !== void 0 ? _b : 0);
}
// Función de utilidad para barajar (shuffle) arreglos
function shuffleArray(array) {
    var _a;
    var arr = __spreadArray([], array, true);
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
    }
    return arr;
}
function franjasSeSuperponen(a, b) {
    if (a.diaSemana !== b.diaSemana)
        return false;
    var aI = horaAMinutos(a.horaInicio), aF = horaAMinutos(a.horaFin);
    var bI = horaAMinutos(b.horaInicio), bF = horaAMinutos(b.horaFin);
    return aI < bF && bI < aF;
}
var FRANJAS_SISTEMA = [];
for (var dia = 1; dia <= 5; dia++) {
    FRANJAS_SISTEMA.push({ diaSemana: dia, horaInicio: '07:00', horaFin: '09:00' }, { diaSemana: dia, horaInicio: '09:00', horaFin: '11:00' }, { diaSemana: dia, horaInicio: '11:00', horaFin: '13:00' }, { diaSemana: dia, horaInicio: '14:00', horaFin: '16:00' }, { diaSemana: dia, horaInicio: '16:00', horaFin: '18:00' });
}
FRANJAS_SISTEMA.push({ diaSemana: 6, horaInicio: '08:00', horaFin: '10:00' }, { diaSemana: 6, horaInicio: '10:00', horaFin: '12:00' });
function resolverHorario(cursos, docentes, aulas) {
    var _a, _b;
    var inicio = Date.now();
    var retrocesos = 0;
    var nodosExplorados = 0;
    // Mapear docentes calificados por curso
    var docentesPorCurso = new Map();
    var disponibilidadDocente = new Map();
    var mapaDocenteNombre = new Map();
    for (var _i = 0, docentes_1 = docentes; _i < docentes_1.length; _i++) {
        var d = docentes_1[_i];
        disponibilidadDocente.set(d.id, d.disponibilidad);
        mapaDocenteNombre.set(d.id, d.nombreCompleto || d.codigoEmpleado);
        for (var _c = 0, _d = d.cursosCalificados; _c < _d.length; _c++) {
            var cid = _d[_c];
            var arr = (_a = docentesPorCurso.get(cid)) !== null && _a !== void 0 ? _a : [];
            arr.push(d.id);
            docentesPorCurso.set(cid, arr);
        }
    }
    var mapaAulas = new Map(aulas.map(function (a) { return [a.id, a]; }));
    // Variables
    var variables = cursos
        .filter(function (c) { return c.estaActivo; })
        .map(function (c) {
        var _a;
        return ({
            cursoId: c.id,
            cursoNombre: c.nombre,
            requiereLab: c.requiereLab,
            capacidadMaxima: c.capacidadMaxima,
            docentesCalificadosIds: (_a = docentesPorCurso.get(c.id)) !== null && _a !== void 0 ? _a : [],
        });
    });
    // Construir dominios iniciales
    var dominios = new Map();
    for (var _e = 0, variables_1 = variables; _e < variables_1.length; _e++) {
        var v = variables_1[_e];
        var valores = [];
        for (var _f = 0, _g = v.docentesCalificadosIds; _f < _g.length; _f++) {
            var did = _g[_f];
            var disp = disponibilidadDocente.get(did);
            if (!disp)
                continue;
            var nombreDoc = (_b = mapaDocenteNombre.get(did)) !== null && _b !== void 0 ? _b : did;
            for (var _h = 0, mapaAulas_1 = mapaAulas; _h < mapaAulas_1.length; _h++) {
                var _j = mapaAulas_1[_h], aulaId = _j[0], aula = _j[1];
                if (aula.capacidad < v.capacidadMaxima)
                    continue;
                if (v.requiereLab && !aula.esLaboratorio)
                    continue;
                var _loop_1 = function (franja) {
                    var fI = horaAMinutos(franja.horaInicio);
                    var fF = horaAMinutos(franja.horaFin);
                    var disponible = disp.some(function (d) {
                        return d.diaSemana === franja.diaSemana &&
                            horaAMinutos(d.horaInicio) <= fI &&
                            horaAMinutos(d.horaFin) >= fF;
                    });
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
                };
                for (var _k = 0, FRANJAS_SISTEMA_1 = FRANJAS_SISTEMA; _k < FRANJAS_SISTEMA_1.length; _k++) {
                    var franja = FRANJAS_SISTEMA_1[_k];
                    _loop_1(franja);
                }
            }
        }
        dominios.set(v.cursoId, valores);
    }
    function esConsistente(valor, asignaciones) {
        for (var _i = 0, asignaciones_1 = asignaciones; _i < asignaciones_1.length; _i++) {
            var a = asignaciones_1[_i];
            var ev = a.valor;
            if (ev.docenteId === valor.docenteId && franjasSeSuperponen(ev, valor))
                return false;
            if (ev.aulaId === valor.aulaId && franjasSeSuperponen(ev, valor))
                return false;
        }
        return true;
    }
    function verificacionAdelante(_valor, restantes, doms, asignaciones) {
        var _a;
        var nuevosDominios = new Map();
        for (var _i = 0, restantes_1 = restantes; _i < restantes_1.length; _i++) {
            var v = restantes_1[_i];
            var d = (_a = doms.get(v.cursoId)) !== null && _a !== void 0 ? _a : [];
            var filtrado = d.filter(function (cv) { return esConsistente(cv, asignaciones); });
            if (filtrado.length === 0)
                return null;
            nuevosDominios.set(v.cursoId, filtrado);
        }
        return nuevosDominios;
    }
    var nodoRaiz = {
        id: 'root',
        variable: 'Inicio del Motor CSP',
        valorAsignado: '-',
        estado: 'explorando',
        hijos: [],
    };
    function resolver(asignacionesActuales, sinAsignar, doms, nodoActual) {
        var _a, _b, _c, _d, _e;
        if (Date.now() - inicio > 30000) {
            nodoActual.estado = 'fallo';
            return null;
        }
        if (sinAsignar.length === 0) {
            nodoActual.estado = 'exito';
            return asignacionesActuales;
        }
        nodosExplorados++;
        // MRV: seleccionar variable con menor dominio
        var mejorIndice = 0;
        var mejorTamano = (_b = (_a = doms.get(sinAsignar[0].cursoId)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : Infinity;
        for (var i = 1; i < sinAsignar.length; i++) {
            var tam = (_d = (_c = doms.get(sinAsignar[i].cursoId)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : Infinity;
            if (tam < mejorTamano) {
                mejorIndice = i;
                mejorTamano = tam;
            }
        }
        var mejor = sinAsignar[mejorIndice];
        var dominio = (_e = doms.get(mejor.cursoId)) !== null && _e !== void 0 ? _e : [];
        if (dominio.length === 0) {
            nodoActual.estado = 'podado';
            return null;
        }
        // 🔥 Agregamos aleatoriedad aquí: barajamos el dominio para que explore
        // diferentes ramas primero y entregue un horario diferente cada vez.
        var dominioBarajado = shuffleArray(dominio);
        for (var idx = 0; idx < dominioBarajado.length; idx++) {
            var valor = dominioBarajado[idx];
            var hijoId = "".concat(nodoActual.id, "-").concat(idx);
            var nodoHijo = {
                id: hijoId,
                variable: mejor.cursoNombre,
                valorAsignado: "".concat(valor.docenteNombre, " | ").concat(valor.aulaNombre, " | D\u00EDa ").concat(valor.diaSemana, " (").concat(valor.horaInicio, "-").concat(valor.horaFin, ")"),
                estado: 'explorando',
                hijos: [],
            };
            // Limitar el número de hijos renderizados para no saturar la BD si el árbol es masivo
            if (idx < 50)
                nodoActual.hijos.push(nodoHijo);
            if (!esConsistente(valor, asignacionesActuales)) {
                nodoHijo.estado = 'fallo';
                continue;
            }
            var nuevasAsignaciones = __spreadArray(__spreadArray([], asignacionesActuales, true), [
                { variable: mejor, valor: valor },
            ], false);
            var restantes = sinAsignar.filter(function (v) { return v.cursoId !== mejor.cursoId; });
            var podado = verificacionAdelante(valor, restantes, doms, nuevasAsignaciones);
            if (podado !== null) {
                var resultado = resolver(nuevasAsignaciones, restantes, podado, nodoHijo);
                if (resultado !== null) {
                    nodoHijo.estado = 'exito';
                    return resultado;
                }
            }
            else {
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
    var solucion = resolver([], variables, dominios, nodoRaiz);
    var tiempoTotalMs = Date.now() - inicio;
    if (solucion)
        nodoRaiz.estado = 'exito';
    if (!solucion) {
        return {
            exito: false,
            asignaciones: [],
            estadisticas: { tiempoTotalMs: tiempoTotalMs, nodosExplorados: nodosExplorados, retrocesos: retrocesos },
            arbolDeBusqueda: nodoRaiz,
        };
    }
    var asignaciones = solucion.map(function (a) { return ({
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
    }); });
    return {
        exito: true,
        asignaciones: asignaciones,
        estadisticas: { tiempoTotalMs: tiempoTotalMs, nodosExplorados: nodosExplorados, retrocesos: retrocesos },
        arbolDeBusqueda: nodoRaiz,
    };
}
