import http from "../http-common";

class FolderDataService {
  update(id, data) {
    return http.put(`/folders/${id}`, data);
  }

  getAll() {
    return http.get(`/folders`);
  }

  getFolderById(folderID) {
    return http.get(`/folders/${folderID}`);
  }

  delete(folderID) {
    return http.delete(`/folders/${folderID}`);
  }

  create(name) {
    return http.post(`/folders`, { name });
  }
}
export default new FolderDataService();
