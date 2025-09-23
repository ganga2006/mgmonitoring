import React from 'react';

function DashboardControls({ onSiteChange }) {
  return (
    <div className="card bg-secondary text-white shadow-lg mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title h5 fw-bold mb-0">Dashboard Controls</h5>
          <div className="d-flex align-items-center">
            <label htmlFor="site-select" className="form-label mb-0 me-2">Select Site:</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              id="site-select"
              onChange={(e) => onSiteChange(e.target.value)}
            >
              <option value="odisha">Odisha Microgrid</option>
              <option value="delhi">Delhi Microgrid</option>
              <option value="mumbai">Mumbai Microgrid</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardControls;