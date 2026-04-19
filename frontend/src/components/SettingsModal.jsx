import { HiOutlineXMark } from 'react-icons/hi2';

export default function SettingsModal({ isOpen, onClose, theme, setTheme }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="icon-btn" onClick={onClose}>
            <HiOutlineXMark size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="settings-row">
              <div>
                <div className="settings-label">Theme Preference</div>
                <div className="settings-desc">Select your preferred interface theme.</div>
              </div>
              <select 
                className="settings-input" 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark Mode (Default)</option>
                <option value="light">Light Mode</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Data Management</h3>
            <div className="settings-row">
              <div>
                <div className="settings-label">Export Customer Data</div>
                <div className="settings-desc">Download all segmented records as CSV.</div>
              </div>
              <button className="btn-secondary" onClick={() => alert('Exporting data...')}>Export CSV</button>
            </div>
            <div className="settings-row">
              <div>
                <div className="settings-label">Clear All Data</div>
                <div className="settings-desc" style={{ color: 'var(--accent-danger)' }}>Permanently delete all customer records.</div>
              </div>
              <button className="btn-danger" onClick={() => alert('Data cleared!')}>Clear Data</button>
            </div>
          </div>

          <div className="settings-section">
            <h3>API Integration</h3>
            <div className="settings-row">
              <div>
                <div className="settings-label">API Key</div>
                <div className="settings-desc">Used for integrating with third-party tools.</div>
              </div>
              <input type="password" value="sk_test_123456789" readOnly className="settings-input" style={{ width: '150px' }}/>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Save Preferences</button>
        </div>
      </div>
    </div>
  );
}
