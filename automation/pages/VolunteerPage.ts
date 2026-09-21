import { Page } from '@playwright/test';

export class VolunteerPage {
    constructor(private page: Page) {}


    async selectCommunity(community: string) {
        await this.page.locator('mat-select[role="combobox"]').filter({ hasText: 'Premium owners' }).click();
        await this.page.getByRole('option', { name: community }) .click();
         
    }

    async openAccounts() {
        await this.page.locator('nav.nav-bar a').filter({ hasText: /^Accounts$/ }).click();
    }
    async openVolunteer() {
        await this.page.locator('a[href="/accounts/volunteer-profile"]:visible').click();
        await this.page.getByRole('button', { name: 'ADD', exact: true }).waitFor({ state: 'visible' });
    }

    async clickAdd() {
        await this.page.getByRole('button', { name: 'ADD', exact: true }).click();
        await this.page.locator('input[formcontrolname="first_name"]').waitFor({ state: 'visible' });
    }

    async enterDetails(
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string
    ) {
        await this.page.locator('input[formcontrolname="first_name"]').fill(firstName);
        await this.page.locator('input[formcontrolname="last_name"]').fill(lastName);
        const phone = this.page.locator( 'input[formcontrolname="phone_mobile"]');
        await phone.pressSequentially(phoneNumber);
        await this.page.getByLabel('email').fill(email);
    }

    async save() {
        await this.page.getByRole('button', { name: 'SAVE', exact: true }).click();
    }

    async waitForVolunteerList() {
        await this.page.waitForURL(/\/accounts\/volunteer-profile/);
    }
}