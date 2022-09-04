

const Page = require('./BasePage');

class SpanishPage extends Page {
    get cookiesBtn () {
        return $('button[aria-label="Consent"]');
    }

    async open(){
        await super.open('/es');
    }
    async maximize(){
        await super.maximize();
    }
}

module.exports = new SpanishPage();
