import http from "../http-common";

class NoteDataService {
  update(id, data) {
    return http.put(`/notes/${id}`, data);
  }

  getAll(folderId) {
    return http.get(`/notes/${folderId}`);
  }

  delete(noteID) {
    return http.delete(`/notes/${noteID}`);
  }

  create(folderID, content) {
    return http.post(`/notes`, { content, folderID });
  }
}
export default new NoteDataService();
