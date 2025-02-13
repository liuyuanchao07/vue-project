import { defineStore } from "pinia"

const useCounterStore = defineStore("counter", {
  // 初始状态
  state: () => ({
    counter: 100,
  }),
  //计算属性
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    },
  },
  // 处理异步操作
  actions: {
    changeCounterAction(newCounter: number) {
      this.counter = newCounter
    },
  },
})

export default useCounterStore
