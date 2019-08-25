import {Illegal} from './Illegal';
import {Legal} from './Legal';


/**
 * A class which is derived from `Legal`.
 *
 * @param T type of principal
 */
export type LegalClass<T extends Legal<any>> = new (principal: any, ...args: any[]) => T;


/**
 * LegalCheck, which enable you to know that `principal` can do something legally.
 *
 * @param T type of principal
 */
export class LegalCheck<T> {

  private readonly principal: T;
  private _legal: Legal<T> | undefined;

  /**
   * Constructor.
   *
   * @param principal the principal
   */
  constructor(principal: T) {
    this.principal = principal;
  }

  private get legal(): Legal<T> {
    if (!this._legal) {
      throw new Illegal('No legal was set');
    }
    return this._legal;
  }

  /**
   * Set a legal.
   *
   * @param legalCtor a class derived from {@link Legal}.
   */
  can<T_LEGAL extends Legal<T>>(legalCtor: LegalClass<T_LEGAL>) {
    this._legal = new legalCtor(this.principal);
    return this;
  }

  /**
   * Check legality.
   * In success case, resolved with empty result.
   * In error case, rejected with {@link Illegal}.
   *
   * @return promise
   */
  async check(): Promise<void> {
    try {
      await this.legal.check();
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Illegal(e);
    }
  }

  /**
   * Check legality.
   * In success case, resolved with {@code true}.
   * In error case, resolved with {@code false}.
   * (never rejected)
   *
   * @return promise
   */
  async checkIf(): Promise<boolean> {
    return await this.check().then(() => true).catch(reason => false);
  }

  /**
   * Set options.
   * @param options will be merged with option already set
   */
  set(options: Record<any, any>) {
    this.legal.setOptions(options);
    return this;
  }

  /**
   * Shorthand for {@code set({of: value}})}
   *
   * @param value
   */
  of(value: any) {
    return this.set({of: value});
  }

}