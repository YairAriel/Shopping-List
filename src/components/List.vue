<template>
    <div>
        <div v-if="getLength > 0">
            <v-list :class="mobile">
                <Item :item="data" v-for="(data, index) in listOfItems" :key="index" :itemIndex="index"/>
            </v-list>
        </div>

        <div v-else>
            <v-card color="red lighten-3" class="white--text mx-3">
                <v-card-title primary-title>
                    <div>
                        <div class="headline">
                            {{ emptyText }}
                        </div>
                    </div>
                </v-card-title>
            </v-card>
        </div>
    </div>
    
</template>

<script>
    import Item from './Item.vue';

    export default {
        data () {
            return {
                emptyText: "Let's add some items to your list"
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
                }
            });
        },
        components: {
            Item
        }
    }
</script>