import api from "@/api/axios";

export const login = async () => {

    return api.post("/auth/login");

};