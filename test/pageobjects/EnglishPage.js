
const { city } = require('./utils/constants');

const BasePage = require('./BasePage');

class EnglishPage extends BasePage {
    get cookiesBtn () {
        return $('button[aria-label="Consent"]');
    }
    get header() {
        return $("a.recent-location-item")
    }

    get sideMenuBtn() {
        return $('svg.hamburger-button.icon-hamburger')
    }
    get searchInput () {
        return $('input[name="query"]');
    }
    get searchBtn () {
        return $('svg.search-icon')
    }
    get settingsMenu() {
        return $('div.settings-link')
    }
    get elementSettingsMenu() {
        return this.settingsMenu.$$('a')
    }
    get sideMenuList() {
        return $('div.header-menu')
    }
   get elementsSideMenu() {
        return this.sideMenuList.$$('a')
   }
   get localeList() {
        return $('#locale')
   }
   get spanish() {
        return $('option[value="es"]')
   }
   get malaga() {
        return $('div.locations-list.content-module a:nth-child(1)')
   }
   get temperature() {
        return $('div.temp')
   }
   get tempHeader() {
    return $('span.header-temp')
   }
   get adIframe() {
    return $('iframe[id="google_ads_iframe_/6581/web/es/interstitial/news_info/country_home_0"]')
   }
   get frame() {
    return $('iframe[id="google_ads_iframe_/6581/web/es/interstitial/admin/search_0"]')
   }
   get dismissBtn() {
    return $('svg[fill="#5F6368"]')
}
    async open(){
        await super.open('/en');
    }
    async maximize(){
        await super.maximize();
    }
    async manageCookies() {
        await this.cookiesBtn.waitForDisplayed({timeout: 2000});
        await this.cookiesBtn.click();
    }
    async clickSideMenu() {
        await this.sideMenuBtn.waitForDisplayed();
        await this.sideMenuBtn.click();
    }
    async openSettings() {
        await this.elementSettingsMenu[0].waitForDisplayed();
        await this.elementSettingsMenu[0].click();
    }
    async changeLanguage() {
        await this.localeList.waitForExist();
        await this.localeList.click();
        await this.spanish.waitForDisplayed();
        await this.spanish.click();
    }
    async searchMalaga() {
        await this.searchInput.waitForDisplayed();
        await this.searchInput.setValue(city);
        await browser.keys('Enter');
        await this.malaga.waitForDisplayed();
        await this.malaga.click();
    }

    async dismissAdd() {
        await browser.pause(1000)
        if(await this.adIframe.isExisting()) {
            await this.adIframe.waitForExist();
            await browser.switchToFrame(await this.adIframe);
            await this.dismissBtn.waitForDisplayed();
            await this.dismissBtn.click();
        }
        return
    }    
    async dismissAdd1() {
        await browser.pause(1000)
        if(await this.frame.isExisting()) {
            await this.frame.waitForExist();
            await browser.switchToFrame(await this.frame);
            await this.dismissBtn.waitForDisplayed();
            await this.dismissBtn.click();
        }
        return
    }
}
module.exports = new EnglishPage();
