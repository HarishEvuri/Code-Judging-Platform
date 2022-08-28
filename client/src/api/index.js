import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchProblems = (
  search,
  tags,
  difficulty,
  orderBy,
  order,
  page,
  limit
) =>
  API.get(
    `/problem?search=${search}&tags=${String(
      tags
    )}&difficulty=${difficulty}&orderBy=${orderBy}&order=${order}&page=${page}&limit=${limit}`
  );
