
const ShoppingCart = require('../ShoppingCart');

describe('ShoppingCart', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
    });

    test('should add an item to the cart', () => {
        cart.addItem({ id: 1, name: 'Apple', price: 1.0, quantity: 3 });
        expect(cart.items.length).toBe(1);
    });

    test('should remove an item from the cart', () => {
        cart.addItem({ id: 1, name: 'Apple', price: 1.0, quantity: 3 });
        cart.removeItem(1);
        expect(cart.items.length).toBe(0);
    });

    test('should calculate the total price', () => {
        cart.addItem({ id: 1, name: 'Apple', price: 1.0, quantity: 3 });
        cart.addItem({ id: 2, name: 'Banana', price: 0.5, quantity: 6 });
        expect(cart.getTotalPrice()).toBe(6.0);
    });

    test('should apply a discount to the total price', () => {
        cart.addItem({ id: 1, name: 'Apple', price: 1.0, quantity: 3 });
        cart.addItem({ id: 2, name: 'Banana', price: 0.5, quantity: 6 });
        cart.applyDiscount(0.1); // 10% discount
        expect(cart.getTotalPrice()).toBe(5.4); // 6.0 - 10% = 5.4
    });

    test('should clear the cart', () => {
        cart.addItem({ id: 1, name: 'Apple', price: 1.0, quantity: 3 });
        cart.clear();
        expect(cart.items.length).toBe(0);
    });
});
