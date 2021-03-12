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
        filteredGenresText: "All"
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
        updateFilteredGenres: function() {
            // genres text
            let filteredText = "All";

            if (this.filteredGenres.length > 0) {
                filteredText = "";

                this.filteredGenres.forEach(genre => {
                    filteredText += genre + ", ";
                });
            } 

            this.filteredGenresText = filteredText;

            // LOOP THROUGH EACH BOOK
            for (let bookIndex = 0; bookIndex < this.books.length; bookIndex++) {
                const bookObj = this.books[bookIndex];
                
                for (let bookGenreIdx = 0; bookGenreIdx < bookObj.genres.length; bookGenreIdx++) {
                    const genreObj = bookObj.genres[bookGenreIdx];
                    
                    for (let filteredGenreIdx = 0; filteredGenreIdx < this.filteredGenres.length; filteredGenreIdx++) {
                        const filteredGenre = this.filteredGenres[filteredGenreIdx];
                        
                        if (filteredGenre === genreObj) {
                            bookObj.visibility = true;
                            break;
                        } else {
                            bookObj.visibility = false;
                        }
                    }
                }

            }

        }
    }
});