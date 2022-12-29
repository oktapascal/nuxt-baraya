/** @format */

import {AlertState} from "~/types/alertState";

export const useAlertStore = defineStore("alertStore", {
    state: () => ({
        text: "",
        type: "info",
        show: false,
    }),
    getters: {
        getAlert: (state: AlertState) => state,
    },
    actions: {
        showAlert(value: AlertState) {
            this.text = value.text;
            this.type = value.type;
            this.show = true;
        },
        hideAlert() {
            this.text = "";
            this.type = "info";
            this.show = false;
        },
    },
});
