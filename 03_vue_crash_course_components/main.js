Vue.component("hello-world", {
    template: `
        <div>
            <h1>{{ title }}</h1>
            <input v-model="name">
            <p>{{ name }}</p>
            <button v-on:click="greet">Greet me!</button>
        </div>
    `,
    props: {
        title: {
            type: String,
            default: "Title",
        }
    },
    data: function() {
        return {
            name: "",
        }
    },
    methods: {
        greet: function() {
            alert("Hello " + this.name);
        }
    }
})

var app = new Vue({
    el: "#app",
})