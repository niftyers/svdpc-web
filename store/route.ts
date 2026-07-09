import { create } from "zustand"

interface IStoreRoute {
  currentRoute: string
  setCurrentRoute: (route: string) => void
}

const useStoreRoutes = create<IStoreRoute>((set) => ({
  currentRoute: "root",
  setCurrentRoute: (route) => set({ currentRoute: route }),
}))

export default useStoreRoutes
