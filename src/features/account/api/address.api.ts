import { apiClient } from "../../../api/apiClient";
import { Address, AddressResponse } from "../types/address.types";

export const addressService = {
  getAll: async (): Promise<Address[]> => {
    const { data } = await apiClient.get<AddressResponse>("/address");
    return data.data || [];
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/address/${id}`);
  },

  setDefault: async (id: string): Promise<void> => {
    await apiClient.patch(`/address/${id}/default`);
  },
};
