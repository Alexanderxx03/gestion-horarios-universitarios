const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/index.css');
const content = fs.readFileSync(cssPath, 'utf8');

const lines = content.split('\n');

const newCSS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  /* ============================================================
     Premium Light Theme (Vibrant & Sleek)
     ============================================================ */
  --primary: #ffffff;
  --primary-light: #fdfdfd;
  --primary-lighter: #f8fafc;
  
  --accent: #6366f1; 
  --accent-hover: #4f46e5;
  --accent-glow: rgba(99, 102, 241, 0.25);
  --accent-subtle: rgba(99, 102, 241, 0.08);
  
  --success: #10b981;
  --success-subtle: rgba(16, 185, 129, 0.1);
  --warning: #f59e0b;
  --warning-subtle: rgba(245, 158, 11, 0.1);
  --danger: #ef4444;
  --danger-subtle: rgba(239, 68, 68, 0.1);
  
  --text-main: #0f172a;
  --text-muted: #475569;
  --text-dimmed: #64748b;
  
  --bg-main: #f4f7f9;
  --bg-card: #ffffff;
  
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-border-hover: rgba(99, 102, 241, 0.3);
  --card-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 10px -5px rgba(15, 23, 42, 0.04);
  --card-shadow-hover: 0 20px 40px -10px rgba(99, 102, 241, 0.15), 0 8px 16px -5px rgba(99, 102, 241, 0.1);
  
  --input-bg: rgba(255, 255, 255, 0.9);
  --input-border: rgba(15, 23, 42, 0.1);
  
  --bg-sidebar: rgba(255, 255, 255, 0.85);
  --bg-topbar: rgba(255, 255, 255, 0.75);
  --nav-bg: rgba(255, 255, 255, 0.85);

  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;

  --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-bounce: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  --sidebar-width: 280px;
  --header-height: 72px;

  --schedule-1: #6366f1;
  --schedule-2: #8b5cf6;
  --schedule-3: #ec4899;
  --schedule-4: #14b8a6;
  --schedule-5: #f97316;
  --schedule-6: #0ea5e9;
  --schedule-7: #84cc16;
  --schedule-8: #eab308;
  --schedule-9: #f43f5e;
  --schedule-10: #a855f7;
}

body.dark-theme {
  --primary: #0a0a0a;
  --primary-light: #121212;
  --primary-lighter: #1a1a1a;
  
  --accent: #38bdf8;
  --accent-hover: #7dd3fc;
  --accent-glow: rgba(56, 189, 248, 0.3);
  --accent-subtle: rgba(56, 189, 248, 0.12);
  
  --success: #34d399;
  --success-subtle: rgba(52, 211, 153, 0.15);
  --warning: #fbbf24;
  --warning-subtle: rgba(251, 191, 36, 0.15);
  --danger: #f87171;
  --danger-subtle: rgba(248, 113, 113, 0.15);
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-dimmed: #64748b;
  
  --bg-main: #050505;
  --bg-card: #0a0a0a;
  
  --glass-bg: rgba(18, 18, 18, 0.65);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-border-hover: rgba(56, 189, 248, 0.25);
  --card-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8);
  --card-shadow-hover: 0 20px 40px -10px rgba(56, 189, 248, 0.15), 0 0 20px rgba(56, 189, 248, 0.05);
  
  --input-bg: rgba(255, 255, 255, 0.03);
  --input-border: rgba(255, 255, 255, 0.08);
  
  --bg-sidebar: rgba(10, 10, 10, 0.85);
  --bg-topbar: rgba(10, 10, 10, 0.75);
  --nav-bg: rgba(10, 10, 10, 0.85);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
  background-image: 
    radial-gradient(circle at 15% 50%, var(--accent-subtle) 0%, transparent 40%),
    radial-gradient(circle at 85% 30%, rgba(236, 72, 153, 0.05) 0%, transparent 40%);
  background-attachment: fixed;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-main);
}

a { 
  color: var(--accent); 
  text-decoration: none; 
  transition: var(--transition-fast);
}
a:hover { 
  color: var(--accent-hover); 
  text-shadow: 0 0 8px var(--accent-glow);
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: var(--card-shadow);
  transition: var(--transition-bounce);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  pointer-events: none;
  opacity: 0;
  transition: var(--transition-smooth);
}

.glass-card:hover {
  border-color: var(--glass-border-hover);
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-4px);
}

.glass-card:hover::before {
  opacity: 1;
}

.glass-nav {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

@keyframes fadeInScale {
  0% { opacity: 0; transform: scale(0.95) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes slideInRight {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-fade-in { animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-slide-in { animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-float { animation: float 6s ease-in-out infinite; }

.btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: var(--transition-bounce);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: var(--transition-fast);
}

.btn:hover::after {
  opacity: 1;
}

.btn:active {
  transform: scale(0.96);
}

.btn-primary {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 4px 14px 0 var(--accent-glow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--accent-glow);
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--input-bg);
  color: var(--text-main);
  border: 1px solid var(--glass-border);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 4px 14px 0 var(--accent-subtle);
}

.btn-danger {
  background: var(--danger-subtle);
  color: var(--danger);
}

.btn-danger:hover {
  background: var(--danger);
  color: white;
  box-shadow: 0 4px 14px 0 var(--danger-subtle);
}

.btn-success {
  background: var(--success);
  color: #ffffff;
  box-shadow: 0 4px 14px 0 var(--success-subtle);
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--success-subtle);
}

.btn-sm { padding: 8px 16px; font-size: 0.8rem; border-radius: 8px; }
.btn-lg { padding: 16px 32px; font-size: 1.05rem; }
.btn-icon { padding: 10px; border-radius: 10px; display: inline-flex; }

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
  letter-spacing: 0.01em;
}

.form-input,
.form-select,
.form-textarea {
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text-main);
  font-size: 0.95rem;
  font-family: var(--font-body);
  transition: var(--transition-smooth);
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-subtle), inset 0 1px 2px rgba(0,0,0,0.02);
  background: var(--bg-card);
}

.form-input::placeholder { color: var(--text-dimmed); }

.form-error {
  font-size: 0.8rem;
  color: var(--danger);
  font-weight: 500;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.form-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
  cursor: pointer;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.9rem;
}

.data-table th {
  text-align: left;
  padding: 16px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 2px solid var(--glass-border);
}

.data-table td {
  padding: 16px;
  border-bottom: 1px solid var(--glass-border);
  color: var(--text-main);
  transition: var(--transition-fast);
}

.data-table tr {
  transition: var(--transition-fast);
}

.data-table tr:hover td {
  background: var(--accent-subtle);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table .badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.badge-success { background: var(--success-subtle); color: var(--success); }
.badge-warning { background: var(--warning-subtle); color: var(--warning); }
.badge-danger { background: var(--danger-subtle); color: var(--danger); }
.badge-info { background: var(--accent-subtle); color: var(--accent); }

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2.5rem;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-right: 1px solid var(--glass-border);
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.sidebar-logo span { 
  color: var(--accent); 
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-section-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-dimmed);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 1rem;
  margin-bottom: 0.75rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition-smooth);
  margin-bottom: 0.25rem;
  text-decoration: none;
}

.sidebar-link:hover {
  background: var(--accent-subtle);
  color: var(--accent);
  transform: translateX(4px);
}

.sidebar-link.active {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 4px 12px var(--accent-glow);
}

.sidebar-link .icon {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
}

.topbar {
  height: var(--header-height);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  background: var(--bg-topbar);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-content {
  padding: 2.5rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-main), var(--text-dimmed));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.schedule-container {
  overflow-x: auto;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  box-shadow: var(--card-shadow);
  padding: 0.5rem;
}

.schedule-grid {
  display: grid;
  grid-template-columns: 90px repeat(6, 1fr);
  min-width: 900px;
}

.schedule-header {
  padding: 16px 12px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--glass-border);
}

.schedule-time {
  padding: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
  border-right: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 85px;
}

.schedule-cell {
  border-right: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  padding: 6px;
  min-height: 85px;
  position: relative;
  transition: var(--transition-fast);
}

.schedule-cell:hover {
  background: var(--accent-subtle);
}

.schedule-event {
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 0.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  color: white;
  font-weight: 500;
  transition: var(--transition-bounce);
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.schedule-grid:hover .schedule-event:not(:hover) {
  opacity: 0.4;
  transform: scale(0.98);
}

.schedule-event:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.schedule-event-title {
  font-weight: 700;
  font-size: 0.85rem;
  line-height: 1.3;
}

.schedule-event-detail {
  font-size: 0.7rem;
  opacity: 0.9;
  font-weight: 400;
}

.schedule-event.color-0 { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.schedule-event.color-1 { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.schedule-event.color-2 { background: linear-gradient(135deg, #ec4899, #db2777); }
.schedule-event.color-3 { background: linear-gradient(135deg, #14b8a6, #0d9488); }
.schedule-event.color-4 { background: linear-gradient(135deg, #f97316, #ea580c); }
.schedule-event.color-5 { background: linear-gradient(135deg, #0ea5e9, #0284c7); }
.schedule-event.color-6 { background: linear-gradient(135deg, #84cc16, #65a30d); }
.schedule-event.color-7 { background: linear-gradient(135deg, #eab308, #ca8a04); }
.schedule-event.color-8 { background: linear-gradient(135deg, #f43f5e, #e11d48); }
.schedule-event.color-9 { background: linear-gradient(135deg, #a855f7, #9333ea); }

.hero-section {
  padding: 8rem 0;
  text-align: center;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(to bottom right, var(--text-main), var(--text-dimmed));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  letter-spacing: -0.04em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.8;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 1.5rem;
  transition: var(--transition-bounce);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 100px; height: 100px;
  background: var(--accent);
  filter: blur(60px);
  opacity: 0.1;
  border-radius: 50%;
  transition: var(--transition-smooth);
}

.stat-card:hover::after {
  opacity: 0.2;
  transform: scale(1.5);
}

.stat-card:hover {
  border-color: var(--accent-subtle);
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
}

.stat-card-icon {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--accent);
}

.stat-card-value {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.2;
}

.stat-card-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  animation: fadeIn 0.3s ease;
}

.modal {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 2.5rem;
  max-width: 560px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--glass-border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-lg {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem;
  color: var(--text-muted);
}

.toast {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  z-index: 999;
  animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  backdrop-filter: blur(12px);
}

.toast-success {
  background: var(--success);
  color: #ffffff;
}

.toast-error {
  background: var(--danger);
  color: #ffffff;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-muted);
}

.empty-state-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.4;
}

.empty-state-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

/* ============================================================
   Restoring bottom styles
   ============================================================ */
`;

const bottomStylesIndex = lines.findIndex(line => line.includes('.login-page {'));
const bottomStyles = bottomStylesIndex !== -1 ? lines.slice(bottomStylesIndex).join('\n') : '';

fs.writeFileSync(cssPath, newCSS + '\n' + bottomStyles);
console.log('CSS updated successfully!');
