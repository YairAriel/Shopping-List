import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    color: "",
    sortByColor: false,
    listName: ""
  },
  getters: {
    items(state) {
      return state.list;
    },
    defaultColor(state) {
      return state.color;
    },
    sortByColor(state) {
      return state.sortByColor;
    },
    listName(state) {
      return state.listName;
    }
  },
  mutations: {
    setList(state, shoppingList) {
      state.list = shoppingList;
    },
    itemAdded(state, newItem) {
      state.list.unshift(newItem);
    },
    removeFromList(state, itemToDelete) {
      state.list.splice(itemToDelete, 1);
    },
    editItem(state, itemToEdit) {
      state.list[itemToEdit.index] = itemToEdit.item;
    },
    deleteList(state) {
      state.list = [];
    },
    setDefaultColor(state, color) {
      state.color = color;
    },
    setSortByColor(state, sort) {
      state.sortByColor = sort;
    },
    setListName(state, name) {
      state.listName = name;
    }
  },
  actions: {}
});
