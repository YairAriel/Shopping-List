<template>
  <div>
    <v-layout align-center justify-center row class="px-5">
      <v-flex xs12 row class="pt-5">
        <v-btn fab dark x-large depressed color="blue-grey darken-3" class="main">
          <v-icon dark class="main-icon">shopping_cart</v-icon>
        </v-btn>
        <h3 class="display-1 my-5">{{ title | toUpper }}</h3>
        <v-text-field :label="labelText" v-model="listName" @input="incorrectListText = false"></v-text-field>
        <p v-show="incorrectListText" class="alert incorrect">{{ noList }}</p>
        <v-btn block @click="openList" :disabled="listName == ''">
            {{ buttonText | toUpper}}
            <v-progress-circular v-show="loading" indeterminate color="blue-grey darken-3" :size="20" :width="3" class="ml-3"></v-progress-circular>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row xs-12 justify-center class="px-5">
      <p class="mt-5 title font-weight-light new-list-btn" @click="createNew">{{ createListText }}</p>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "shopping list",
      labelText: "Your list name",
      noList: "List name is incorrect, please try again",
      incorrectListText: false,
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
            this.loading = false;
            this.incorrectListText = true;
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
.new-list-btn {
    cursor: pointer;
    line-height: 20px;
    color: #1976D2;
}
.incorrect {
  text-align: left;
  font-size: 16px;
  margin-top: -8px;
  color: red;
}
</style>
