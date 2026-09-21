import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage  {

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly signInButton: Locator;
    readonly accountIcon: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
    super(page);

        this.emailInput = this.page.getByPlaceholder('Email Address');
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.rememberMeCheckbox =this. page.getByRole('checkbox', { name: 'Remember me' });

        this.signInButton =this. page.locator(
            '[class="mdc-button mat-mdc-button-base btn-blue w-100 mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed"]'
        );

        this.accountIcon = this.page.locator( '.material-icons',{ hasText: 'account_circle' });
        this.logoutButton = this.page.locator('mat-sidenav a.menu', {hasText: 'Logout'});
        //this.logoutButton = this.page.getByText('Logout', { exact: true }).nth(1);
    }

    async goto() {
    await this.page.goto(`${this.baseURL}auth/login`);
}

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.check();

        await expect(this.signInButton).toHaveText('SIGN IN');

        await this.signInButton.click();
    }

    async logout() {
    await this.accountIcon.click();
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
}
}