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
        <div>
          <div className="action-title">{campaignData.title}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-success)' }}></span>
            Confidence Level: High (Based on historical patterns)
          </div>
        </div>
        <div className={`badge ${BADGE_CLASSES[segment] || 'neutral'}`}>
          {segment}
        </div>
      </div>
      
      <div className="action-desc" style={{ marginTop: '12px' }}>{campaignData.recommendation}</div>

      <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-success)', marginBottom: '8px' }}>
          💰 Estimated Revenue: ₹{revenue.expectedRevenue.toLocaleString('en-IN')}
        </div>
        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <div>👥 Target Users: {targetUsers}</div>
          <div>📈 Conversion: {revenue.conversionRate}</div>
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
