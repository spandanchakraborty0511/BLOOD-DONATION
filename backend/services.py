from models import DonorRepository

class DonorService:
    def __init__(self):
        self.repo = DonorRepository()

    def get_all_donors(self):
        return self.repo.get_all(approved=True)

    def get_pending_donors(self):
        return self.repo.get_all(approved=False)

    def add_donor(self, donor_data):
        self.repo.add(donor_data)

    def approve_donor(self, donor_id):
        self.repo.approve(donor_id)

    def search_donors(self, search):
        return self.repo.search(search)
