import sqlite3

class DonorRepository:
    def __init__(self, db_path='donors.db'):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('''CREATE TABLE IF NOT EXISTS donors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                blood_type TEXT NOT NULL,
                email TEXT,
                approved INTEGER DEFAULT 0
            )''')
            conn.commit()

    def get_all(self, approved=True):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            if approved is None:
                c.execute('SELECT id, name, blood_type, email, approved FROM donors')
            else:
                c.execute('SELECT id, name, blood_type, email, approved FROM donors WHERE approved=?', (1 if approved else 0,))
            rows = c.fetchall()
            return [
                {'id': r[0], 'name': r[1], 'blood_type': r[2], 'email': r[3], 'approved': bool(r[4])}
                for r in rows
            ]

    def add(self, donor_data):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('INSERT INTO donors (name, blood_type, email, approved) VALUES (?, ?, ?, 0)',
                      (donor_data['name'], donor_data['blood_type'], donor_data.get('email')))
            conn.commit()

    def approve(self, donor_id):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('UPDATE donors SET approved=1 WHERE id=?', (donor_id,))
            conn.commit()

    def search(self, search):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            like = f"%{search}%"
            c.execute('SELECT id, name, blood_type, email, approved FROM donors WHERE approved=1 AND (name LIKE ? OR blood_type LIKE ? OR email LIKE ?)', (like, like, like))
            rows = c.fetchall()
            return [
                {'id': r[0], 'name': r[1], 'blood_type': r[2], 'email': r[3], 'approved': bool(r[4])}
                for r in rows
            ]
