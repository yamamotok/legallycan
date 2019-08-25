import {legally} from './index';
import {Legal} from './Legal';


describe('Test general cases', () => {

  it('Irregular case, user `Legal` directly without inheritance',async (done) => {
    try {
      await legally('something').can(Legal).check();
      done('Error was expected but not thrown');
    } catch (e) {
      done();
    }
  });

  it('Irregular case, forgot to call `can()`',async (done) => {
    try {
      await legally('something').check();
      done('Error was expected but not thrown');
    } catch (e) {
      done();
    }
  });

});
