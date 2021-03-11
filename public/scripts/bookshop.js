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
        shoppingCartTotalPrice: 0,
        showShoppingCart: false,
        shoppingCartTotalQuantity: 0
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
            let totalQuantity = 0;
            let totalPrice = 0;

            this.shoppingCart.forEach(item => {
                totalPrice += item.quantityTotalPrice;
                totalQuantity += item.quantity;
            });

            totalPrice = Math.round(totalPrice * 100) / 100

            this.shoppingCartTotalPrice = totalPrice;
            this.shoppingCartTotalQuantity = totalQuantity;
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
            let tempPrice = 0;

            tempPrice = bookObj.quantity * bookObj.price;
            tempPrice = Math.round(tempPrice * 100) / 100;

            bookObj.quantityTotalPrice = tempPrice;

            this.updateShoppingCartTotalPrice();
        },
        toggleShoppingVisibilty: function() {
            let flag = this.showShoppingCart;

            if (flag === true) {
                flag = false;
            } else {
                flag = true;
            }

            this.showShoppingCart = flag;
        }
    }
});