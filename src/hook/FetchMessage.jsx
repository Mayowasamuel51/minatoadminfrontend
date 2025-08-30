import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query';

const FetchMessage = () => {
    return useQuery({
        queryKey: ["messages"],
        queryFn: ()=> axios.get("https://to-backendapi-v1.vercel.app/api/messages")
    })
}

export default FetchMessage;