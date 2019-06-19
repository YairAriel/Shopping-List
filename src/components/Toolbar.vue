<template>
    <div v-show="isVisible">
        <v-layout row>
            <v-flex xs1 offset-xs4>
                <v-btn fab fixed bottom dark color="indigo lighten-1" @click="saveData">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs1 offset-xs1>
                <v-btn fab fixed bottom dark color="red lighten-1" @click="dialog = true">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-flex>

            <v-snackbar
                v-model="snackbar"
                :color="color"
                :top="y === 'top'"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'">
                {{ text }}
                <v-btn dark flat @click="snackbar = false">Close</v-btn>
            </v-snackbar>
        </v-layout>
        
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Delete List</v-card-title>
                <v-card-text>Are you sure?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="deleteData">Yes, Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  export default {
    props: ['isVisible'],
    data () {
      return {
        snackbar: false,
        color: 'black',
        y: 'top',
        mode: '',
        timeout: 6000,
        text: 'List was saved successfully',
        dialog: false
      }
    },
    methods: {
        saveData () {
            const list = {
                items: this.$store.getters.items
            }
            const listName = this.$store.getters.listName;
            this.$http.put('update-items/' + listName, list);
            this.snackbar = true;
        },
        deleteData () {
            this.dialog = false;
            this.$store.commit('deleteList');
        }
    }
  }
</script>
