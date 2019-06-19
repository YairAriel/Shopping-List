<template>
  <v-layout align-center justify-center row class="px-5">
    <v-flex xs12 class="pt-5">
        <v-btn fab dark x-large depressed color="blue-grey darken-3" class="main">
            <v-icon dark class="main-icon">shopping_cart</v-icon>
        </v-btn>
            <h3 class="display-1 my-5">{{ title | toUpper }}</h3>
            <v-text-field label="Your list name" v-model="listName"></v-text-field>
            <v-btn @click="openList">{{ buttonText | toUpper}}</v-btn>
          <v-btn flat color="red" class="mt-5">{{ createListText }}</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        title: 'shopping list',
        buttonText: 'let\'s get started!',
        createListText: 'Have no list yet? Tap here to open one, it\'s easy',
        listName: ''
      }
    },
    methods: {
        openList () {
            this.$http.get('list/' + this.listName)
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) != "{}") {
                    this.$store.commit("setListName", data.list_name);
                    this.$router.push('/my-list');
                } else {
                    console.log('no list!');
                }
            });            
        }
    }
  }
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
