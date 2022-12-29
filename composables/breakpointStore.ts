export const useBreakpointStore = defineStore("breakpointStore", {
    state: () => ({
        isMobile: false,
    }),
    getters: {
        checkIsMobile: (state) => state.isMobile,
    },
    actions: {
        updateCheckMobile(value: boolean) {
            this.isMobile = value;
        },
    },
    hydrate(state, initialState) {
        const width = window.screen.width;

        if (320 <= width && 768 >= width) {
            state.isMobile = true;
        }
    },
});
