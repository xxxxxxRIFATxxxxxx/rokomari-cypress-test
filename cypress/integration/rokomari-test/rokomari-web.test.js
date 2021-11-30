/// <reference types="cypress" />

describe('Rokomari Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false
        });
        cy.visit('https://www.rokomari.com/book');
    });

    // Home Page Test
    it('Home Page Test', () => {
        cy.url().should("eq", "https://www.rokomari.com/book");
    });

    // Sign In Test
    it('Sign In Test', () => {
        cy.contains('Sign in').click();
        cy.url().should("include", "https://www.rokomari.com/login");
        cy.get('form').within(() => {
            cy.get('#j_username').type('01688329403', { force: true });
            cy.get('#j_password').type('', { force: true });
            cy.contains('Sign In').click({ force: true });
        });
    });

    // Profile Test
    it('Profile Test', () => {
        // Sign In First
        cy.contains('Sign in').click();
        cy.url().should("include", "https://www.rokomari.com/login");
        cy.get('form').within(() => {
            cy.get('#j_username').type('01688329403', { force: true });
            cy.get('#j_password').type('Qweqwer6tr32*', { force: true });
            cy.contains('Sign In').click({ force: true });
        });

        // 1. My Account
        cy.get(".user-menu").click();
        cy.contains("My Account").click();
        cy.url().should("eq", "https://www.rokomari.com/my-section/profile");
        cy.contains("Change Information").click({ force: true });

        // 2. My Orders
        cy.get(".user-menu").click();
        cy.contains("My Orders").click();
        cy.url().should("eq", "https://www.rokomari.com/my-section/orders");

        // 3. My list
        cy.get(".user-menu").click();
        cy.contains("My List").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/my-section/list");
        cy.contains("Create New List").click({ force: true });
        cy.get('form').within(() => {
            cy.get('#list_title').type('iPhone', { force: true });
            cy.get('.custom-select').select('electronics', { force: true });
            cy.get('#customRadioInline2').check('0', { force: true });
            cy.get('#products')
                .type('a', { force: true })
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{enter}')

            cy.get('#products')
                .type('a', { force: true })
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{downarrow}')
                .type('{enter}')
        });
        cy.get('#submit').click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/my-section/list");

        // 4. My wishlist
        cy.get(".user-menu").click();
        cy.contains("My Wishlist").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/my-section/wish-list");

        // 5. My rating review
        cy.get(".user-menu").click();
        cy.contains("My Rating & Reviews").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/my-section/reviews/not-reviewed");

        // 6. My points
        cy.get(".user-menu").click();
        cy.contains("My Points").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/my-section/point");

        // 7. Sign out
        cy.get(".user-menu").click();
        cy.log(cy.contains("Sign Out"));
        cy.visit("https://www.rokomari.com/logout");
        cy.url().should("eq", "https://www.rokomari.com/book");
    });

    // Search Test
    it('Search Test', () => {
        cy.get("#js--search").type('book', { force: true }).type('{enter}');
        cy.contains("Showing").should('exist');
    });

    // Notification Test
    it('Notification Test', () => {
        // Sign In First
        cy.contains('Sign in').click();
        cy.url().should("include", "https://www.rokomari.com/login");
        cy.get('form').within(() => {
            cy.get('#j_username').type('01688329403', { force: true });
            cy.get('#j_password').type('Qweqwer6tr32*', { force: true });
            cy.contains('Sign In').click({ force: true });
        });

        cy.get("#unread-notification").click({ force: true });
        cy.contains("Notifications").should('exist');
    });

    // Cart Test
    it('Cart Test', () => {
        cy.get("#cart-icon").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/cart");
    });

    // Top Bar
    it('Top Bar', () => {
        // 1. Book
        cy.contains("বই").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/book?ref=nm");

        // 2. Electronics
        cy.contains("ইলেক্ট্রনিক্স").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/electronics?ref=nm");

        // 3. Stationary and others
        cy.contains("স্টেশনারী ও অন্যান্য").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/stationary?ref=nm");

        // 4. Gift Finder
        cy.contains("গিফট ফাইন্ডার").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/giftfinder?ref=nm");

        // 5. Institutional order
        cy.contains("প্রাতিষ্ঠানিক অর্ডার").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/corporate");

        // 6. Offers
        cy.contains("অফার সমূহ").click({ force: true });
        cy.url().should("eq", "https://www.rokomari.com/offer");

        // 7. Blog
        cy.contains("ব্লগ").click({ force: true });
        cy.visit("https://blog.rokomari.com/?ref=nm");
        cy.url().should("eq", "https://blog.rokomari.com/?ref=nm");
    });
});