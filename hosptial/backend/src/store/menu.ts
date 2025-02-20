import { defineStore } from "pinia";

interface Menu {
  isCollapse: boolean;
  selectedMenu: any[];
  menuActiveIndex: string;
}

const menuStore = defineStore("login", {
  state: (): Menu => ({
    isCollapse: false,
    selectedMenu:
      JSON.parse(localStorage.getItem("selectedMenu") as string) ?? [],
    menuActiveIndex: localStorage.getItem("menuActiveIndex") ?? "1",
  }),
  actions: {
    changeMenuState() {
      this.isCollapse = !this.isCollapse;
    },
    addSelectedMenu(payload: any) {
      if (!this.selectedMenu.some((item) => item.path === payload.meta.path)) {
        this.selectedMenu.push(payload);
        localStorage.setItem("selectedMenu", JSON.stringify(this.selectedMenu));
      }
    },
    closeTag(index: number) {
      this.selectedMenu.splice(index, 1);
    },
  },
});

export default menuStore;
