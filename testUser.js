require("dotenv").config();

import { ClientFunction, Selector } from 'testcafe';

const origin = 'https://lenken.andela.com';
const getLocation = ClientFunction(() => document.location.href); 

fixture `Lenken Test Suite (${origin})`
  .page`${origin}`
  .beforeEach(async t => {
    await t.resizeWindow(1200, 730);
  })

const LENKEN_USERNAME = process.env.LENKEN_USERNAME;
const LENKEN_PASSWORD = process.env.LENKEN_PASSWORD;

const login = (t, username, password) => {
  return t
    .wait(500)
    .click(Selector("#wrapper > div > a > img"))
    .typeText(Selector("#identifierId"), username, { replace: true })
    .click(Selector("#identifierNext > content > span"))
    .typeText('input[type="password"]', password, { replace: true })
    .click(Selector("#passwordNext > content > span"))
    .wait(10000);
};

test('test_1 Request mentor', async t => {
/**
   * Test Description:
   * The user accesses the google search page to search on content as per the specified key word.
   *
   *  */
  await login(t, LENKEN_USERNAME, LENKEN_PASSWORD);

  await t.expect(getLocation()).contains("/request-pool");

  await t
    // Test user being able to request for a mentor
    .click(Selector("#request-button"))
    .click(Selector("#mentor"))
    .click(Selector("#undefined > ul > li > button"))
    .click(Selector('a').withText('GraphQL'))
    .typeText(Selector("#description"), 'Test description', { replace: true })
    .click(Selector("body > app-root > app-create-or-update-request > div > div > div > form > div.form-group.duration > div > span.inline-block > span > span:nth-child(2) > label"))
    .click(Selector('#btn-request'))
    .expect(Selector('body > app-root > app-alert > div > app-confirmation-alert > div > div.alert').exists).ok()

  await t
    // Test confirmation modal
    .click(Selector('body > app-root > app-alert > div > app-confirmation-alert > div > div.alert > div.footer > div > button.blue-button'))
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(2)').innerText).contains('Requested by')
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(3)').innerText).contains('Complementary Skills')
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(4)').innerText).contains('Preffered Location')
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(5)').innerText).contains('Proposed Duration')

    // Test edit details
    .click(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > div > div > input[type="submit"]:nth-child(2)'))
    .typeText(Selector("#description"), 'New description', { replace: true })
    .click(Selector('#btn-request'))
    .expect(Selector('body > app-root > app-alert > div > app-message-alert > div.alert').exists).ok()
    .click(Selector('#close-button'))

    // Test filter details
    .click(Selector('#side-grid > form > div:nth-child(1) > div > div:nth-child(1) > label'))
    .click(Selector('#side-grid > form > div:nth-child(2) > div.checkbox-div.mentor'))
    .click(Selector('#request-pool:nth-child(1)'))

    // Test delete user request
    .click(Selector('body > app-root > app-request-details > div.request-modal > div.modal-heading > input'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.dropdown > div > div.picker'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.dropdown > div > div.dropdown-content > a:nth-child(2)'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.cancel-options > div.button.cancel-button'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.cancel-options > div.button.cancel-button'))
    .expect(Selector('#section-grid > app-pool-records > app-no-result > div > div.no-result-tag-line').innerText).contains('Try something different');
});

test('test_2 Request mentee', async t => {
  /**
     * Test Description:
     * The user accesses the google search page to search on content as per the specified key word.
     *
     *  */
  await login(t, LENKEN_USERNAME, LENKEN_PASSWORD);

  await t.expect(getLocation()).contains("/request-pool");

  await t
    // Test user being able to request for a mentor
    .click(Selector("#request-button"))
    .click(Selector("#mentee"))
    .click(Selector("#undefined > ul > li > button"))
    .click(Selector('a').withText('GraphQL'))
    .typeText(Selector("#description"), 'Test description', { replace: true })
    .click(Selector("body > app-root > app-create-or-update-request > div > div > div > form > div.form-group.duration > div > span.inline-block > span > span:nth-child(2) > label"))
    .click(Selector('#btn-request'))
    .expect(Selector('body > app-root > app-alert > div > app-confirmation-alert > div > div.alert').exists).ok()

  await t
    // Test confirmation modal
    .click(Selector('body > app-root > app-alert > div > app-confirmation-alert > div > div.alert > div.footer > div > button.blue-button'))
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(2)').innerText).contains('Requested by')
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(3)').innerText).contains('Pre-requisite Skills')
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(4)').innerText).contains('Preffered Location')
    .expect(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > p:nth-child(5)').innerText).contains('Proposed Duration')

    // Test edit details
    .click(Selector('body > app-root > app-request-details > div.request-modal > div.request-body > div > div > input[type="submit"]:nth-child(2)'))
    .typeText(Selector("#description"), 'New description', { replace: true })
    .click(Selector('#btn-request'))
    .expect(Selector('body > app-root > app-alert > div > app-message-alert > div.alert').exists).ok()
    .click(Selector('#close-button'))

    // Test filter details
    .click(Selector('#side-grid > form > div:nth-child(1) > div > div:nth-child(1) > label'))
    .click(Selector('#side-grid > form > div:nth-child(2) > div.checkbox-div.mentee'))
    .click(Selector('#request-pool:nth-child(1)'))

    // Test delete user request
    .click(Selector('body > app-root > app-request-details > div.request-modal > div.modal-heading > input'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.dropdown > div > div.picker'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.dropdown > div > div.dropdown-content > a:nth-child(2)'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.cancel-options > div.button.cancel-button'))
    .click(Selector('body > app-root > app-request-details > div.request-modal > app-cancel-request-modal > div > div > div > div > div.cancel-options > div.button.cancel-button'))
    .expect(Selector('#section-grid > app-pool-records > app-no-result > div > div.no-result-tag-line').innerText).contains('Try something different');
});