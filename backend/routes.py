from flask import Blueprint, jsonify, request
from services import DonorService
from hospital_models import HospitalRepository
from request_models import RequestRepository

def register_routes(app):
    donor_service = DonorService()
    hospital_repo = HospitalRepository()
    request_repo = RequestRepository()
    api = Blueprint('api', __name__)

    # Donor endpoints
    @api.route('/donors', methods=['GET'])
    def get_donors():
        search = request.args.get('search')
        if search:
            donors = donor_service.search_donors(search)
        else:
            donors = donor_service.get_all_donors()
        return jsonify(donors)

    @api.route('/donors', methods=['POST'])
    def add_donor():
        data = request.json
        donor_service.add_donor(data)
        return jsonify({'message': 'Donor added successfully'})

    @api.route('/donors/<int:donor_id>/approve', methods=['POST'])
    def approve_donor(donor_id):
        donor_service.approve_donor(donor_id)
        return jsonify({'message': 'Donor approved'})

    @api.route('/donors/pending', methods=['GET'])
    def get_pending_donors():
        donors = donor_service.get_pending_donors()
        return jsonify(donors)

    # Hospital endpoints
    @api.route('/hospitals', methods=['GET'])
    def get_hospitals():
        approved = request.args.get('approved')
        if approved == 'all':
            hospitals = hospital_repo.get_all(approved=None)
        elif approved == 'false':
            hospitals = hospital_repo.get_all(approved=False)
        else:
            hospitals = hospital_repo.get_all(approved=True)
        return jsonify(hospitals)

    @api.route('/hospitals', methods=['POST'])
    def add_hospital():
        data = request.json
        hospital_repo.add(data)
        return jsonify({'message': 'Hospital added'})

    @api.route('/hospitals/<int:hospital_id>/approve', methods=['POST'])
    def approve_hospital(hospital_id):
        hospital_repo.approve(hospital_id)
        return jsonify({'message': 'Hospital approved'})

    @api.route('/hospitals/<int:hospital_id>', methods=['DELETE'])
    def remove_hospital(hospital_id):
        hospital_repo.remove(hospital_id)
        return jsonify({'message': 'Hospital removed'})

    # Blood request endpoints
    @api.route('/requests', methods=['GET'])
    def get_requests():
        status = request.args.get('status')
        requests = request_repo.get_all(status)
        return jsonify(requests)

    @api.route('/requests', methods=['POST'])
    def add_request():
        data = request.json
        request_repo.add(data)
        return jsonify({'message': 'Request added'})

    @api.route('/requests/<int:req_id>/status', methods=['POST'])
    def update_request_status(req_id):
        status = request.json.get('status')
        request_repo.update_status(req_id, status)
        return jsonify({'message': 'Request status updated'})

    app.register_blueprint(api, url_prefix='/api')
