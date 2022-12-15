export const useThemeStore = defineStore('themeStore', {
  state: () => ({
    mode: useLocalStorage('theme', 'light'),
  }),
  getters: {
    getMode: (state) => state.mode,
  },
  actions: {
    toggleMode(newMode: string) {
      this.mode = newMode;
      localStorage.setItem('theme', newMode);
    },
  },
  hydrate(state, initialState) {
    state.mode = useLocalStorage('theme', 'light').value;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
