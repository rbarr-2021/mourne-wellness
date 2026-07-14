import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./useAuth"

function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <section className="admin-auth-shell">
        <div className="admin-auth-card">
          <p className="section-copy" style={{ margin: 0 }}>
            Loading secure administrator area...
          </p>
        </div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
