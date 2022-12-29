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
});
