const { chromium } = require('playwright');
import fs from 'fs/promises';

type Prenom = {
    prenom: string;
    gender?: string;
}

type Fete = Record<string, Prenom[]>

async function getFetesByDate(month: string, day: string, context: any): Promise<Prenom[]> {

    const page = await context.newPage() as import('playwright').Page;
    await page.goto(`https://www.magicmaman.com/prenom/calendrier-saint/${month}/${day}`);

    // Gestion des cookies
    if (await page.locator('[aria-label="Bienvenue chez Magicmaman.com ! Gestion du consentement"]').count() > 0) {
        await page.getByRole('button', { name: 'Continuer sans accepter →' }).click();
    }
    const prenomsLink = await page.locator('.PrenomCalendar-firstNames > div > a');
    const count = await prenomsLink.count();

    const prenoms = [] as Prenom[];

    for (let i = 0; i < count; i++) {
        const prenomLink = await prenomsLink.nth(i);
        const prenom = await prenomLink.innerHTML();
        const className = await prenomLink.getAttribute('class');
        const gender = className?.includes('boy') ? 'H' : 'F';
        prenoms.push({
            gender,
            prenom
        });
    }

    await page.close();

    return prenoms;
}


(async () => {
    const browser = await chromium.launch({
        headless: false, slowMo: 50
    });
    const context = await browser.newContext({
        serviceWorkers: 'block'
    });

    const dString = "01.01.2022";
    const days = 364;

    let [day, month, year] = dString.split('.');

    const now = new Date(Number(year), Number(month) - 1, Number(day));

    let loopDay = now;

    const fetes = {} as Fete;
    for (let i = 0; i <= days; i++) {
        const dateFormated = loopDay.toLocaleDateString("fr-FR", {
            month: "2-digit",
            day: "2-digit",
        });
        const day = dateFormated.split('/')[0];
        const month = dateFormated.split('/')[1];
        console.log(day, month);

        const res = await getFetesByDate(month, day, context);
        
        fetes[dateFormated] = res;
        await fs.writeFile('fete_magic_maman.json', JSON.stringify(fetes, null, 2));

        loopDay.setDate(loopDay.getDate() + 1);
    }

    await context.close();
    await browser.close();
})();

export { };

