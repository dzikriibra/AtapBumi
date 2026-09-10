import api from "../../services/api";

export const createComment = (threadId, data) => {
  return api.post(`/threads/${threadId}/comments`, data);
};
