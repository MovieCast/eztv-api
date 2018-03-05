const { expect } = require('chai');

const EztvAPI = require('../');

describe('EztvAPI', () => {
    let eztvApi;

    before(() => {
        eztvApi = new EztvAPI();
    });

    it('should get multiple torrents', done => {
        eztvApi.getTorrents({
            limit: 20,
            page: 1
        }).then(res => {
            expect(res).to.be.an('object');
            
            expect(res.torrents_count).to.be.a('number');
            expect(res.limit).to.equal(20);
            expect(res.page).to.equal(1);
            
            expect(res.torrents).to.be.a('array')
            expect(res.torrents.length).to.be.at.least(1)

            const random = Math.floor(Math.random() * res.torrents.length);
            expect(res.torrents[random]).to.be.an('object');

            done()
        }).catch(done)
    });

    it('should throw an error while getting torrents', () => {
        expect(eztvApi.getTorrents.bind(eztvApi, {
            limit: -1
        })).to.throw('-1 is not a valid value for limit, expected a number in the range of 1 - 100!')
        expect(eztvApi.getTorrents.bind(eztvApi, {
            limit: 101
        })).to.throw('101 is not a valid value for limit, expected a number in the range of 1 - 100!')
        expect(eztvApi.getTorrents.bind(eztvApi, {
            limit: "notanumber"
        })).to.throw('notanumber is not a valid value for limit, expected a number in the range of 1 - 100!')
        expect(eztvApi.getTorrents.bind(eztvApi, {
            page: -1
        })).to.throw('-1 is not a valid value for page, expected a number greater then 0!')
        expect(eztvApi.getTorrents.bind(eztvApi, {
            page: "notanumber"
        })).to.throw('notanumber is not a valid value for page, expected a number greater then 0!')
    });
});