import Seo from "../../components/Seo"

function AdminDashboard() {
  return (
    <>
      <Seo title="Admin Dashboard | Retreat by the Mournes" description="Administrator dashboard." path="/admin" robots="noindex, nofollow" />
      <div className="admin-panel">
        <h2 className="admin-panel__title">Dashboard</h2>
        <p className="section-copy admin-panel__copy">
          The administrator dashboard now manages business configuration and treatments centrally, ready for the
          availability engine and concierge booking workflow in later phases.
        </p>

        <div className="admin-placeholder-grid">
          <article className="admin-placeholder-card">
            <h3>Authentication</h3>
            <p className="section-copy">Administrator sign-in, session persistence and protected routing are now in place.</p>
          </article>
          <article className="admin-placeholder-card">
            <h3>Business settings</h3>
            <p className="section-copy">Opening hours, booking rules and deposit defaults can now be managed without editing code.</p>
          </article>
          <article className="admin-placeholder-card">
            <h3>Treatments</h3>
            <p className="section-copy">Draft, active and inactive treatments now live in Supabase as the source of truth for the website.</p>
          </article>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
