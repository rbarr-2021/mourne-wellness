import Seo from "../../components/Seo"

function AdminAvailability() {
  return (
    <>
      <Seo title="Admin Availability | Retreat by the Mournes" description="Administrator availability area." path="/admin/availability" robots="noindex, nofollow" />
      <div className="admin-panel">
        <h2 className="admin-panel__title">Availability</h2>
        <p className="section-copy admin-panel__copy">
          Placeholder for future availability controls, blocked dates and Google Calendar-connected scheduling rules.
        </p>
      </div>
    </>
  )
}

export default AdminAvailability
