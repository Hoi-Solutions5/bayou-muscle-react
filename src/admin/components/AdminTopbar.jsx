export default function AdminTopbar({ title, subtitle, onToggleSidebar }) {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          aria-label="Open sidebar"
          className="admin-topbar-menu-btn"
          onClick={onToggleSidebar}
          type="button"
        >
          ☰
        </button>
        <div className="admin-eyebrow">Admin panel</div>
        <div className="admin-page-title">{title}</div>
        {subtitle ? <div className="admin-page-subtitle">{subtitle}</div> : null}
      </div>

      <div className="admin-topbar-actions">
        <button className="admin-icon-btn" type="button" aria-label="Notifications">
          <span>●</span>
        </button>
        <div className="admin-avatar">A</div>
      </div>
    </header>
  );
}