import { HiOutlineSparkles } from 'react-icons/hi2';

export default function Navbar({ hasData }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">M</div>
        <div>
          <div className="navbar-title">MarketMind AI</div>
          <div className="navbar-subtitle">Smart Revenue Engine</div>
        </div>
      </div>
      <div className="navbar-status">
        {hasData && (
          <>
            <span className="pulse"></span>
            <span>Engine Active</span>
          </>
        )}
        <HiOutlineSparkles style={{ fontSize: 18, marginLeft: 4 }} />
      </div>
    </nav>
  );
}
