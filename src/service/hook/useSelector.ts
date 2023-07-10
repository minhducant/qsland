import { useStoreApp } from "@service/store";
export const useUser = () => useStoreApp(state => state.UserData)
export const useAuth = () => useStoreApp(state => state.Auth)
export const useLang = () => useStoreApp(state => state.Langue)