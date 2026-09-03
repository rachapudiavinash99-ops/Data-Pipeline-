import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Cloud, FileSpreadsheet, Server, Activity, Plus } from 'lucide-react';

function App() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState('pipelines');

  const fetchPipelines = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/pipelines/');
      setPipelines(res.data);
      setMessage("Pipelines loaded successfully!");
    } catch (err) {
      setMessage("Error loading pipelines. Is the backend running?");
    }
    setLoading(false);
  };

  const createPipeline = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/pipelines/');
      setMessage(res.data.message);
      await fetchPipelines();
    } catch (err) {
      setMessage("Error creating pipeline.");
    }
    setLoading(false);
  };

  const runPipeline = async (id: number) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/pipelines/${id}/run`);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(`Error running pipeline ${id}.`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Activity color="#2563eb" size={28} />
          <h1 style={{ color: '#0f172a', fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>Nexus Data Platform</h1>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button 
            onClick={() => setActiveTab('pipelines')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: activeTab === 'pipelines' ? '#2563eb' : '#64748b', fontWeight: activeTab === 'pipelines' ? 600 : 400 }}>
            Pipelines
          </button>
          <button 
            onClick={() => setActiveTab('connections')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: activeTab === 'connections' ? '#2563eb' : '#64748b', fontWeight: activeTab === 'connections' ? 600 : 400 }}>
            Connections
          </button>
        </div>
      </nav>
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Status Bar */}
        <div style={{ marginBottom: '2rem', padding: '1rem 1.5rem', backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '0 8px 8px 0', color: '#1e40af' }}>
          <strong>System Status:</strong> {message || "Ready and connected to backend services."}
        </div>

        {activeTab === 'pipelines' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#0f172a' }}>Active Pipelines</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={fetchPipelines} 
                  disabled={loading}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 500 }}>
                  Refresh
                </button>
                <button 
                  onClick={createPipeline} 
                  disabled={loading}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> New Pipeline
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 500, fontSize: '0.875rem' }}>PIPELINE ID</th>
                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 500, fontSize: '0.875rem' }}>NAME</th>
                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 500, fontSize: '0.875rem' }}>STATUS</th>
                    <th style={{ padding: '1rem', color: '#64748b', fontWeight: 500, fontSize: '0.875rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelines.map((p: any) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 500 }}>#{p.id}</td>
                      <td style={{ padding: '1rem', color: '#334155' }}>{p.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button 
                          onClick={() => runPipeline(p.id)}
                          style={{ padding: '0.375rem 1rem', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 500 }}>
                          Execute
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pipelines.length === 0 && (
                    <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No pipelines found. Create one to get started.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#0f172a' }}>Data Connections</h2>
              <button style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={16} /> Add Source
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* PostgreSQL Card */}
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#2563eb' }}><Database size={24} /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#0f172a' }}>Production DB</h3>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>PostgreSQL 15</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span> Connected</span>
                  <button style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>Configure</button>
                </div>
              </div>

              {/* AWS S3 Card */}
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#fff7ed', borderRadius: '8px', color: '#ea580c' }}><Cloud size={24} /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#0f172a' }}>Raw Data Dumps</h3>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Amazon S3 Bucket</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span> Connected</span>
                  <button style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>Configure</button>
                </div>
              </div>

              {/* REST API Card */}
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', borderRadius: '8px', color: '#4b5563' }}><Server size={24} /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#0f172a' }}>Salesforce API</h3>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>REST Endpoint</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><span style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span> Disconnected</span>
                  <button style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>Configure</button>
                </div>
              </div>

              {/* CSV Uploads Card */}
              <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px dashed #cbd5e1', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '8px', color: '#16a34a' }}><FileSpreadsheet size={24} /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#0f172a' }}>Local CSV/Excel</h3>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Manual Uploads</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Requires File</span>
                  <button style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '0.75rem', borderRadius: '4px', fontWeight: 500 }}>Upload Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
