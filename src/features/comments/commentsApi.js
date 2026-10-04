import api from '../../services/api';

export const createComment = (threadId, data) => api.post(`/threads/${threadId}/comments`, data);
