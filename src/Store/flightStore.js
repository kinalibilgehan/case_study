import { create } from "zustand";

const useFlightStore = create((set) => ({
  flights: [],
  setFlights: (flights) => set({ flights }),
}));

export default useFlightStore;
