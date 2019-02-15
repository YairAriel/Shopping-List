<template>
    <div>
        <Spinner size="40" :line-size="8" line-fg-color="#455A64" v-show="loading" 
        class="spinner" message="Loading..."></Spinner>
        <div v-if="getLength > 0">
            <v-list :class="mobile">
                <Item :item.sync="data" v-for="(data, index) in listOfItems" :key="index" :itemIndex="index"/>
            </v-list>
        </div>

        <!-- <div v-else>
            <v-card color="blue-grey lighten-3" class="white--text mx-3">
                <v-card-title primary-title>
                    <div>
                        <div class="headline">
                            {{ emptyText }}
                        </div>
                    </div>
                </v-card-title>
            </v-card>
        </div> -->
    </div>
    
</template>

<script>
    import Item from './Item.vue';
    import Spinner from 'vue-simple-spinner';

    export default {
        data () {
            return {
                // empty: false,
                // emptyText: "Let's add some items...",
                loading: true
            }
        },
        computed: {
            listOfItems () {
                return this.$store.getters.items;
            },
            mobile () {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return false;
                }
                return { 'mx-5': true }
            },
            getLength () {
                return this.$store.getters.items.length;
            }
        },
        created () {
            this.$http.get('data.json')
            .then(response => response.json())
            .then(data => {
                if(data) {
                    const shoppingList = data.items;
                    this.$store.commit('setList', shoppingList);
                    this.loading = false;
                } else {
                    this.loading = false;
                }
            });
        },
        components: {
            Item,
            Spinner
        }
    }
</script>

<style lang="scss" scoped>
    .spinner {
        margin-bottom: 3em;
    }
</style>
