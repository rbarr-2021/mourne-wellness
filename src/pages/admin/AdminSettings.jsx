import Seo from "../../components/Seo"

function AdminSettings() {
  return (
    <>
      <Seo title="Admin Settings | Retreat by the Mournes" description="Administrator settings area." path="/admin/settings" robots="noindex, nofollow" />
      <div className="admin-panel">
        <h2 className="admin-panel__title">Settings</h2>
        <p className="section-copy admin-panel__copy">
          Placeholder for future editing of business settings, booking rules and treatment administration.
        </p>
      </div>
    </>
  )
}

export default AdminSettings
