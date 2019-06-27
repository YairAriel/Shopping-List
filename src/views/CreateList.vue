<template>
  <div>
    <v-layout align-center justify-center row class="px-5">
      <v-flex xs12 row class="pt-5">
        <v-btn fab dark x-large depressed color="blue-grey darken-3" class="main">
          <v-icon dark class="main-icon">shopping_cart</v-icon>
        </v-btn>
        <h3 class="display-1 my-5">{{ title | toUpper }}</h3>
        <v-text-field :label="labelText" v-model="listName" @input="existingName = false"></v-text-field>
        <p class="alert" v-show="existingName">{{ existingList }}</p>
        <v-btn block class="mt-4" :disabled="listName == ''" @click="checkListName">
            {{ buttonCreate | toUpper}}
            <v-progress-circular  v-show="loading" indeterminate color="blue-grey darken-3" :size="20" :width="3" class="ml-3"></v-progress-circular>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row xs12 justify-start class="px-4">
      <v-btn flat color="blue darken-2" class="body-2 mt-4" @click="$router.push('/')">
        <v-icon class="mr-1">arrow_back</v-icon> {{ back }}
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
    data () {
        return {
            title: "shopping list",
            labelText: "New list name",
            listName: "",
            buttonCreate: "create",
            existingList: "List name has already exists, try another one",
            back: "Back",
            existingName: false,
            loading: false
        }
    },
    methods: {
        checkListName () {
            this.loading = true;
            this.$http.get("list/" + this.listName)
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data) != "{}") {
                    this.loading = false;
                    this.existingName = true;
                } else {
                    this.createList();
                }
            });
        },
        createList () {
            this.$http.post("list/", { "list_name": this.listName })
            .then(response => {
                this.loading = false;
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

