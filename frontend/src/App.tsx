import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Inicio } from '@/pages/Inicio';
import { DisenoTablero } from '@/components/DisenoTablero';

// Lazy loading of dashboard subpages for initial bundle size optimization (Green IT)
const PanelPrincipal = lazy(() =>
  import('@/pages/PanelPrincipal').then((m) => ({ default: m.PanelPrincipal })),
);
const PaginaCursos = lazy(() =>
  import('@/pages/PaginaCursos').then((m) => ({ default: m.PaginaCursos })),
);
const PaginaDocentes = lazy(() =>
  import('@/pages/PaginaDocentes').then((m) => ({ default: m.PaginaDocentes })),
);
const PaginaAulas = lazy(() =>
  import('@/pages/PaginaAulas').then((m) => ({ default: m.PaginaAulas })),
);
const PaginaGenerarHorario = lazy(() =>
  import('@/pages/PaginaGenerarHorario').then((m) => ({ default: m.PaginaGenerarHorario })),
);
const PaginaVerHorario = lazy(() =>
  import('@/pages/PaginaVerHorario').then((m) => ({ default: m.PaginaVerHorario })),
);
const PaginaMatriculas = lazy(() =>
  import('@/pages/PaginaMatriculas').then((m) => ({ default: m.PaginaMatriculas })),
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/dashboard" element={<DisenoTablero />}>
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando resumen...
                  </div>
                }
              >
                <PanelPrincipal />
              </Suspense>
            }
          />
          <Route
            path="cursos"
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando catálogo...
                  </div>
                }
              >
                <PaginaCursos />
              </Suspense>
            }
          />
          <Route
            path="docentes"
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando docentes...
                  </div>
                }
              >
                <PaginaDocentes />
              </Suspense>
            }
          />
          <Route
            path="aulas"
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando espacios...
                  </div>
                }
              >
                <PaginaAulas />
              </Suspense>
            }
          />
          <Route
            path="matriculas"
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando matrículas...
                  </div>
                }
              >
                <PaginaMatriculas />
              </Suspense>
            }
          />
          <Route
            path="generar"
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando motor CSP...
                  </div>
                }
              >
                <PaginaGenerarHorario />
              </Suspense>
            }
          />
          <Route
            path="horario"
            element={
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                    Cargando horario...
                  </div>
                }
              >
                <PaginaVerHorario />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
