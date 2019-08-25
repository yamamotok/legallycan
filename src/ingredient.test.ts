import {Illegal} from './Illegal';
import {legally} from './index';
import {Legal} from './Legal';


/**
 * Candy flavor which can be packed legally.
 */
class BePacked extends Legal<string> {

  async check(): Promise<void> {
    const flavor = this.principal;
    if (flavor === 'Licorice') {
      throw new Illegal('Licorice flavor is prohibited');
    }
  }

}

describe('Filter out particular ingredients', () => {

  it('No licorice please, using check()', async (done) => {
    try {
      await legally('Licorice').can(BePacked).check();
    } catch (e) {
      done();
      return;
    }
    done('Error!');
  });

  it('No licorice please, using checkIf()', async () => {
    const res = await legally('Licorice').can(BePacked).checkIf();
    expect(res).toBeFalsy();
  });

  it('Filter out licorice', async () => {
    const flavors = ['Orange', 'Lemon', 'Miracle', 'Licorice'];
    const removed = Symbol();
    const tmp: Array<string | symbol> = await Promise.all(
      flavors.map(async (f) => await legally(f).can(BePacked).checkIf() ? f : removed)
    );
    const result = tmp.filter(item => item !== removed);
    expect(result.indexOf('Licorice')).toBeLessThan(0);
  });

});
