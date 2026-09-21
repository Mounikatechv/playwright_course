import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { LoginPage } from '../pages/LoginPage';
import { CommunityPolicyPage } from '../pages/CommunityPolicyPage';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.ACCUSHIELD_EMAIL!,
        process.env.ACCUSHIELD_PASSWORD!
    );
});

test('Add Community policy', async ({ page }) => {

    const communityPolicyPage = new CommunityPolicyPage(page);
    const uniqueId = Date.now();
    const policyName = `Automation Policy ${uniqueId}`;


    await communityPolicyPage.selectCommunity(
        'Alert Comm Pallavi'
    );

    await page.waitForTimeout(5000);

    await communityPolicyPage.openSettings();

    await communityPolicyPage.openCommunityPolicies();

    await page.waitForTimeout(5000);

    await communityPolicyPage.clickAdd();

    await communityPolicyPage.enterPolicyName(policyName);

    await communityPolicyPage.enterPolicyDescription(
        'This is an automation policy description'
    );

    await communityPolicyPage.selectAudience();

    await communityPolicyPage.enterPolicyMessage(
        'This is the policy message.'
    );

    await communityPolicyPage.enterResponse(
        'Yes'
    );

    await communityPolicyPage.savePolicy();
});