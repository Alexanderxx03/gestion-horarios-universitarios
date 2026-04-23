export function Home() {
  return (
    <div className="animate-fade-in">
      <nav className="glass-nav">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '70px',
          }}
        >
          <div
            style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}
          >
            Prisma<span style={{ color: 'var(--accent)' }}>Academic</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Características
            </a>
            <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Nosotros
            </a>
            <button className="btn-primary" style={{ padding: '8px 16px' }}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section container">
          <h1 className="hero-title">Gestión Inteligente de Horarios</h1>
          <p className="hero-subtitle">
            Optimiza tu campus con nuestro motor CSP de última generación. Cero conflictos, máxima
            eficiencia y planificación automática en segundos.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary">Empezar Ahora</button>
            <button
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid var(--glass-border)',
                padding: '10px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Ver Demo
            </button>
          </div>
        </section>

        <section id="features" className="container" style={{ paddingBottom: '8rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Motor CSP Avanzado</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Algoritmos de Backtracking y MRV que garantizan horarios 100% libres de conflictos
                entre docentes y aulas.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Generación Instantánea</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Lo que antes tomaba semanas, ahora se resuelve en segundos. Ahorra tiempo crítico en
                cada período académico.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Interfaz Adaptativa</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Visualiza y gestiona horarios desde cualquier dispositivo con nuestra experiencia
                web premium.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--glass-border)',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--text-muted)' }}>© 2026 Prisma Academic — Taller de Proyectos 2</p>
      </footer>
    </div>
  );
}
