<template>
    <div>
        <v-list-tile>
            <v-list-tile-content>
                <v-chip v-if="!item.clicked" :color="item.color" text-color="white" class="body-2" 
                    @click="item.clicked = true">
                    <v-avatar :class="item.color" class="darken-3 body-2">
                        {{ item.qty }}
                    </v-avatar>
                    {{ item.name }}
                </v-chip>
                <v-chip v-else color="grey" text-color="white" class="body-2"
                    @click="item.clicked = false">
                    <v-avatar class="grey darken-3 body-2">
                        <v-icon>done</v-icon>
                    </v-avatar>
                    {{ item.name }}
                </v-chip>
            </v-list-tile-content>

            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="blue lighten-1" @click="openEditDialog()">edit</v-icon>
                </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
                <v-btn icon ripple @click="deleteItem()">
                    <v-icon color="red lighten-1">clear</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>

        <v-layout>
            <v-dialog v-model="dialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Edit Item</v-card-title>
                    <v-card-text>
                        <v-text-field 
                            label="Item Name"
                            v-model="item.name">
                        </v-text-field>
                        <v-text-field 
                            label="Quantity" 
                            type="number"
                            v-model="item.qty">
                        </v-text-field>
                    </v-card-text>
                    <v-card-text class="pa-0 my-2">
                        <v-layout row wrap>
                            <v-flex xs2 v-for="(color, index) in colors" :key="index">
                                <v-icon medium :color="color" @click="item.color = color"
                                    :class="{ selected: item.color == color }">brightness_1</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-card-text>

                    <v-btn @click="closeEditDialog">Cancel</v-btn>
                    <v-btn @click="saveChanges" :disabled="item.name == '' || item.qty == 0">Save</v-btn>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    export default {
        props: ['item', 'itemIndex'],
        data () {
            return {
                dialog: false,
                // clicked: false,
                colors: [
                   'lime',
                    'amber',
                    'deep-orange',
                    'pink',
                    'deep-purple',
                    'indigo'
                ],
                pickedColor: '',
                tempItem: {}
            }
        },
        methods: {
            deleteItem () {
                this.$store.commit('removeFromList', this.itemIndex);
            },
            openEditDialog () {
                this.tempItem.name = this.item.name;
                this.tempItem.qty = this.item.qty;
                this.tempItem.color = this.item.color;
                this.dialog = true;
            },
            closeEditDialog () {
                this.item.name = this.tempItem.name;
                this.item.qty = this.tempItem.qty;
                this.item.color = this.tempItem.color;
                this.dialog = false;
            },
            saveChanges () {
                this.$store.commit('editItem', { index: this.itemIndex, item: this.item });
                const data = {
                    items: this.$store.getters.items
                }
                this.$http.patch('data.json', data);
                this.dialog = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .selected {
        border: 2px solid #1976D2;
        border-radius: 23px;
    }
</style>

