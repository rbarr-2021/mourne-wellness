import Seo from "../../components/Seo"

function AdminBookings() {
  return (
    <>
      <Seo title="Admin Bookings | Retreat by the Mournes" description="Administrator bookings area." path="/admin/bookings" robots="noindex, nofollow" />
      <div className="admin-panel">
        <div className="admin-panel__header admin-panel__header--stacked">
          <div>
            <h2 className="admin-panel__title">Bookings</h2>
            <p className="section-copy admin-panel__copy">
              This area is reserved for the upcoming concierge booking workflow, with mobile-first review and confirmation tools.
            </p>
          </div>
        </div>

        <div className="admin-dashboard-grid">
          <article className="admin-subpanel">
            <div className="admin-subpanel__header">
              <div>
                <h3 className="admin-subpanel__title">Coming Next</h3>
                <p className="section-copy admin-subpanel__copy">The booking workspace will be designed for quick approval and follow-up between appointments.</p>
              </div>
            </div>

            <div className="admin-compact-list">
              <div className="admin-compact-list__item">
                <strong>Booking requests</strong>
                <span>Review requested treatments, preferred dates and notes from one mobile screen.</span>
              </div>
              <div className="admin-compact-list__item">
                <strong>Deposit tracking</strong>
                <span>Confirm which appointments are awaiting a Square deposit link or final payment.</span>
              </div>
              <div className="admin-compact-list__item">
                <strong>Calendar handoff</strong>
                <span>Move approved requests into the confirmed workflow without rebuilding the admin navigation later.</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}

export default AdminBookings
