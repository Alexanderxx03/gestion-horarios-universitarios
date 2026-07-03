"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
    var arr = __spreadArray([], __read(array), false);
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = __read([arr[j], arr[i]], 2), arr[i] = _a[0], arr[j] = _a[1];
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
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f;
    var _g, _h;
    var inicio = Date.now(); console.log('Cursos received:', cursos);
    var retrocesos = 0;
    var nodosExplorados = 0;
    // Mapear docentes calificados por curso
    var docentesPorCurso = new Map();
    var disponibilidadDocente = new Map();
    var mapaDocenteNombre = new Map();
    try {
        for (var docentes_1 = __values(docentes), docentes_1_1 = docentes_1.next(); !docentes_1_1.done; docentes_1_1 = docentes_1.next()) {
            var d = docentes_1_1.value;
            disponibilidadDocente.set(d.id, d.disponibilidad);
            mapaDocenteNombre.set(d.id, d.nombreCompleto || d.codigoEmpleado);
            try {
                for (var _j = (e_2 = void 0, __values(d.cursosCalificados)), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var cid = _k.value;
                    var arr = (_g = docentesPorCurso.get(cid)) !== null && _g !== void 0 ? _g : [];
                    arr.push(d.id);
                    docentesPorCurso.set(cid, arr);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (docentes_1_1 && !docentes_1_1.done && (_a = docentes_1.return)) _a.call(docentes_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    try {
        for (var variables_1 = __values(variables), variables_1_1 = variables_1.next(); !variables_1_1.done; variables_1_1 = variables_1.next()) {
            var v = variables_1_1.value;
            var valores = [];
            try {
                for (var _l = (e_4 = void 0, __values(v.docentesCalificadosIds)), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var did = _m.value;
                    var disp = disponibilidadDocente.get(did);
                    if (!disp)
                        continue;
                    var nombreDoc = (_h = mapaDocenteNombre.get(did)) !== null && _h !== void 0 ? _h : did;
                    try {
                        for (var mapaAulas_1 = (e_5 = void 0, __values(mapaAulas)), mapaAulas_1_1 = mapaAulas_1.next(); !mapaAulas_1_1.done; mapaAulas_1_1 = mapaAulas_1.next()) {
                            var _o = __read(mapaAulas_1_1.value, 2), aulaId = _o[0], aula = _o[1];
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
                            try {
                                for (var FRANJAS_SISTEMA_1 = (e_6 = void 0, __values(FRANJAS_SISTEMA)), FRANJAS_SISTEMA_1_1 = FRANJAS_SISTEMA_1.next(); !FRANJAS_SISTEMA_1_1.done; FRANJAS_SISTEMA_1_1 = FRANJAS_SISTEMA_1.next()) {
                                    var franja = FRANJAS_SISTEMA_1_1.value;
                                    _loop_1(franja);
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (FRANJAS_SISTEMA_1_1 && !FRANJAS_SISTEMA_1_1.done && (_f = FRANJAS_SISTEMA_1.return)) _f.call(FRANJAS_SISTEMA_1);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (mapaAulas_1_1 && !mapaAulas_1_1.done && (_e = mapaAulas_1.return)) _e.call(mapaAulas_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_4) throw e_4.error; }
            }
            dominios.set(v.cursoId, valores);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (variables_1_1 && !variables_1_1.done && (_c = variables_1.return)) _c.call(variables_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    function esConsistente(valor, asignaciones) {
        var e_7, _a;
        try {
            for (var asignaciones_1 = __values(asignaciones), asignaciones_1_1 = asignaciones_1.next(); !asignaciones_1_1.done; asignaciones_1_1 = asignaciones_1.next()) {
                var a = asignaciones_1_1.value;
                var ev = a.valor;
                if (ev.docenteId === valor.docenteId && franjasSeSuperponen(ev, valor))
                    return false;
                if (ev.aulaId === valor.aulaId && franjasSeSuperponen(ev, valor))
                    return false;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (asignaciones_1_1 && !asignaciones_1_1.done && (_a = asignaciones_1.return)) _a.call(asignaciones_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return true;
    }
    function verificacionAdelante(_valor, restantes, doms, asignaciones) {
        var e_8, _a;
        var _b;
        var nuevosDominios = new Map();
        try {
            for (var restantes_1 = __values(restantes), restantes_1_1 = restantes_1.next(); !restantes_1_1.done; restantes_1_1 = restantes_1.next()) {
                var v = restantes_1_1.value;
                var d = (_b = doms.get(v.cursoId)) !== null && _b !== void 0 ? _b : [];
                var filtrado = d.filter(function (cv) { return esConsistente(cv, asignaciones); });
                if (filtrado.length === 0)
                    return null;
                nuevosDominios.set(v.cursoId, filtrado);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (restantes_1_1 && !restantes_1_1.done && (_a = restantes_1.return)) _a.call(restantes_1);
            }
            finally { if (e_8) throw e_8.error; }
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
            var nuevasAsignaciones = __spreadArray(__spreadArray([], __read(asignacionesActuales), false), [
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
