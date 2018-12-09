<template>
    <div>
        <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title class="py-3 pl-3 pr-0">
                <div>
                    <div class="headline">
                        {{ headerText | toUpper }}
                        <v-badge right overlap color="red">
                            <span slot="badge">{{ itemAmount }}</span>
                            <v-icon medium dark class="ml-3">shopping_cart</v-icon>
                        </v-badge>
                    </div>
                </div>

                <v-spacer></v-spacer>

                <v-menu bottom left>
                    <v-btn slot="activator" dark icon>
                    <v-icon>more_vert</v-icon>
                    </v-btn>

                    <v-list>
                    <v-list-tile v-for="(item, i) in menuItems" :key="i">
                        <v-list-tile-title @click="item.method" class="menu-item">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                    </v-list>
                </v-menu>
            </v-card-title>
        </v-card>

        <v-dialog v-model="settingsDialog" fullscreen hide-overlay transition="slide-x-reverse-transition">
            <v-card>
                <v-toolbar dark color="primary">
                <v-btn icon dark @click="settingsDialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="saveList">Save</v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-subheader>User Controls</v-subheader>
                <v-card avatar>
                    <v-card-title class="pb-0">Default Color</v-card-title>
                    <v-subheader>Set the default color for the items in your list</v-subheader>
                        <v-layout row wrap class="pb-3">
                            <v-flex xs2 md1 v-for="(color, index) in colors" :key="index">
                                    <v-icon x-large 
                                        :color="color" 
                                        @click="changeColor(color)"
                                        :class="{ selected: defaultColor == color }">
                                        brightness_1
                                    </v-icon>
                            </v-flex>
                        </v-layout>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';

    export default {
        data () {
            return {
                headerText: 'shopping list',
                menuItems: [
                    { title: 'Settings', method: this.openSettings },
                    { title: 'Save List', method: this.saveList },
                    { title: 'Delete List', method: this.deleteList }
                ],
                settingsDialog: false,
                colors: [
                    'amber',
                    'pink',
                    'deep-purple',
                    'brown',
                    'blue',
                    'deep-orange',
                    'green',
                    'yellow',
                    'red',
                    'orange',
                    'lime',
                    'indigo',
                ]
            }
        },
        computed: {
            itemAmount () {
                return this.$store.getters.items.length;
            },
            defaultColor () {
                return this.$store.getters.defaultColor;
            }
        },
        methods: {
            openSettings () {
                this.settingsDialog = true;
            },
            changeColor (newDefaultColor) {
                this.$store.commit('setDefaultColor', newDefaultColor);
            },
            saveList () {
                const defaultColor = {
                    color: this.$store.getters.defaultColor
                };
                console.log(defaultColor);
                this.$http.put('data.json', defaultColor);
                this.settingsDialog = false;
            },
            deleteList () {

            }
        },
        components: {
            Carousel,
            Slide
        },
        created () {
            console.log(this.defaultColor)
        }
    }
</script>

<style lang="scss" scoped>
    .selected {
        border: 2px solid #1976D2;
        border-radius: 23px;
    }
</style>

