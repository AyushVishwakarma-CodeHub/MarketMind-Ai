import { HiOutlineSparkles } from 'react-icons/hi2';

const BADGE_CLASSES = {
  'High Value': 'warning',
  'Inactive': 'danger',
  'New': 'info',
  'Regular': 'neutral',
};

export default function CampaignCard({ campaign }) {
  const { segment, targetUsers, campaign: campaignData, revenue } = campaign;

  return (
    <div className="action-card">
      <div className="action-card-header">
        <div className="action-title">{campaignData.title}</div>
        <div className={`badge ${BADGE_CLASSES[segment] || 'neutral'}`}>
          {segment}
        </div>
      </div>
      
      <div className="action-desc">{campaignData.recommendation}</div>

      <div className="action-metrics">
        <div className="metric-group">
          <span className="metric-lbl">Target Users</span>
          <span className="metric-val">{targetUsers}</span>
        </div>
        <div className="metric-group">
          <span className="metric-lbl">Est. Conversion</span>
          <span className="metric-val">{revenue.conversionRate}</span>
        </div>
        <div className="metric-group" style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <span className="metric-lbl">Predicted Revenue</span>
          <span className="metric-val" style={{ color: 'var(--accent-success)' }}>
            ₹{revenue.expectedRevenue.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="ai-insight">
        <HiOutlineSparkles style={{ marginTop: 2, flexShrink: 0, color: 'var(--text-tertiary)' }} />
        <span>{campaignData.explanation}</span>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <strong>⏰ Best time:</strong> {campaignData.bestTime}
      </div>
    </div>
  );
}
