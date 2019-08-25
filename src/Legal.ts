import {Illegal} from './Illegal';


/**
 * Legal, which should be used for checking if something is legal.
 *
 * @param T type of principal
 */
export class Legal<T> {

  /**
   * Principal(subject).
   */
  protected readonly principal: T;

  /**
   * Options.
   */
  protected options: Record<any, any> = {};

  /**
   * Constructor.
   *
   * @param principal
   */
  constructor(principal: T) {
    this.principal = principal;
  }

  /**
   * Set options.
   *
   * @param opts options, which will be merged with options already set.
   */
  setOptions(opts: Record<any, any>) {
    Object.assign(this.options, opts);
  }

  /**
   * Check legality.
   * - In success case, resolved with empty result.
   * - In error case, rejected with some result which is usually Error instance.
   *
   * @return check result
   */
  async check(): Promise<void> {
    throw new Illegal('Legal#check() must be overridden');
  }

}

