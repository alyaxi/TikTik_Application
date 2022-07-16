import create from "zustand"
import {persist} from "zustand/middleware"
import axios  from "axios"
import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],

    addUser: (user:any) => set({userProfile: user}),
    removeUser: () => set({userProfile:null}),
    fetchAllUser: async () => {
        const response = await axios.get(`http://localhost:3000/api/users`)

        set({allUsers: response.data})
    } 
});

const useAuthStore = create(
    persist(authStore, {
        name: "auth"
    })
)
export default useAuthStore