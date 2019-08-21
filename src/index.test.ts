import legally from './index';

describe('test index', () => {

  it('use legally', () => {
    const res = legally('tester');
    expect(res).toBeTruthy();
  });

});
