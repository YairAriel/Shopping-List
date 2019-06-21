<template>
  <div>
    <v-layout align-center justify-center row class="px-5">
      <v-flex xs12 row class="pt-5">
        <v-btn fab dark x-large depressed color="blue-grey darken-3" class="main">
          <v-icon dark class="main-icon">shopping_cart</v-icon>
        </v-btn>
        <h3 class="display-1 my-5">{{ title | toUpper }}</h3>
        <v-text-field label="Your list name" v-model="listName"></v-text-field>
        <v-btn block @click="openList" :disabled="listName == ''">
            {{ buttonText | toUpper}}
            <v-progress-circular  v-show="loading" indeterminate color="blue-grey darken-3" :size="20" :width="3" class="ml-3"></v-progress-circular>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row xs-12 justify-center>
      <v-btn flat justify-center color="red" class="mt-5" @click="createNew">{{ createListText }}</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "shopping list",
      buttonText: "let's get started!",
      createListText: "Have no list yet? Tap here to open one, it's easy",
      listName: "",
      loading: false
    };
  },
  methods: {
    openList() {
      this.loading = true;
      this.$http
        .get("list/" + this.listName)
        .then(response => response.json())
        .then(data => {
          if (JSON.stringify(data) != "{}") {
            this.loading = false;
            this.$store.commit("setListName", data.list_name);
            this.$router.push("/my-list");
          } else {
            console.log("no list!");
          }
        });
    },
    createNew() {
      this.$router.push("/create-list");
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 120px;
  height: 120px;
  &-icon {
    font-size: 70px;
  }
}
</style>
