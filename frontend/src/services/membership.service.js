import http from "../http-common";

class MembershipDataService {
  getAll() {
    return http.get("/memberships");
  }

  get(id) {
    return http.get(`/memberships/${id}`);
  }

  create(data) {
    return http.post("/memberships", data);
  }

  update(id, data) {
    return http.put(`/memberships/${id}`, data);
  }

  delete(id) {
    return http.delete(`/memberships/${id}`);
  }

  deleteAll() {
    return http.delete(`/memberships`);
  }

  findByName(title) {
    return http.get(`/memberships?title=${title}`);
  }
}

export default new MembershipDataService();
