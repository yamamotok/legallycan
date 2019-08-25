import {Illegal} from './Illegal';
import {legally} from './index';
import {Legal} from './Legal';

class User {
  readonly name: string;
  readonly isAdmin: boolean;

  constructor(name: string, isAdmin: boolean) {
    this.name = name;
    this.isAdmin = isAdmin;
  }

  equals(target: User): boolean {
    return this.name === target.name;
  }
}

class ViewProfile extends Legal<User> {

  async check(): Promise<void> {
    const target = this.options.of as User;
    if (!target || !(target instanceof User)) {
      throw new Illegal('No target');
    }
    if (this.principal.equals(target)) {
      return;  // User can view his own profile.
    }
    if (this.principal.isAdmin) {
      return;  // Administrator can do anything.
    }
    throw new Illegal('Prohibited');
  }

}


const adminUser = new User('Admin', true);
const normalUserA = new User('User A', false);
const normalUserB = new User('User B', false);

describe('Authorization test', () => {

  it('A user can view profile of himself', async (done) => {
    try {
      await legally(normalUserA).can(ViewProfile).of(normalUserA).check();
      done();
    } catch (e) {
      done(e);
    }
  });

  it('Administrator can view anything', async (done) => {
    try {
      await legally(adminUser).can(ViewProfile).of(normalUserA).check();
      await legally(adminUser).can(ViewProfile).of(normalUserB).check();
      done();
    } catch (e) {
      done(e);
    }
  });

  it('A normal user cannot view any profile of others', async (done) => {
    try {
      await legally(normalUserA).can(ViewProfile).of(normalUserB).check();
      done('Supposed user A cannot view profile of user B');
    } catch (e) {
      done();
    }
    try {
      await legally(normalUserB).can(ViewProfile).of(normalUserA).check();
      done('Supposed user A cannot view profile of user B');
    } catch (e) {
      done();
    }
  });

});
