import { defineStore } from "pinia";

interface Menu {
  isCollapse: boolean;
  selectedMenu: any[];
}

const menuStore = defineStore("login", {
  state: (): Menu => ({
    isCollapse: false,
    selectedMenu: [],
  }),
  actions: {
    changeMenuState() {
      this.isCollapse = !this.isCollapse;
    },
    addSelectedMenu(payload: any) {
      if (!this.selectedMenu.some((item) => item.path === payload.meta.path)) {
        this.selectedMenu.push(payload);
      }
    },
    closeTag(index: number) {
      this.selectedMenu.splice(index, 1);
    },
  },
});

export default menuStore;
