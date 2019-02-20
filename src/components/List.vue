<template>
    <div>
        <Spinner size="60" :line-size="8" line-fg-color="#455A64" v-show="loading" 
        class="spinner" message="Loading..."></Spinner>
        <div v-if="listOfItems.length > 0">
            <v-progress-linear :color="barColor" height="10" :value="percentage" class="mb-3"></v-progress-linear>
            <v-list :class="mobile">
                <Item :item.sync="data" v-for="(data, index) in listOfItems" :key="index" :itemIndex="index"
                    @checked="doneCounter++" @unchecked="doneCounter--"/>
            </v-list>
        </div>
    </div>
    
</template>

<script>
    import Item from "./Item.vue";
    import Spinner from "vue-simple-spinner";

    export default {
        data() {
            return {
                loading: true,
                doneCounter: 0
            };
        },
        computed: {
            listOfItems() {
                return this.$store.getters.items;
            },
            mobile() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return false;
                }
                return { "mx-5": true };
            },
            percentage () {
                return Math.floor((this.doneCounter / this.listOfItems.length) * 100);
            },
            barColor () {
                if (this.percentage == 0) {
                    return '#607D8B';
                } else if (this.percentage < 20) {
                    return '#B71C1C';
                } else if (this.percentage < 40) {
                    return '#F44336';
                } else if (this.percentage < 60) {
                    return '#FF9800';
                } else if (this.percentage < 80) {
                    return '#FFEB3B';
                } else {
                    return '#00E676';
                }
            }
        },
        created() {
            this.$http
            .get("data.json")
            .then(response => response.json())
            .then(data => {
                if (data) {
                const shoppingList = data.items;
                this.$store.commit("setList", shoppingList);
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
