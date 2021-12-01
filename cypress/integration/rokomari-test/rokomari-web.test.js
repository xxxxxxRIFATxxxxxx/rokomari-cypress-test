/// <reference types="cypress" />

// Import Data
const rokomariData = require('./rokomariData');

// Common Functions
const signIn = () => {
    cy.contains('Sign in').click();
    cy.url().should("include", rokomariData.loginURL);
    cy.get('form').within(() => {
        cy.get('#j_username').type(rokomariData.username, { force: true });
        cy.get('#j_password').type(rokomariData.password, { force: true });
        cy.contains('Sign In').click({ force: true });
    });
};

describe('Rokomari Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false
        });
        cy.visit(rokomariData.homeURL);
    });

    // Home Page Test
    it('Home Page Test', () => {
        cy.url().should("eq", rokomariData.homeURL);
    });

    // Sign In Test
    it('Sign In Test', () => {
        signIn();
    });

    // Profile Test
    it('Profile Test', () => {
        // Sign In First
        signIn();

        // 1. My Account
        cy.get(".user-menu").click();
        cy.contains("My Account").click();
        cy.url().should("eq", rokomariData.profileURL);
        cy.contains("Change Information").click({ force: true });

        // 2. My Orders
        cy.get(".user-menu").click();
        cy.contains("My Orders").click();
        cy.url().should("eq", rokomariData.myOrdersURL);

        // 3. My list
        cy.get(".user-menu").click();
        cy.contains("My List").click({ force: true });
        cy.url().should("eq", rokomariData.myListURL);
        cy.contains("Create New List").click({ force: true });
        cy.get('form').within(() => {
            cy.get('#list_title').type('iPhone', { force: true });
            cy.get('.custom-select').select('electronics', { force: true });
            cy.get('#customRadioInline2').check('0', { force: true });
            cy.get('#products')
                .type('a', { force: true })
                .type('{downarrow}')
                .type('{enter}')

            cy.get('#products')
                .type('a', { force: true })
                .type('{downarrow}')
                .type('{enter}')
        });
        cy.get('#submit').click({ force: true });
        cy.url().should("eq", rokomariData.myListURL);

        // 4. My wishlist
        cy.get(".user-menu").click();
        cy.contains("My Wishlist").click({ force: true });
        cy.url().should("eq", rokomariData.myWishListURL);

        // 5. My rating review
        cy.get(".user-menu").click();
        cy.contains("My Rating & Reviews").click({ force: true });
        cy.url().should("eq", rokomariData.myRatingReviewURL);

        // 6. My points
        cy.get(".user-menu").click();
        cy.contains("My Points").click({ force: true });
        cy.url().should("eq", rokomariData.myPointsURL);

        // 7. Sign out
        cy.get(".user-menu").click();
        cy.log(cy.contains("Sign Out"));
        cy.visit(rokomariData.signOutURL);
        cy.url().should("eq", rokomariData.homeURL);
    });

    // Search Test
    it('Search Test', () => {
        cy.get("#js--search").type('book', { force: true }).type('{enter}');
        cy.contains("Showing").should('exist');
    });

    // Notification Test
    it('Notification Test', () => {
        // Sign In First
        signIn();

        cy.get("#unread-notification").click({ force: true });
        cy.contains("Notifications").should('exist');
    });

    // Cart Test
    it('Cart Test', () => {
        cy.get("#cart-icon").click({ force: true });
        cy.url().should("eq", rokomariData.myCartURL);
    });

    // Top Bar
    it('Top Bar Test', () => {
        // 1. Book
        cy.contains("বই").click({ force: true });
        cy.url().should("eq", rokomariData.bookURL);

        // 2. Electronics
        cy.contains("ইলেক্ট্রনিক্স").click({ force: true });
        cy.url().should("eq", rokomariData.electronicsURL);

        // 3. Stationary and others
        cy.contains("স্টেশনারী ও অন্যান্য").click({ force: true });
        cy.url().should("eq", rokomariData.stationaryURL);

        // 4. Gift Finder
        cy.contains("গিফট ফাইন্ডার").click({ force: true });
        cy.url().should("eq", rokomariData.giftFinderURL);

        // 5. Institutional order
        cy.contains("প্রাতিষ্ঠানিক অর্ডার").click({ force: true });
        cy.url().should("eq", rokomariData.institutionalURL);

        // 6. Offers
        cy.contains("অফার সমূহ").click({ force: true });
        cy.url().should("eq", rokomariData.offersURL);

        // 7. Blog
        cy.contains("ব্লগ").click({ force: true });
        cy.visit(rokomariData.blogURL);
        cy.url().should("eq", rokomariData.blogURL);
    });
});