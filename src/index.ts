import {LegalCheck} from './LegalCheck';


/**
 * This `legally` is a factory which create a new {@link Legal} instance.
 *
 * @param principal the principal
 */
export function legally<T>(principal: T) {
  return new LegalCheck<T>(principal);
}
