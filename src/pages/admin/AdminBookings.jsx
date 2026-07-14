import Seo from "../../components/Seo"

function AdminBookings() {
  return (
    <>
      <Seo title="Admin Bookings | Retreat by the Mournes" description="Administrator bookings area." path="/admin/bookings" robots="noindex, nofollow" />
      <div className="admin-panel">
        <h2 className="admin-panel__title">Bookings</h2>
        <p className="section-copy admin-panel__copy">
          Placeholder for future booking requests, review workflow, deposit tracking and confirmation management.
        </p>
      </div>
    </>
  )
}

export default AdminBookings
