import { create } from "zustand";

const useLaptopStore = create(set => ({
  laptop: false,
  toggleLaptop: () => set(state => ({ laptop: !state.laptop })),
  activeLaptop: on => set({ laptop: on }),
}));

export default useLaptopStore;
