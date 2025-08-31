import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FetchAllStudents = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axios.get(
        "https://minatobackend-ixct.vercel.app/api/v1/applications"
      );
      return res.data.data; // ✅ return only the JSON body
    },
  });
};

export default FetchAllStudents;
