import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "../../components/Seo"
import { AVAILABILITY_STATUS } from "../../lib/availability"
import { getBusinessSettings, listAdminTreatments, listAvailabilityExceptions } from "../../lib/supabase/database"

function formatDayState(settings) {
  if (!settings?.opening_hours) {
    return "Unavailable"
  }

  const todayKey = new Date().toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase()
  const hours = settings.opening_hours[todayKey]

  if (!hours || hours.closed) {
    return "Closed today"
  }

  return `${hours.open} - ${hours.close}`
}

function AdminDashboard() {
  const [summary, setSummary] = useState({
    isLoading: true,
    openingHours: null,
    treatments: [],
    exceptions: [],
  })

  useEffect(() => {
    const loadSummary = async () => {
      const [{ data: settingsData }, { data: treatmentsData }, { data: exceptionsData }] = await Promise.all([
        getBusinessSettings(),
        listAdminTreatments(),
        listAvailabilityExceptions(),
      ])

      setSummary({
        isLoading: false,
        openingHours: settingsData ?? null,
        treatments: treatmentsData ?? [],
        exceptions: exceptionsData ?? [],
      })
    }

    loadSummary()
  }, [])

  const activeTreatments = useMemo(
    () => summary.treatments.filter((treatment) => treatment.status === "ACTIVE").length,
    [summary.treatments]
  )
  const featuredTreatments = useMemo(
    () => summary.treatments.filter((treatment) => treatment.featured).length,
    [summary.treatments]
  )
  const activeExceptions = useMemo(
    () => summary.exceptions.filter((record) => record.status === AVAILABILITY_STATUS.ACTIVE),
    [summary.exceptions]
  )
  const upcomingExceptions = activeExceptions.slice(0, 3)
  const todayStatus = formatDayState(summary.openingHours)

  return (
    <>
      <Seo title="Admin Dashboard | Retreat by the Mournes" description="Administrator dashboard." path="/admin" robots="noindex, nofollow" />
      <div className="admin-panel admin-panel--dashboard">
        <div className="admin-panel__header admin-panel__header--stacked">
          <div>
            <h2 className="admin-panel__title">Dashboard</h2>
            <p className="section-copy admin-panel__copy">
              A mobile-first overview of today&apos;s setup, availability and treatment status so admin tasks can be handled quickly between appointments.
            </p>
          </div>

          <div className="admin-inline-links" aria-label="Quick actions">
            <Link className="ghost-button" to="/admin/treatments">
              Manage Treatments
            </Link>
            <Link className="ghost-button" to="/admin/availability">
              Open Availability
            </Link>
          </div>
        </div>

        {summary.isLoading ? (
          <p className="section-copy admin-panel__copy">Loading administrator dashboard...</p>
        ) : (
          <>
            <section className="admin-dashboard-summary" aria-label="Dashboard summary">
              <article className="admin-summary-card">
                <p className="admin-summary-card__label">Today&apos;s availability</p>
                <h3 className="admin-summary-card__value">{todayStatus}</h3>
                <p className="section-copy admin-summary-card__copy">Business hours are pulled directly from the current settings.</p>
              </article>

              <article className="admin-summary-card">
                <p className="admin-summary-card__label">Active treatments</p>
                <h3 className="admin-summary-card__value">{activeTreatments}</h3>
                <p className="section-copy admin-summary-card__copy">
                  {featuredTreatments} featured treatment{featuredTreatments === 1 ? "" : "s"} currently highlighted.
                </p>
              </article>

              <article className="admin-summary-card">
                <p className="admin-summary-card__label">Upcoming exceptions</p>
                <h3 className="admin-summary-card__value">{activeExceptions.length}</h3>
                <p className="section-copy admin-summary-card__copy">Active blocked periods, holidays and personal appointments awaiting review.</p>
              </article>
            </section>

            <section className="admin-dashboard-grid" aria-label="Quick actions and upcoming items">
              <article className="admin-subpanel">
                <div className="admin-subpanel__header">
                  <div>
                    <h3 className="admin-subpanel__title">Quick Actions</h3>
                    <p className="section-copy admin-subpanel__copy">Designed for one-handed use and quick admin updates on iPhone.</p>
                  </div>
                </div>

                <div className="admin-action-stack">
                  <Link className="admin-action-card" to="/admin/settings">
                    <span className="admin-action-card__eyebrow">Business Settings</span>
                    <strong>Update opening hours and booking rules</strong>
                  </Link>
                  <Link className="admin-action-card" to="/admin/treatments">
                    <span className="admin-action-card__eyebrow">Treatments</span>
                    <strong>Edit pricing, status and featured treatments</strong>
                  </Link>
                  <Link className="admin-action-card" to="/admin/availability">
                    <span className="admin-action-card__eyebrow">Availability</span>
                    <strong>Add blocked time, holidays or personal appointments</strong>
                  </Link>
                </div>
              </article>

              <article className="admin-subpanel">
                <div className="admin-subpanel__header">
                  <div>
                    <h3 className="admin-subpanel__title">Upcoming Exceptions</h3>
                    <p className="section-copy admin-subpanel__copy">The next unavailable periods are surfaced here for quick scanning.</p>
                  </div>
                </div>

                {upcomingExceptions.length > 0 ? (
                  <div className="admin-compact-list">
                    {upcomingExceptions.map((record) => (
                      <div key={record.id} className="admin-compact-list__item">
                        <strong>{record.reason}</strong>
                        <span>
                          {new Date(record.start_datetime).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} •{" "}
                          {new Date(record.start_datetime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="section-copy admin-subpanel__copy">No active availability exceptions are currently scheduled.</p>
                )}
              </article>
            </section>
          </>
        )}
      </div>
    </>
  )
}

export default AdminDashboard
