import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inicio } from '@/pages/Inicio';
import { DisenoTablero } from '@/components/DisenoTablero';
import { PanelPrincipal } from '@/pages/PanelPrincipal';
import { PaginaCursos } from '@/pages/PaginaCursos';
import { PaginaDocentes } from '@/pages/PaginaDocentes';
import { PaginaAulas } from '@/pages/PaginaAulas';
import { PaginaGenerarHorario } from '@/pages/PaginaGenerarHorario';
import { PaginaVerHorario } from '@/pages/PaginaVerHorario';
import { PaginaMatriculas } from '@/pages/PaginaMatriculas';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/dashboard" element={<DisenoTablero />}>
          <Route index element={<PanelPrincipal />} />
          <Route path="cursos" element={<PaginaCursos />} />
          <Route path="docentes" element={<PaginaDocentes />} />
          <Route path="aulas" element={<PaginaAulas />} />
          <Route path="matriculas" element={<PaginaMatriculas />} />
          <Route path="generar" element={<PaginaGenerarHorario />} />
          <Route path="horario" element={<PaginaVerHorario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
