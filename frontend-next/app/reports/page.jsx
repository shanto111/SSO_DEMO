"use client";
export default function ReportPage() {
  return (
    <div className="report-container">
      <div className="report">
        <h3>Reports</h3>
        <p>Report is coming soon...</p>
      </div>

      <style jsx>{`
        .report-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          padding: 2rem;
          background: #f9fafb;
        }

        .report {
          background: #fef3c7;
          color: #b45309;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .report h3 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}
