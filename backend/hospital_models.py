import sqlite3

class HospitalRepository:
    def __init__(self, db_path='donors.db'):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('''CREATE TABLE IF NOT EXISTS hospitals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                address TEXT,
                contact TEXT,
                approved INTEGER DEFAULT 0
            )''')
            conn.commit()

    def get_all(self, approved=True):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            if approved is None:
                c.execute('SELECT id, name, address, contact, approved FROM hospitals')
            else:
                c.execute('SELECT id, name, address, contact, approved FROM hospitals WHERE approved=?', (1 if approved else 0,))
            rows = c.fetchall()
            return [
                {'id': r[0], 'name': r[1], 'address': r[2], 'contact': r[3], 'approved': bool(r[4])}
                for r in rows
            ]

    def add(self, hospital_data):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('INSERT INTO hospitals (name, address, contact, approved) VALUES (?, ?, ?, 0)',
                      (hospital_data['name'], hospital_data.get('address'), hospital_data.get('contact')))
            conn.commit()

    def approve(self, hospital_id):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('UPDATE hospitals SET approved=1 WHERE id=?', (hospital_id,))
            conn.commit()

    def remove(self, hospital_id):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('DELETE FROM hospitals WHERE id=?', (hospital_id,))
            conn.commit()
