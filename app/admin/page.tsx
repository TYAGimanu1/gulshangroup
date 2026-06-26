import styles from '../../styles/admin.module.css';
import { query } from '../../lib/postgres';

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUsers() {
  return await query<User>('SELECT id, name, email FROM public.users ORDER BY id');
}

export default async function AdminPage() {
  const users = await getUsers();

  return (
    <main className={styles.adminRoot}>
      {/* Navigation */}
      <nav>
        <h1>Gulshan Group Admin</h1>
        <a href="/">← Home</a>
      </nav>

      {/* Header Section */}
      <section className={styles.adminHeader}>
        <div className={styles.adminHeaderContainer}>
          <h2>Dashboard</h2>
          <p>Manage registered users and properties</p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.adminContent}>
        <h3>Registered Users</h3>
        
        {users.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No users found in the database yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2026 Gulshan Group. All rights reserved.</p>
      </footer>
    </main>
  );
}
