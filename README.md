# legallycan

A utility for implementing behavior-based authorization logic.

## Basic usage

```typescript
import {legally} from 'legallycan';

legally(subject).can(DoSomething).check()
  .then(() => {
    // subject can do something.
  })
  .catch(err => {
    // subject cannot do something.
  });
```

## Examples (in TypeScript)

### Authorization

```typescript
// User class
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

// A legal
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


// No error, because a user can view profile of himself
await legally(normalUserA).can(ViewProfile).of(normalUserA).check()

// Error, because a user cannot view any profile of others
await legally(normalUserA).can(ViewProfile).of(normalUserB).check()

// No error, because administrator can view anything
await legally(adminUser).can(ViewProfile).of(normalUserA).check()
```

## License

MIT  
(c) Keisuke Yamamoto 2019  
