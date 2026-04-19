export default function StatCard({ label, value, icon, trendLabel, trendUp }) {
  return (
    <div className="saas-card">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      {trendLabel && (
        <div className="stat-trend">
          <span className={trendUp ? 'trend-up' : 'trend-down'}>
            {trendUp ? '↑' : '↓'}
          </span>
          {trendLabel}
        </div>
      )}
    </div>
  );
}
