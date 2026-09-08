import api from "../../services/api";

export const getThreads = () => {
  return api.get("/threads");
};

export const getThreadById = (threadId) => {
  return api.get(`/threads/${threadId}`);
};
