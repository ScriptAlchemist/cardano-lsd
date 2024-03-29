/**
 * @jest-environment jsdom
 */
import { CardaNostraAdaSpinner } from ".."
const spinner = new CardaNostraAdaSpinner({id:"cardano-first-animation",color:"blue",delay:0.3,duration:4});
const spinnerOnlySetId = new CardaNostraAdaSpinner({id:"set-id-only"});
const spinnerOnlySetColor = new CardaNostraAdaSpinner({id:"set-id-only",color:"pink"});
const spinnerOnlySetDelay = new CardaNostraAdaSpinner({id:"set-id-only", delay:1});
const spinnerOnlySetDuration = new CardaNostraAdaSpinner({id:"set-id-only", duration:2});
test('Test get htmlId', () => {
  expect(spinner.htmlId).toEqual("cardano-first-animation");
});

//must test for adding all of the ithems 

test('Test for only set Id', () => {
  expect(spinnerOnlySetId.htmlId).toEqual("set-id-only");
  expect(spinnerOnlySetId.color).not.toBeUndefined();
  expect(spinnerOnlySetId.delay).not.toBeUndefined();
  expect(spinnerOnlySetId.duration).not.toBeUndefined();
});

test('Test for only set color', () => {
  expect(spinnerOnlySetColor.htmlId).not.toBeUndefined();
  expect(spinnerOnlySetColor.color).toEqual("pink");
  expect(spinnerOnlySetColor.delay).not.toBeUndefined();
  expect(spinnerOnlySetColor.duration).not.toBeUndefined();
});

test('Test for only set delay', () => {
  expect(spinnerOnlySetDelay.htmlId).not.toBeUndefined();
  expect(spinnerOnlySetDelay.color).not.toBeUndefined();
  expect(spinnerOnlySetDelay.delay).toEqual(1);
  expect(spinnerOnlySetDelay.duration).not.toBeUndefined();
});

test('Test for only set duration', () => {
  expect(spinnerOnlySetDuration.htmlId).not.toBeUndefined();
  expect(spinnerOnlySetDuration.color).not.toBeUndefined();
  expect(spinnerOnlySetDuration.delay).not.toBeUndefined();
  expect(spinnerOnlySetDuration.duration).toEqual(2);
});

test('Test set htmlId', () => {
  spinner.htmlId = "changedHtmlId";
  expect(spinner.htmlId).toEqual("changedHtmlId");
});

test('Test get color', () => {
  expect(spinner.color).toEqual("blue");
});

test('Test set color', () => {
  spinner.color = "pink";
  expect(spinner.color).toEqual("pink");
});

test('Test get delay', () => {
  expect(spinner.delay).toEqual(0.3);
});

test('Test set delay', () => {
  spinner.delay = 0;
  expect(spinner.delay).toEqual(0);
});

test('Test get duration', () => {
  expect(spinner.duration).toEqual(4);
});

test('Test set duration', () => {
  spinner.duration = 2;
  expect(spinner.duration).toEqual(2);
});

test('{Error} trying to attach to wrong element.Id', async() => {
  const element = document.createElement('div');
  element.id = "cardano-first-animation";
  element.style.position = "absolute";
  element.style.top = "0";
  element.style.left = "0";
  element.style.width = "100%";
  element.style.height = "100%";
  document.body.appendChild(element);
  const didDivAppend = document.getElementById("cardano-first-animation");
  expect(didDivAppend).not.toBeNull();
  const spinnerError = await spinner.attachSVG().catch(err => err.message);
  expect(spinnerError).toBe("Initiated Container Id Incorrect");
});

test('Attach Wrapper To Browser', () => {
  const element = document.createElement('div');
  element.id = "changedHtmlId";
  element.style.position = "absolute";
  element.style.top = "0";
  element.style.left = "0";
  element.style.width = "100%";
  element.style.height = "100%";
  document.body.appendChild(element);
  const didDivAppend = document.getElementById("changedHtmlId");
  expect(didDivAppend).not.toBeNull();
});

test('Ada Spinner Added', async() => {
  await spinner.attachSVG()
  const isWrapped = document.getElementById("carda-nostra-svg");
  expect(isWrapped).not.toBeNull();
});
