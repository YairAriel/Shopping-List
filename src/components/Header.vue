<template>
    <div>
        <v-toolbar color="blue-grey darken-2" class="white--text pt-3" fixed app>
            <v-menu bottom left>
                <v-btn slot="activator" dark icon class="pb-3">
                    <v-icon>more_vert</v-icon>
                </v-btn>

                <v-list>
                <v-list-tile v-for="(item, i) in menuItems" :key="i">
                    <v-list-tile-title @click="item.method" class="menu-item">{{ item.title }}</v-list-tile-title>
                </v-list-tile>
                </v-list>
            </v-menu>
            <div class="headline pb-3">
                {{ headerText | toUpper }}
                <v-badge right overlap color="red">
                    <span slot="badge" class="header-badge">{{ itemAmount }}</span>
                    <v-icon large dark class="ml-2">shopping_cart</v-icon>
                </v-badge>
            </div>
            <v-spacer></v-spacer>

            <v-fab-transition>
              <v-btn color="success" fab dark small absolute bottom right @click="hideButton" v-show="plusShown">
                <v-icon>add</v-icon>
              </v-btn>
            </v-fab-transition>
        </v-toolbar>

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

        <v-dialog v-model="settingsDialog" fullscreen hide-overlay transition="slide-x-reverse-transition">
            <v-card>
                <v-toolbar dark color="primary">
                <v-btn icon dark @click="settingsDialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="saveSettings">Save</v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-card>
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
                <v-card>
                    <v-card-title class="pb-0">Sort By Color</v-card-title>
                    <v-subheader>
                        Sort the shopping list by item color
                    </v-subheader>
                    <v-subheader class="mt-0">
                        <v-switch v-model="sortByColor" color="primary" class="mt-0"></v-switch>
                    </v-subheader>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ['plusShown'],
        data () {
            return {
                headerText: 'shopping list',
                snackbar: false,
                color: 'black',
                y: 'top',
                mode: '',
                timeout: 6000,
                text: 'List was saved successfully',
                menuItems: [
                    { title: 'Settings', method: this.openSettings },
                    { title: 'Save List', method: this.saveList }
                ],
                settingsDialog: false,
                colors: [
                    'lime',
                    'amber',
                    'deep-orange',
                    'pink',
                    'deep-purple',
                    'indigo'
                ]
            }
        },
        computed: {
            itemAmount () {
                return this.$store.getters.items.length;
            },
            defaultColor () {
                return this.$store.getters.defaultColor;
            },
            sortByColor: {
                get() {
                    return this.$store.getters.sortByColor;
                },
                set(value) {
                    this.$store.commit('setSortByColor', value);
                }
            }
        },
        methods: {
            openSettings () {
                this.settingsDialog = true;
            },
            changeColor (newDefaultColor) {
                this.$store.commit('setDefaultColor', newDefaultColor);
            },
            saveSettings () {
                const defaultColor = {
                    color: this.$store.getters.defaultColor
                };
                const sortByColor = {
                    sort: this.$store.getters.sortByColor
                };
                this.$http.patch('defaultColor.json', defaultColor);
                this.$http.patch('sortByColor.json', sortByColor);
                this.settingsDialog = false;
            },
            saveList () {
                const data = {
                    items: this.$store.getters.items
                }
                this.$http.patch('data.json', data);
                this.snackbar = true;
            },
            deleteList () {

            },
            hideButton () {
                this.$emit('plusClicked');
            }
        },
        created () {
            this.$http.get('sortByColor.json')
            .then(response => response.json())
            .then(data => {
                if(data) {
                    this.$store.commit('setSortByColor', data.sort);
                }
            });
            this.$http.get('defaultColor.json')
            .then(response => response.json())
            .then(data => {
                if(data) {
                    this.$store.commit('setDefaultColor', data.color);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .selected {
        border: 2px solid #1976D2;
        border-radius: 23px;
    }
    .header-badge {
        line-height: 0 !important;
    }
</style>

