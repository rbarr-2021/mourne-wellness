import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./useAuth"
import Seo from "./Seo"

const adminLinks = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/settings", label: "Business Settings" },
  { to: "/admin/treatments", label: "Treatments" },
  { to: "/admin/availability", label: "Availability" },
  { to: "/admin/bookings", label: "Bookings" },
]

function AdminLayout() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut()
    navigate("/admin/login", { replace: true })
  }

  return (
    <>
      <Seo title="Admin | Retreat by the Mournes" description="Secure administrator area." path="/admin" robots="noindex, nofollow" />
      <section className="admin-shell">
        <div className="admin-shell__inner">
          <header className="admin-topbar">
            <div>
              <p className="admin-kicker">Secure Administrator Area</p>
              <h1 className="admin-title">Retreat by the Mournes Admin</h1>
              <p className="section-copy admin-subtitle">
                Signed in as {user?.email ?? "administrator"}.
              </p>
            </div>

            <button type="button" className="ghost-button admin-logout" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? "Signing out..." : "Logout"}
            </button>
          </header>

          <nav className="admin-nav" aria-label="Administrator">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `admin-nav__link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminLayout
