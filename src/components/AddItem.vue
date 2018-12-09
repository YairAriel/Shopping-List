<template>
<div id="app1">
    <v-container>
        <v-layout v-bind="binding">
            <v-flex xs12 md4>
                <v-text-field label="Enter a New Item" placeholder="Item Name" v-model="item"></v-text-field>
            </v-flex>
            <v-flex xs12 md4 offset-md1>
                <v-text-field label="Quantity" placeholder="0" type="number" v-model="amount"></v-text-field>
            </v-flex>
            <v-flex xs12 md2 offset-md1>
                <v-btn 
                    block 
                    color="success"
                    class="subheading"
                    @click="addToList"
                    :disabled="item == '' || amount == 0">{{ addText | toUpper }}</v-btn>
            </v-flex>
        </v-layout>
     </v-container>
</div>
</template>

<script>
    export default {
        data () {
            return {
                item: "",
                amount: 0,
                addText: 'add item'
            }
        },
        methods: {
            addToList () {
                this.$store.commit('itemAdded', { name: this.item, qty: this.amount, color: this.defaultColor });   
                this.item = "";
                this.amount = 0;
            }
        }, 
        computed: {
            binding () {
                const binding = {};
                if (this.$vuetify.breakpoint.smAndDown) {
                    binding.column = true;
                }
                return binding;
            },
            defaultColor () {
                return this.$store.getters.defaultColor;
            }
        }
    }
</script>
