import Seo from "../../components/Seo"

function AdminDashboard() {
  return (
    <>
      <Seo title="Admin Dashboard | Retreat by the Mournes" description="Administrator dashboard." path="/admin" robots="noindex, nofollow" />
      <div className="admin-panel">
        <h2 className="admin-panel__title">Dashboard</h2>
        <p className="section-copy admin-panel__copy">
          Phase 1 establishes the secure foundation for concierge bookings. Booking requests, calendar logic and
          payment workflows will be added in later phases.
        </p>

        <div className="admin-placeholder-grid">
          <article className="admin-placeholder-card">
            <h3>Authentication</h3>
            <p className="section-copy">Administrator sign-in, session persistence and protected routing are now in place.</p>
          </article>
          <article className="admin-placeholder-card">
            <h3>Database foundation</h3>
            <p className="section-copy">Business settings, treatments and availability exceptions are prepared via SQL migrations.</p>
          </article>
          <article className="admin-placeholder-card">
            <h3>Next phase</h3>
            <p className="section-copy">Booking requests and availability management can now be built on top of this secure structure.</p>
          </article>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
