const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        books: [],
        authors: [],
        genres: [],
        filteredAuthors: [],
    },
    methods: {
        preload:function(event) {
            fetch("data/data.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.authors = data.authors;
            this.articles = data.articles;
        }
    }
});