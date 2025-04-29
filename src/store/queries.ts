import { useQuery } from "react-query";
import axios from "axios";

const get1mgMedicine = async (query: string) => {
  const { data } = await axios.get("/api/1mg", {
    params: { query },
  });
  return data.products;
};

export const useGet1mgMedicine = (query: string) => {
  return useQuery("medicine", () => get1mgMedicine(query), {
    enabled: !!query,
  });
};

const getPharmeasyMedicine = async (query: string) => {
  const { data } = await axios.get("/api/pharmeasy", {
    params: { query },
  });
  return data.products;
};

export const useGetPharmeasyMedicine = (query: string) => {
  return useQuery(["pharmeasy"], () => getPharmeasyMedicine(query), {
    enabled: !!query,
  });
};
