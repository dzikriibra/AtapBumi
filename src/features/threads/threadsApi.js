import api from '../../services/api';

export const getThreads = () => api.get('/threads');

export const getThreadById = (threadId) => api.get(`/threads/${threadId}`);

export const createThread = (data) => api.post('/threads', data);

export const upVoteThread = (threadId) => api.post(`/threads/${threadId}/up-vote`);

export const downVoteThread = (threadId) => api.post(`/threads/${threadId}/down-vote`);

export const neutralVoteThread = (threadId) => api.post(`/threads/${threadId}/neutral-vote`);
