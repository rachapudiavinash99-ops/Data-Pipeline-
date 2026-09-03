import React from 'react';
import { EnterpriseView1 } from './components/enterprise/EnterpriseViews';
import { EnterpriseView2 } from './components/enterprise/EnterpriseViews';
import { EnterpriseView3 } from './components/enterprise/EnterpriseViews';

function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2563eb' }}>Data Pipeline Management Platform</h1>
        <p style={{ color: '#64748b' }}>Enterprise Edition - Live Production Dashboard</p>
      </header>
      
      <main>
        <div style={{ display: 'grid', gap: '2rem' }}>
          <section style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <EnterpriseView1 />
          </section>
          
          <section style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <EnterpriseView2 />
          </section>
          
          <section style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <EnterpriseView3 />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
