const shopAPI = 'https://zydc-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_1'
const dataAPI = 'https://zydc-001.dx.commercecloud.salesforce.com/s/RefArch/dw/data/v23_1'
const headers = {'content-type': 'application/json'}
const proxy = 'https://corsproxy.io/?';
const authEndPoint = 'https://zydc-001.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_1/customers/auth?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const clientID = 'client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

export { shopAPI, dataAPI, headers, clientID, proxy, authEndPoint }