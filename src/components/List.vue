<template>
    <div>
        <Spinner size="60" :line-size="8" line-fg-color="#455A64" v-show="loading" 
        class="spinner pt-3 mt-5" message="Loading..."></Spinner>
        <div v-if="listOfItems.length > 0">
            <v-progress-linear :color="barColor" height="10" :value="percentage" class="mb-3"></v-progress-linear>
            <v-list :class="mobile">
                <Item :item.sync="data" v-for="(data, index) in listOfItems" :key="index" :itemIndex="index"
                @edited="editClosed = false" @finishEditing="editClosed = true"/>
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
                editClosed: true
            };
        },
        computed: {
            listOfItems() {
                let list = this.$store.getters.items;
                if (this.$store.getters.sortByColor && this.editClosed) {
                    this.sortList(list)
                    .then((listSorted) => {
                        list = listSorted;
                    });
                }
                return list;
            },
            mobile() {
                if (this.$vuetify.breakpoint.smAndDown) {
                    return false;
                }
                return { "mx-5": true };
            },
            clickedCounter () {
                let templist = this.listOfItems.filter(item => item.clicked == true);
                return templist.length;
            },
            percentage () {
                return Math.floor((this.clickedCounter / this.listOfItems.length) * 100);
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
                    return '#FFC107';
                } else {
                    return '#00C853';
                }
            }
        },
        methods: {
            sortList(listToSort) {
                return new Promise((resolve) => {
                    listToSort.sort((a, b) => {
                        var nameA = a.color.toUpperCase(); 
                        var nameB = b.color.toUpperCase(); 
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        return 0;
                    });
                    resolve(listToSort);
                })
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
