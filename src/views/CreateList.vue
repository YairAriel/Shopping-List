<template>
  <div>
    <v-layout align-center justify-center row class="px-5">
      <v-flex xs12 row class="pt-5">
        <v-btn fab dark x-large depressed color="blue-grey darken-3" class="main">
          <v-icon dark class="main-icon">shopping_cart</v-icon>
        </v-btn>
        <h3 class="display-1 my-5">{{ title | toUpper }}</h3>
        <v-text-field label="Your list name" v-model="listName" @input="existingName = false"></v-text-field>
        <p class="alert" v-show="existingName">{{ existingList }}</p>
        <v-btn block class="mt-4" :disabled="listName == ''" @click="checkListName">{{ buttonCreate | toUpper}}</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
    data () {
        return {
            title: "shopping list",
            listName: "",
            buttonCreate: "create",
            existingList: "List name has already exists, try another one",
            existingName: false
        }
    },
    methods: {
        checkListName () {
            this.$http.get("list/" + this.listName)
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) != "{}") {
                    this.existingName = true;
                } else {
                    this.createList();
                }
            });
        },
        createList () {
            this.$http.post("list", { "list_name": this.listName })
            .then(response => {
                this.$store.commit("setListName", this.listName);
                this.$router.push("/my-list");
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
.alert {
    color: red;
    text-align: left;
}
</style>

