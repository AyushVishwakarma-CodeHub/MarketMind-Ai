import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SEGMENT_COLORS = {
  'High Value': '#fbbf24',
  'Inactive': '#fb7185',
  'New': '#22d3ee',
  'Regular': '#60a5fa',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div style={{
        background: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: '10px 16px',
        fontSize: 13,
      }}>
        <p style={{ color: data.payload.fill, fontWeight: 600, marginBottom: 4 }}>
          {data.name}
        </p>
        <p style={{ color: '#94a3b8' }}>
          {data.value} customers ({((data.value / data.payload.total) * 100).toFixed(1)}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginTop: 8 }}>
    {payload.map((entry, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: entry.color,
        }} />
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function SegmentChart({ segments }) {
  if (!segments || segments.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-title">📊 Segment Distribution</div>
        <div className="loading-spinner">No segment data available</div>
      </div>
    );
  }

  const total = segments.reduce((sum, s) => sum + s.count, 0);
  const chartData = segments.map((s) => ({
    name: s.segment,
    value: s.count,
    fill: SEGMENT_COLORS[s.segment] || '#818cf8',
    total,
  }));

  return (
    <div className="chart-container">
      <div className="chart-title">📊 Segment Distribution</div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
            animationBegin={0}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
