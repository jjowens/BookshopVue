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
        filteredGenres: [],
        currency: "£",
        shoppingCart: [],
        shoppingCartTotalPrice: 0
    },
    methods: {
        preload:function(event) {
            fetch("public/data/data.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.authors = data.authors;
            this.genres = data.genres;
            this.books = data.books;

            console.log("All loaded now");

            console.log(this.authors);
        },
        updateShoppingCartTotalPrice: function() {
            let totalPrice = 0;

            this.shoppingCart.forEach(item => {
                totalPrice += item.quantityTotalPrice;
            });

            this.shoppingCartTotalPrice = totalPrice;
        },
        addToShoppingCart(bookObj) {
            bookObj.inCartFlag = true;
            bookObj.quantity = 1;
            bookObj.quantityTotalPrice = bookObj.quantity * bookObj.price;

            this.shoppingCart.push(bookObj);
            this.updateShoppingCartTotalPrice();
        },
        removeFromShoppingCart(bookObj) {
            bookObj.inCartFlag = false;
            let idxes = [];
            let idx = 0;
            this.shoppingCart.forEach(element => {
                if (element.title === bookObj.title) {
                    idxes.push(idx);
                }
                idx += 1;
            });

            idxes.forEach(cartIdx => {
                this.shoppingCart.splice(cartIdx, 1);
            });

            this.updateShoppingCartTotalPrice();
        },
        updateQuantityPrice(bookObj) {
            console.log(bookObj.quantity + " * " + bookObj.price);
            bookObj.quantityTotalPrice = bookObj.quantity * bookObj.price;

            this.updateShoppingCartTotalPrice();
        }
    }
});