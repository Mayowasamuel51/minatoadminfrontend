import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query';


const FetchAllStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: ()=> axios.get("http://127.0.0.1:8000/api/v1/")
  })
  
}

export default FetchAllStudents