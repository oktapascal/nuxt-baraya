/** @format */

export const useThemeStore = defineStore("themeStore", {
    state: () => ({
        mode: useLocalStorage("theme", "light"),
    }),
    getters: {
        isDark: (state) => (state.mode === "light" ? false : true),
    },
    actions: {
        toggleMode(newMode: string) {
            this.mode = newMode;
            localStorage.setItem("theme", newMode);
        },
    },
});