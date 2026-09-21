import { Page } from '@playwright/test';

export class BasePage {

    protected baseURL = 'https://qa.accushield.com/';

    constructor(protected page: Page) {}
}