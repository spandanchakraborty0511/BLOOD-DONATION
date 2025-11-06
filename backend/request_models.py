import sqlite3

class RequestRepository:
    def __init__(self, db_path='donors.db'):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('''CREATE TABLE IF NOT EXISTS blood_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                patient_name TEXT NOT NULL,
                blood_type TEXT NOT NULL,
                units INTEGER NOT NULL,
                status TEXT DEFAULT 'pending',
                hospital_id INTEGER,
                FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
            )''')
            conn.commit()

    def get_all(self, status=None):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            if status:
                c.execute('SELECT id, patient_name, blood_type, units, status, hospital_id FROM blood_requests WHERE status=?', (status,))
            else:
                c.execute('SELECT id, patient_name, blood_type, units, status, hospital_id FROM blood_requests')
            rows = c.fetchall()
            return [
                {'id': r[0], 'patient_name': r[1], 'blood_type': r[2], 'units': r[3], 'status': r[4], 'hospital_id': r[5]} for r in rows
            ]

    def add(self, req_data):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('INSERT INTO blood_requests (patient_name, blood_type, units, hospital_id) VALUES (?, ?, ?, ?)',
                      (req_data['patient_name'], req_data['blood_type'], req_data['units'], req_data.get('hospital_id')))
            conn.commit()

    def update_status(self, req_id, status):
        with sqlite3.connect(self.db_path) as conn:
            c = conn.cursor()
            c.execute('UPDATE blood_requests SET status=? WHERE id=?', (status, req_id))
            conn.commit()
