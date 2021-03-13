const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        books: [],
        authors: [],
        genres: [],
        filteredGenres: [],
        currency: "£",
        shoppingCart: [],
        shoppingCartTotalPrice: 0,
        showShoppingCart: false,
        shoppingCartTotalQuantity: 0,
        filteredGenresText: "All",
        purchased: false
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
        },
        updateShoppingCartTotalPrice: function() {
            let totalQuantity = 0;
            let totalPrice = 0;

            this.shoppingCart.forEach(item => {
                totalPrice += item.quantityTotalPrice;
                totalQuantity = totalQuantity + parseInt(item.quantity);
            });

            totalPrice = Math.round(totalPrice * 100) / 100

            this.shoppingCartTotalPrice = totalPrice;
            this.shoppingCartTotalQuantity = totalQuantity;
        },
        emptyShoppingCart: function(){
            this.shoppingCart.forEach((item) => {
                item.inCartFlag = false;
            });

            this.shoppingCart = [];
            this.updateShoppingCartTotalPrice();
        },
        addToShoppingCart(bookObj) {
            bookObj.inCartFlag = true;
            bookObj.quantity = 1;
            bookObj.quantityTotalPrice = bookObj.quantity * bookObj.price;

            this.shoppingCart.push(bookObj);

            console.log({ bookObj});

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
        },
        clearFilteredGenres: function() {
            this.filteredGenresText = "All";
            this.filteredGenres = [];

            this.toggleBooksVisibility(true);
        },
        toggleBooksVisibility: function(boolFlag) {
            for (let bookIndex = 0; bookIndex < this.books.length; bookIndex++) {
                const bookObj = this.books[bookIndex];
                
                bookObj.visibility = boolFlag;
            }
        },
        toggleSelectedBooksVisibility: function(selectedBooks, boolFlag) {
            console.log({selectedBooks});
            
            for (let bookIndex = 0; bookIndex < selectedBooks.length; bookIndex++) {
                const bookObj = selectedBooks[bookIndex];
                
                bookObj.visibility = boolFlag;
            }
        },
        updateFilteredGenres: function() {
            // GENRES FILTER TEXT
            let filteredText = "All";

            if (this.filteredGenres.length > 0) {
                filteredText = "";

                this.filteredGenres.sort(function(a,b) {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                    return 1;
                    }
                    return 0; 
                });

                this.filteredGenres.forEach(genre => {
                    filteredText += genre + ", ";
                });

                // CROP OUT LAST COMMA
                filteredText = filteredText.substring(0, filteredText.length - 2);
            }

            
            this.filteredGenresText = filteredText;

            this.toggleBooksVisibility(false);

            // LOOP THROUGH EACH FILTER
            for (let filterGenreIndex = 0; filterGenreIndex < this.filteredGenres.length; filterGenreIndex++) {
                const filterGenre = this.filteredGenres[filterGenreIndex];
                
                let books = this.books.filter((item) => {
                    return item.genres.includes(filterGenre);
                });

                this.toggleSelectedBooksVisibility(books, true);

            }

            // clear all if not filters selected
            if (this.filteredGenres.length === 0) {
                this.toggleBooksVisibility(true);
            }

        },
        completePurchase: function() {
            this.purchased = true;
            this.clearFilteredGenres();
            this.emptyShoppingCart();
            this.toggleBooksVisibility(true);
        },
        closeShoppingCart: function() {
            if (this.purchased === true) {
                this.purchased = false;
            }
            this.showShoppingCart = false;
        }
    }
});