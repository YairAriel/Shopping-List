<template>
  <div class="home">
    <Header @plusClicked="showForm" :plusShown="plusToggle" />
    <AddItem @hide="hideToolbar" @show="showToolbar" v-show="addForm"/>
    <List />
    <Toolbar :isVisible="toolbarViewer"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "@/components/AddItem.vue";
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";
import Toolbar from "@/components/Toolbar.vue";

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
  },
  destroyed () {
    window.removeEventListener('scroll', this.hideForm);
  }
}
</script>