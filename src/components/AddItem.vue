<template>
<div id="app1">
    <v-container>
        <v-layout v-bind="binding">
            <v-flex xs12 md4>
                <v-text-field label="Enter a New Item" placeholder="Item Name" v-model="item"
                    @click="inputClicked" @blur="inputBlured"></v-text-field>
            </v-flex>
            <v-flex xs12 md4 offset-md1>
                <v-text-field label="Quantity" placeholder="0" type="number" v-model="amount"
                    @click="inputClicked" @blur="inputBlured"></v-text-field>
            </v-flex>
            <v-flex xs12 md2 offset-md1>
                <v-btn 
                    block 
                    color="success"
                    class="subheading"
                    @click="addToList"
                    :disabled="item == '' || amount == ''">{{ addText | toUpper }}</v-btn>
            </v-flex>
        </v-layout>
     </v-container>
</div>
</template>

<script>
    export default {
        data () {
            return {
                item: '',
                amount: '',
                addText: 'add item'
            }
        },
        methods: {
            addToList () {
                this.$store.commit('itemAdded', { name: this.item, qty: this.amount, color: this.defaultColor });   
                this.item = "";
                this.amount = "";
            },
            inputClicked () {
                this.$emit('hide');
            },
            inputBlured () {
                this.$emit('show');
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
        },
        created () {
            this.$http.get('defaultColor.json')
            .then(response => response.json())
            .then(data => {
                if(data) {
                    this.$store.commit('setDefaultColor', data.color);
                }
            });
        },
    }
</script>
