
class ShoppingCart {
    constructor() {
        this.items = [];
        this.discount = 0;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getTotalPrice() {
        const total = this.items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        return total - total * this.discount;
    }

    applyDiscount(discountRate) {
        this.discount = discountRate;
    }

    clear() {
        this.items = [];
        this.discount = 0;
    }
}

module.exports = ShoppingCart;
