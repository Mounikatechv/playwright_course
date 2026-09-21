
import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { LoginPage } from '../pages/LoginPage';
import users from '../../data/users.json';
const { validateLoginData } = require('../../logic/data_validation');
dotenv.config({path: path.resolve(__dirname, '../../.env')});

const email = process.env.ACCUSHIELD_EMAIL!;
const password = process.env.ACCUSHIELD_PASSWORD!;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
});

test('test1 Successful Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const isValid = validateLoginData({email: email,password: password});

    expect(isValid).toBe(true);

    await loginPage.login(email, password);

});

test('test2 Invalid Credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

     await loginPage.login(users.invalidUser.email, users.invalidUser.password);  
    await page.waitForTimeout(10000);
});

test('test3 Locked User Access', async ({ page }) => {

    const loginPage = new LoginPage(page);

    for (let i = 0; i < 3; i++) {

        await loginPage.login(email,users.lockedUser.password);

        const errorMessage = page.locator(
            'div[class="toast-alert error fx-row ng-star-inserted"]'
        );

        await expect(errorMessage).toBeVisible();
        //await expect(errorMessage).toBeHidden();

        await page.getByRole('textbox', { name: 'Password' }).clear();
    }

});

test('test4 Logout Functionality', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(email, password);

    await loginPage.logout();

});

