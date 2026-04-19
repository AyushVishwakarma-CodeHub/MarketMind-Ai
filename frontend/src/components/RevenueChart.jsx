import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#fbbf24', '#fb7185', '#22d3ee', '#60a5fa'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: '12px 16px',
        fontSize: 13,
      }}>
        <p style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 6 }}>{label}</p>
        <p style={{ color: '#34d399' }}>
          Expected Revenue: ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ campaigns }) {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-title">💰 Revenue Predictions</div>
        <div className="loading-spinner">No campaign data available</div>
      </div>
    );
  }

  const chartData = campaigns.map((c) => ({
    name: c.segment,
    revenue: c.revenue.expectedRevenue,
  }));

  return (
    <div className="chart-container">
      <div className="chart-title">💰 Revenue Predictions by Segment</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          barSize={48}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar
            dataKey="revenue"
            radius={[6, 6, 0, 0]}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
