const EnglishPage = require('../pageobjects/EnglishPage');
const { titleEn, titleEs, titleEsSettings, cookiesBtnEn, cookiesBtnEs, sideMenuHref, settingsHref } = require('../pageobjects/utils/constants')
const SpanishPage = require('../pageobjects/SpanishPage');

describe('Opens weather.com and searches Malaga weather', async () => {
    it('checks page title in Spanish', async () => {
        await SpanishPage.maximize();
        await SpanishPage.open();
        await expect(browser).toHaveTitle(titleEs);
    });
    it('checks cookies accept button has text in Spanish', async () => {
        await browser.pause(3000);
        await expect(SpanishPage.cookiesBtn).toHaveText(cookiesBtnEs);
    });
    it('checks page title in English', async () => {
        await EnglishPage.open();
        await expect(browser).toHaveTitle(titleEn);
    });
    it('checks cookies accept button has text in English', async () => {
        await browser.pause(3000);
        await expect(EnglishPage.cookiesBtn).toHaveText(cookiesBtnEn);
        await EnglishPage.manageCookies();
    });
    it('should check side menu\'s elements have href attributes', async () => {
        await expect(EnglishPage.sideMenuBtn).toHaveAttr('xmlns', sideMenuHref);
        await EnglishPage.clickSideMenu();
        await expect(EnglishPage.elementSettingsMenu).toBeElementsArrayOfSize(1);
        await expect(EnglishPage.elementSettingsMenu[0]).toHaveAttrContaining('href', settingsHref);
        await expect(EnglishPage.elementsSideMenu).toBeElementsArrayOfSize(23);
    });
    it('should open settings and change language to Spanish', async () => {
        await EnglishPage.openSettings();
        await EnglishPage.dismissAdd();
        await EnglishPage.changeLanguage();
        await expect(EnglishPage.spanish).toBeSelected()
        await expect(browser).toHaveTitle(titleEsSettings)
    });
    it('should search "Malaga" and get temperature from the settings page', async () => {
        await expect(EnglishPage.searchInput).toBeDisplayed();
        await expect(EnglishPage.searchInput).toHaveAttr('placeholder', 'Buscar')
        await EnglishPage.searchMalaga();
        await browser.pause(5000);
        await EnglishPage.dismissAdd1();
        const headerTemp = await EnglishPage.tempHeader.getText()
        await expect(EnglishPage.temperature).toHaveTextContaining(headerTemp.slice(0, 3))
    }); 
    it('should search "Malaga" and get temperature from the homepage', async () => {
        await EnglishPage.open();
        await EnglishPage.searchMalaga();
        const headerTemp = await EnglishPage.tempHeader.getText()
        await expect(EnglishPage.temperature).toHaveTextContaining(headerTemp.slice(0, 3))    
    }); 
});