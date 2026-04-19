import { useState } from 'react';

const BADGE_CLASSES = {
  'High Value': 'warning',
  'Inactive': 'danger',
  'New': 'info',
  'Regular': 'neutral',
};

export default function CustomerTable({ customers }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = search
    ? customers.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.email.toLowerCase().includes(search.toLowerCase())
      )
    : customers;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCustomers = filtered.slice(startIndex, startIndex + pageSize);

  // Reset page to 1 when search changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="data-table-container">
      <div className="table-header-toolbar">
        <div style={{ fontSize: 14, fontWeight: 500 }}>Customer Directory</div>
        <input 
          type="text" 
          placeholder="Search customers..." 
          className="table-search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contact</th>
            <th>Last Order</th>
            <th>Lifetime Value</th>
            <th>Segment</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.length === 0 ? (
             <tr>
               <td colSpan="5" style={{ textAlign: 'center', padding: '40px 0' }}>No local customers found.</td>
             </tr>
           ) : (
            paginatedCustomers.map((c) => (
              <tr key={c._id}>
                <td className="td-primary">{c.name}</td>
                <td>{c.email}</td>
                <td>{new Date(c.last_purchase_date).toLocaleDateString()}</td>
                <td>₹{c.total_spent.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`badge ${BADGE_CLASSES[c.segment] || 'neutral'}`}>
                    {c.segment}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {filtered.length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '12px 16px', 
          borderTop: '1px solid var(--border-subtle)', 
          fontSize: 13, 
          color: 'var(--text-tertiary)' 
        }}>
          <div>
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filtered.length)} of {filtered.length} customers
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="tab-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              style={{ padding: '4px 12px', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <button 
              className="tab-btn" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              style={{ padding: '4px 12px', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
