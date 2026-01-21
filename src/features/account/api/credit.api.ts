import { apiClient } from "../../../api/apiClient";

export const fetchCreditHistory = async () => {
  const response = await apiClient.get("/credit/my-history");
  return response.data;
};
