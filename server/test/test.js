var assert = require('assert');
const serviceManager = require('../service/ServiceManager.js');
var carparkApi = require('../api/CarparkApi')

describe("Qashier Unit Test", function() {
    before(function(done) {
        serviceManager.sqlInterface.ConnectDB();
        done()
    }); 
    describe('Creating Carpark Test Scenarios', function() {
        it('List carpark should pass', async function() {
            try {
                carparkApi.ListCarpark((res,err) => {
                    assert.strictEqual(err, null)
                })
            } catch (err) {
                assert.fail("List carpark unit test should pass")
            }
        })
    });
    after((done) => {
        if (serviceManager.sqlInterface.pool != undefined ) {
        serviceManager.sqlInterface.pool.end()
        serviceManager.sqlInterface.pool = undefined
        }
        done()
    })
})
