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
      <div id="overview" className="dashboard-header" style={{ paddingTop: '20px' }}>
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your customer segments and campaign metrics.</p>
        </div>
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

      <FileUpload onUploadSuccess={handleUploadSuccess} />

      {!hasData && !loading ? (
        <div className="empty-state">
          <HiOutlineExclamationCircle size={48} />
          <h3>No records found</h3>
          <p>Please upload a CSV file to generate your dashboard.</p>
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
