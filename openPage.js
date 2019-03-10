import { ClientFunction, Selector } from 'testcafe';

const origin = "https://google.com";
const searchText = 'andela';
const getLocation = ClientFunction(() => document.location.href); 

fixture `Google Test Suite (${origin})`
  .page`${origin}`

test('test_1 Find search text content', async t => {
/**
   * Test Description:
   * The user accesses the google search page to search on content as per the specified key word.
   *
   *  */
  await t
    .click(Selector('#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input'))
    .typeText(Selector('#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input'), searchText, { replace: true })
    .click(Selector('#tsf > div:nth-child(2) > div > div.UUbT9 > div.aajZCb > ul > li:nth-child(1) > div > div.sbtc > div'))
    .expect(getLocation()).contains('/search?')
    .expect(Selector('#rhs_block > div:nth-child(3) > div.kp-blk.knowledge-panel.Wnoohf.OJXvsb > div > div.ifM9O > div:nth-child(2) > div.kp-header > div > div.DI6Ufb > div > div > div.SPZz6b > div.kno-ecr-pt.kno-fb-ctx.gsmt').innerText).eql('Andela');
});