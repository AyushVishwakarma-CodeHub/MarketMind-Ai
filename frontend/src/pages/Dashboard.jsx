import { useState, useEffect, useCallback } from 'react';
import {
  HiOutlineUsers,
  HiOutlineSquares2X2,
  HiOutlineCurrencyRupee,
  HiOutlineRocketLaunch,
  HiOutlineExclamationCircle
} from 'react-icons/hi2';
import StatCard from '../components/StatCard';
import FileUpload from '../components/FileUpload';
import SegmentChart from '../components/SegmentChart';
import RevenueChart from '../components/RevenueChart';
import CampaignCard from '../components/CampaignCard';
import BusinessTypeSelector from '../components/BusinessTypeSelector';
import CustomerTable from '../components/CustomerTable';
import { getCustomers, getSegments, getCampaigns } from '../services/api';

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [segments, setSegments] = useState([]);
  const [campaignData, setCampaignData] = useState(null);
  const [businessType, setBusinessType] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  const fetchAllData = useCallback(async (bType = businessType) => {
    setLoading(true);
    try {
      const [customerRes, segmentRes, campaignRes] = await Promise.all([
        getCustomers(1, 100),
        getSegments(true),
        getCampaigns(bType),
      ]);

      setCustomers(customerRes.customers);
      setSegments(segmentRes.segments);
      setCampaignData(campaignRes);
      setHasData(customerRes.customers.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [businessType]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleUploadSuccess = () => fetchAllData();
  const handleBusinessTypeChange = (type) => {
    setBusinessType(type);
    fetchAllData(type);
  };

  const totalUsers = campaignData?.totalCustomers || 0;
  const totalRevenue = campaignData?.totalExpectedRevenue || 0;

  return (
    <div className="dashboard">
      <div id="overview" className="dashboard-header" style={{ paddingTop: '20px', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em', fontWeight: '700' }}>
          AI-powered marketing engine that predicts revenue before running campaigns
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Helping businesses make smarter decisions using customer data and automation.
        </p>
      </div>

      {!loading && hasData && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '24px', borderRadius: 'var(--radius-xl)', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '4px' }}>Total Revenue Opportunity</div>
            <div style={{ color: 'var(--accent-success)', fontSize: '42px', fontWeight: '700', letterSpacing: '-0.02em' }}>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginTop: '4px' }}>Sum of all projected campaign returns</div>
          </div>
          <div style={{ textAlign: 'right' }}>
             <div style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: '600' }}>{totalUsers.toLocaleString()} Users</div>
             <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Targeted across {campaignData?.campaigns?.length || 0} smart campaigns</div>
          </div>
        </div>
      )}

      {hasData && !loading && (
        <FileUpload onUploadSuccess={handleUploadSuccess} />
      )}

      {!hasData && !loading ? (
        <div className="onboarding-pitch" style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '20px' }}>
          
          <div className="pitch-section" style={{ display: 'flex', gap: '24px', background: 'var(--bg-card)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--accent-danger)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', fontSize: '13px' }}>The Problem</div>
              <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>❌ Businesses don't know which customers to target</li>
                <li>❌ Marketing is mostly guesswork without predictable ROI</li>
              </ul>
            </div>
            <div style={{ width: '1px', background: 'var(--border-subtle)' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'var(--accent-success)', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', fontSize: '13px' }}>The Solution</div>
              <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>✅ MarketMind AI intelligently segments users</li>
                <li>✅ Suggests automated, high-conversion campaigns</li>
                <li>✅ Predicts exact revenue before you spend a dime</li>
              </ul>
            </div>
          </div>

          <div className="pitch-section">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>How it Works</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div style={{ background: 'var(--bg-element)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>📁</div>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>1. Upload Data</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Drag and drop your raw customer CSV.</div>
              </div>
              <div style={{ background: 'var(--bg-element)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>🧠</div>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>2. AI Segments Users</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Auto-categorized into High Value, Churn Risk, etc.</div>
              </div>
              <div style={{ background: 'var(--bg-element)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>🎯</div>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>3. Generate Campaigns</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Context-aware marketing actions assigned.</div>
              </div>
              <div style={{ background: 'var(--bg-element)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>💰</div>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>4. Predict Revenue</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>See exact financial outcomes instantly.</div>
              </div>
            </div>
          </div>

          <div className="pitch-section" style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>Ready to see it in action?</h2>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            </div>
          </div>

        </div>
      ) : (
        <>
          <div className="stats-grid">
            <StatCard
              label="Total Audience"
              value={totalUsers.toLocaleString()}
              icon={<HiOutlineUsers />}
              trendLabel="12% from last month"
              trendUp={true}
            />
            <StatCard
              label="Predicted Revenue"
              value={`₹${(totalRevenue/1000).toFixed(0)}k`}
              icon={<HiOutlineCurrencyRupee />}
              trendLabel="8% conversion est."
              trendUp={true}
            />
             <StatCard
              label="Mapped Segments"
              value="4"
              icon={<HiOutlineSquares2X2 />}
            />
            <StatCard
              label="Active Campaigns"
              value="4"
              icon={<HiOutlineRocketLaunch />}
            />
          </div>

          <div className="charts-grid">
            <div className="chart-card"><SegmentChart segments={segments} /></div>
            <div className="chart-card"><RevenueChart campaigns={campaignData?.campaigns} /></div>
          </div>

          <div id="campaigns" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '40px' }}>
            <h2 className="section-title" style={{ marginBottom: 24 }}>Campaign Strategy</h2>
            <BusinessTypeSelector selected={businessType} onChange={handleBusinessTypeChange} />
          </div>

          <div className="campaigns-grid">
            {campaignData?.campaigns?.map((campaign, idx) => (
              <CampaignCard key={idx} campaign={campaign} />
            ))}
          </div>

          <div id="customers" style={{ paddingTop: '40px' }}>
            <CustomerTable customers={customers} />
          </div>
        </>
      )}
    </div>
  );
}
