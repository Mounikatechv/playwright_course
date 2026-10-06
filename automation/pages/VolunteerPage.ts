import { Page, Locator } from '@playwright/test';

export class VolunteerPage {
    private page: Page;

    private communityDropdown: Locator;
    private accountsLink: Locator;
    private volunteerLink: Locator;
    private addButton: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private phoneInput: Locator;
    private emailInput: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.communityDropdown = this.page .locator('mat-select[role="combobox"]').filter({ hasText: 'Premium owners' });
        this.accountsLink = this.page.locator('nav.nav-bar a').filter({ hasText: /^Accounts$/ });
        this.volunteerLink = this.page.locator('a[href="/accounts/volunteer-profile"]:visible');
        this.addButton = this.page.getByRole('button', {name: 'ADD',exact: true});
        this.firstNameInput = this.page.locator('input[formcontrolname="first_name"]');
        this.lastNameInput = this.page.locator( 'input[formcontrolname="last_name"]');
        this.phoneInput = this.page.locator('input[formcontrolname="phone_mobile"]');
        this.emailInput = this.page.getByLabel('email');
        this.saveButton = this.page.getByRole('button', {name: 'SAVE',exact: true });
    }

    async selectCommunity(community: string) {
        await this.communityDropdown.click();
        await this.page.getByRole('option', { name: community }) .click();
    }

    async openAccounts() {
        await this.accountsLink.click();
    }

    async openVolunteer() {
        await this.volunteerLink.click();
        await this.addButton.waitFor({ state: 'visible' });
    }

    async clickAdd() {
        await this.addButton.click();
        await this.firstNameInput.waitFor({ state: 'visible' });
    }

    async enterDetails(firstName: string,lastName: string, phoneNumber: string,email: string) 
    {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneInput.pressSequentially(phoneNumber);
        await this.emailInput.fill(email);
    }

    async save() {
        await this.saveButton.click();
    }

    async waitForVolunteerList() {
        await this.page.waitForURL(/\/accounts\/volunteer-profile/);
    }
}