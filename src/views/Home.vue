<template>
  <div class="home">
    <Header />
    <AddItem />
    <List />
    <Toolbar />
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "@/components/AddItem.vue";
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";
import Toolbar from "@/components/Toolbar.vue";

export default {
  components: {
    AddItem,
    List,
    Header,
    Toolbar
  }
}
</script>