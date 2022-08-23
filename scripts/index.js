'use strict';

/* outputs */
const g_emptyUrlMessages = 'Please input a valid URL above';

/* fetch dom elements */
const xumoInputUrl = document.getElementById('xumourl');
const outputUrl = document.getElementById('outputUrl');

/* set input handler, no submit button!  */
xumoInputUrl.addEventListener('input', inputHandler);
xumoInputUrl.addEventListener('propertychange', inputHandler); // for IE8

/** select the mandatory params out of all params */
function getMandatoryStaticParams(originalParamList) {
  const originalUrlParams = new URLSearchParams(originalParamList);
  let minUrlParams = new URLSearchParams();
  const mandatoryParams = [
    'ads.caid',
    'ads.csid',
    'ads._fw_content_category',
    'ads._fw_content_genre',
    'ads._fw_content_language',
    'ads._fw_content_rating',
    'ads.xumo_contentId',
    'ads.xumo_contentName',
    'ads.xumo_providerId',
    'ads.xumo_providerName',
  ];
  mandatoryParams.forEach((param, i) => {
    if (!originalUrlParams.has(param)) {
      throw new Error('Mandantory param not found:' + param);
    }
    minUrlParams.append(param, originalUrlParams.get(param));
  });
  console.log('[getMandatoryStaticParams] query:', minUrlParams.toString());
  return minUrlParams.toString();
}

/** break down url by parts*/
function parseUrl(xumoUrl) {
  const url = new URL(xumoUrl);
  //const paramss = new URLSearchParams(url.search);
  //   const origin = url.origin;
  // console.log('origin:', origin);
  // origin: https://d39g1vxj2ef6in.cloudfront.net

  const protocol = url.protocol;
  const hostName = url.host;
  const pathName = url.pathname;
  const params = url.searchParams;

  const finalParams = getMandatoryStaticParams(params);

  const finalUrl = protocol + '//' + hostName + pathName + '?' + finalParams;

  return finalUrl;
}

function inputHandler(e) {
  try {
    const inputUrl = e.target.value;
    if (!inputUrl) {
      outputUrl.value = g_emptyUrlMessages;
      return;
    }

    const finalUrl = parseUrl(e.target.value);
    outputUrl.value = finalUrl;
  } catch (Error) {
    outputUrl.value = 'Error:' + Error.toString();
  }
}

/* @TODO 
// validate url
// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

*/
