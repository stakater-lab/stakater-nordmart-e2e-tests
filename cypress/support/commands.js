// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    const kcRoot = Cypress.env('keycloakUrl');
    const kcRealm = 'nordmart';
    const kcClient = 'stakater-nordmart-web';
    const kcRedirectUri = Cypress.env('nordmartWebUrl');
    const loginPageRequest = {
        url: `${kcRoot}/realms/${kcRealm}/protocol/openid-connect/auth`,
        qs: {
            client_id: kcClient,
            redirect_uri: kcRedirectUri,
            state: createUUID(),
            nonce: createUUID(),
            response_mode: 'fragment',
            response_type: 'code',
            scope: 'openid'
        }
    };

    return cy.request(loginPageRequest).then(submitLoginForm);

    function submitLoginForm(response) {
        const _el = document.createElement('html');
        _el.innerHTML = response.body;
        const loginForm = _el.getElementsByTagName('form');
        const isAlreadyLoggedIn = !loginForm.length;
        if (isAlreadyLoggedIn) {
            return;
        }
        return cy.request({
            form: true,
            method: 'POST',
            url: loginForm[0].action,
            followRedirect: false,
            body: {
                username: username,
                password: password
            }
        });
    }

    function createUUID() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4';
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        var uuid = s.join('');
        return uuid;
    }
});

Cypress.Commands.add('logout', () => {
    const kcRoot = Cypress.env('keycloakUrl');
    const kcRealm = 'nordmart';
    const kcRedirectUri = Cypress.env('nordmartWebUrl');
    return cy.request({
        url: `${kcRoot}/realms/${kcRealm}/protocol/openid-connect/logout`,
        qs: {
            redirect_uri: kcRedirectUri
        }
    });
});