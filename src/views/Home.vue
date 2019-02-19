<template>
  <div class="home">
    <Header />
    <AddItem @hide="hideToolbar" @show="showToolbar"/>
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
      toolbarViewer: true
    }
  },
  methods: {
    hideToolbar () {
      this.toolbarViewer = false;
    },
    showToolbar () {
      this.toolbarViewer = true;
    }
  },
  components: {
    AddItem,
    List,
    Header,
    Toolbar
  }
}
</script>