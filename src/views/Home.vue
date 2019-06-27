<template>
  <div class="home">
    <Header @plusClicked="showForm" :plusShown="plusToggle" class="header"/>
    <AddItem @hide="hideToolbar" @show="showToolbar" v-show="addForm" />
    <List class="list" :showBar="plusToggle"/>
    <Toolbar :isVisible="toolbarViewer"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "@/components/AddItem.vue";
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";
import Toolbar from "@/components/Toolbar.vue";
import { EventBus } from '../main';

export default {
  data () {
    return {
      toolbarViewer: true,
      plusToggle: true,
      addForm: false
    }
  },
  methods: {
    hideToolbar () {
      this.toolbarViewer = false;
    },
    showToolbar () {
      this.toolbarViewer = true;
    },
    showForm () {
      window.scrollTo(top);
      setTimeout(()=> {
        this.plusToggle = false;
        this.addForm = true;
      }, 50)
    },
    hideForm () {
      this.plusToggle = true;
      this.addForm = false;
    }
  },
  components: {
    AddItem,
    List,
    Header,
    Toolbar
  },
  created () {
    window.addEventListener('scroll', this.hideForm);
    EventBus.$on('itemClicked', () => {
      this.hideForm();
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.hideForm);
  }
}
</script>

<style lang="scss" scoped>
  .header {
    z-index: 9 !important;
  }
  .list {
    z-index: -1;
  }
</style>
