import { useState } from 'react';
import '../styles/admin.css';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';

export default function AdminLayout({ title, subtitle, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="admin-app">
      <div className="admin-shell">
        <AdminSidebar isDrawerOpen={isSidebarOpen} onClose={closeSidebar} />

        {isSidebarOpen ? (
          <button
            aria-label="Close sidebar"
            className="admin-sidebar-backdrop"
            onClick={closeSidebar}
            type="button"
          />
        ) : null}

        <main className="admin-main">
          <AdminTopbar title={title} subtitle={subtitle} onToggleSidebar={openSidebar} />
          <div className="admin-content">{children}</div>
        </main>
      </div>
    </div>
  );
}