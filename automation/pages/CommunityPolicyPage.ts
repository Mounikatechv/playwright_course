import { Page,Locator,expect} from '@playwright/test';

export class CommunityPolicyPage {
    private page: Page;
    private communityDropdown: Locator;
    private settings: Locator;
    private communityPolicies: Locator;
    private addButton: Locator;
    private policyName: Locator;
    private policyDescription: Locator;
    private familyFriends: Locator;
    private volunteer: Locator;
    private policyMessage: Locator;
    private response: Locator;
    private saveButton: Locator;
    constructor(page: Page) {
        this.page = page;

    this.communityDropdown = page.locator('mat-select[role="combobox"]')
        .filter({ hasText: 'Premium owners' });

    this.settings = page.getByText('Settings', { exact: true }).nth(1);

    this.communityPolicies = page.locator('a.menu-name:visible')
        .filter({ hasText: 'Community Policies' });

    this.addButton = page.getByRole('button', {name: 'ADD',exact: true});

    this.policyName = page.locator('input[formcontrolname="title"]');

    this.policyDescription =page.locator('textarea[formcontrolname="description"]');

    this.familyFriends = page.getByRole('checkbox', {name: 'Family & Friends', exact: true});

    this.volunteer = page.getByRole('checkbox', { name: 'Volunteer',exact: true});

    this.policyMessage = page.locator( 'textarea[formcontrolname="descriptionText"]');

    this.response = page.locator('input[formcontrolname="descriptionType"]');

    this.saveButton = page.getByRole('button', {name: 'SAVE',exact: true });
}

    async selectCommunity(communityName: string) {
        await this.communityDropdown.click();

        await this.page.getByRole('option', {name: communityName,exact: true}).click();
    }

    async openSettings() {
        await this.settings.click();
    }

    async openCommunityPolicies() {
        await this.communityPolicies.click();
    }

    async clickAdd() {
        await this.addButton.waitFor({
            state: 'visible'
        });

        await this.addButton.click();
    }

    async enterPolicyName(name: string) {
        await expect(this.policyName).toBeVisible();
        await this.policyName.fill(name);
    }

    async enterPolicyDescription(description: string) {
        await expect(this.policyDescription).toBeVisible();
        await this.policyDescription.fill(description);
    }

    async selectAudience() {
        await this.familyFriends.check();
        await this.volunteer.check();
    }

    async enterPolicyMessage(message: string) {
        await expect(this.policyMessage).toBeVisible();
        await this.policyMessage.fill(message);
    }

    async enterResponse(responseText: string) {
        await expect(this.response).toBeVisible();
        await this.response.fill(responseText);
    }

    async savePolicy() {
        await expect(this.saveButton).toBeVisible();
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
    }
}