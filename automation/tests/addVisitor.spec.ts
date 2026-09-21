import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { LoginPage } from '../pages/LoginPage';
import { VolunteerPage } from '../pages/VolunteerPage';

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

test("Add Volunteer Visitor", async ({ page }) => {

    const uniqueId = Date.now().toString().slice(-6);

    const firstName = `Mounika${uniqueId}`;
    const lastName = `Test${uniqueId}`;
    const phoneNumber = `9${uniqueId}123`;
    const email = `mounika${uniqueId}@example.com`;

    const volunteerPage = new VolunteerPage(page);

    await volunteerPage.selectCommunity('Alert Comm Pallavi');
    await volunteerPage.openAccounts();
    await volunteerPage.openVolunteer();

    await volunteerPage.clickAdd();

    await volunteerPage.enterDetails(
        firstName,
        lastName,
        phoneNumber,
        email
    );

    
    await volunteerPage.save();

    await volunteerPage.waitForVolunteerList();
});