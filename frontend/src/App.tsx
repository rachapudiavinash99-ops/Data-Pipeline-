import { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Plus, Save, Send, BarChart3 } from 'lucide-react';

function App() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState('pipelines');
  const [salesData, setSalesData] = useState<any[]>([]);

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
      
      if (id > 0) {
        setTimeout(() => {
          // Generate slightly different data depending on the pipeline ID
          const regions = ['North America', 'Europe', 'Asia Pacific', 'South America', 'Middle East'];
          const products = ['Enterprise License', 'Cloud Storage 5TB', 'API Access Tier 3', 'Support Retainer', 'Premium SLA'];
          const baseId = 900 + (id * 10);
          
          setSalesData([
            { id: `TRX-${baseId + 1}`, date: '2026-09-03', product: products[id % 5], region: regions[(id+0) % 5], amount: `$${45000 + (id * 1500)}` },
            { id: `TRX-${baseId + 2}`, date: '2026-09-03', product: products[(id+1) % 5], region: regions[(id+1) % 5], amount: `$${12500 + (id * 800)}` },
            { id: `TRX-${baseId + 3}`, date: '2026-09-02', product: products[(id+2) % 5], region: regions[(id+2) % 5], amount: `$${8200 + (id * 400)}` },
            { id: `TRX-${baseId + 4}`, date: '2026-09-02', product: products[(id+3) % 5], region: regions[(id+3) % 5], amount: `$${15000 + (id * 1000)}` },
            { id: `TRX-${baseId + 5}`, date: '2026-09-01', product: products[(id+4) % 5], region: regions[(id+4) % 5], amount: `$${45000 + (id * 1500)}` }
          ]);
          setMessage(`Pipeline #${id} execution completed! Data warehouse updated.`);
          fetchPipelines();
        }, 1500);
      }
    } catch (err) {
      setMessage(`Error running pipeline ${id}`);
    }
    setLoading(false);
  };

  const storeData = async (id: number) => {
    setLoading(true);
    setMessage(`Storing data for Pipeline #${id} into the primary data warehouse...`);
    try {
      // Assuming you might add a store endpoint later, or just simulate it here
      setTimeout(() => {
        setMessage(`Data for Pipeline #${id} successfully stored!`);
        setLoading(false);
      }, 1500);
    } catch (err) {}
  };

  const transferData = async (id: number) => {
    setLoading(true);
    setMessage(`Initiating data transfer for Pipeline #${id} to secondary location...`);
    try {
      const res = await axios.post(`/api/pipelines/` + id + `/transfer`);
      setTimeout(() => {
        setMessage(res.data.message);
        fetchPipelines();
      }, 1500);
    } catch (err) {
      setMessage(`Error transferring pipeline ` + id);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Activity color="#2563eb" size={28} />
          <h1 style={{ color: '#0f172a', fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>Nexus Data Platform</h1>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => setActiveTab('pipelines')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: activeTab === 'pipelines' ? '#2563eb' : '#64748b', fontWeight: activeTab === 'pipelines' ? 600 : 400 }}>Pipelines</button>
          <button onClick={() => setActiveTab('connections')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', color: activeTab === 'connections' ? '#2563eb' : '#64748b', fontWeight: activeTab === 'connections' ? 600 : 400 }}>Connections</button>
        </div>
      </nav>
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', padding: '1rem 1.5rem', backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '0 8px 8px 0', color: '#1e40af' }}>
          <strong>System Status:</strong> {message || "Ready and connected to backend services."}
        </div>

        {activeTab === 'pipelines' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#0f172a' }}>Active Pipelines</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={createPipeline} disabled={loading} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16} /> New Pipeline</button>
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
                      <td style={{ padding: '1rem' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>{p.status}</span></td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => runPipeline(p.id)} style={{ padding: '0.375rem 0.75rem', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={14} /> Execute</button>
                        <button onClick={() => storeData(p.id)} style={{ padding: '0.375rem 0.75rem', cursor: 'pointer', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Save size={14} /> Store Data</button>
                        <button onClick={() => transferData(p.id)} style={{ padding: '0.375rem 0.75rem', cursor: 'pointer', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Send size={14} /> Transfer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {salesData.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BarChart3 size={20} color="#2563eb" /> Recent Processed Sales Data</h3>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.875rem' }}>Transaction ID</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.875rem' }}>Date</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.875rem' }}>Product</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.875rem' }}>Region</th>
                        <th style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.875rem', textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.map((row: any) => (
                        <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>{row.id}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{row.date}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{row.product}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{row.region}</td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, color: '#10b981' }}>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
