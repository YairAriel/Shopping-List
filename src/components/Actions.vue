<template>
    <v-layout row mt-5>
        <v-flex xs6>
            <v-btn bottom center fixed dark color="purple darken-3" @click="saveData">
                {{ saveBtn | toUpper}}
                <v-icon right dark>save</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs6>
            <v-btn bottom right fixed dark color="red darken-3" @click="deleteData">
                {{ clearBtn | toUpper }}
                <v-icon right dark>delete</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                clearBtn: 'clear list',
                saveBtn: 'save list'
            }
        },
        methods: {
            saveData () {
                const data = {
                    items: this.$store.getters.items
                }
                this.$http.put('data.json', data);
            },
            deleteData () {
                this.$store.commit('deleteList');
            }
        }
    }
</script>
