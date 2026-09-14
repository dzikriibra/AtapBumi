import api from "../../services/api";

export const getThreads = () => {
  return api.get("/threads");
};

export const getThreadById = (threadId) => {
  return api.get(`/threads/${threadId}`);
};

export const createThread = (data) => {
  return api.post("/threads", data);
};

export const upVoteThread = (threadId) => {
  return api.post(`/threads/${threadId}/up-vote`);
};

export const downVoteThread = (threadId) => {
  return api.post(`/threads/${threadId}/down-vote`);
};

export const neutralVoteThread = (threadId) => {
  return api.post(`/threads/${threadId}/neutral-vote`);
};
