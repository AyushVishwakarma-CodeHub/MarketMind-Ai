import { useState, useEffect } from 'react';
import { HiOutlineHome, HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineCog6Tooth } from 'react-icons/hi2';

export default function Sidebar({ onOpenSettings }) {
  const [active, setActive] = useState('overview');

  const scrollTo = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">M</div>
        <div className="sidebar-title">MarketMind AI</div>
      </div>
      <div className="sidebar-menu">
        <div 
          className={`sidebar-item ${active === 'overview' ? 'active' : ''}`}
          onClick={() => scrollTo('overview')}
        >
          <HiOutlineHome size={18} />
          Overview
        </div>
        <div 
          className={`sidebar-item ${active === 'campaigns' ? 'active' : ''}`}
          onClick={() => scrollTo('campaigns')}
        >
          <HiOutlineDocumentText size={18} />
          Campaigns
        </div>
        <div 
          className={`sidebar-item ${active === 'customers' ? 'active' : ''}`}
          onClick={() => scrollTo('customers')}
        >
          <HiOutlineUserGroup size={18} />
          Customers
        </div>
        <div 
          className="sidebar-item"
          onClick={onOpenSettings}
        >
          <HiOutlineCog6Tooth size={18} />
          Settings
        </div>
      </div>
    </aside>
  );
}
