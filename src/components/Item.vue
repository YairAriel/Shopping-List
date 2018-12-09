<template>
    <div>
        <v-list-tile>
            <v-list-tile-content>
                <v-chip :color="item.color" text-color="white" class="body-2" v-if="!clicked" @click="clicked = true">
                    <v-avatar :class="item.color" class="darken-3 body-2">{{ item.qty }}</v-avatar>{{ item.name }}
                </v-chip>
                <v-chip color="grey" text-color="white" class="body-2" v-else @click="clicked = false">
                    <v-avatar class="grey darken-3 body-2"><v-icon>done</v-icon></v-avatar>{{ item.name }}
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
                        <v-layout row>
                            <v-flex xs4 v-for="(color, index) in colors" :key="index">
                                <v-btn fab @click="item.color = color">
                                    <v-icon large :color="color">format_paint</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>

                    <v-btn @click="saveChanges" :disabled="item.name == '' || item.qty == 0">Edit</v-btn>
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
                clicked: false,
                colors: [
                    'deep-orange',
                    'amber',
                    'green',
                    'blue'
                ],
                pickedColor: ''
            }
        },
        methods: {
            deleteItem () {
                this.$store.commit('removeFromList', this.itemIndex)
            },
            openEditDialog () {
                this.dialog = true;
            },
            saveChanges () {
                this.$store.commit('editItem', { index: this.itemIndex, item: this.item, color: this.pickedColor });
                this.dialog = false;
            }
        },
    }
</script>
