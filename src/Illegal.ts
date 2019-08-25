/**
 * Runtime error which will be thrown when something illegal was found.
 */
export class Illegal extends Error {

  /**
   * Constructor.
   *
   * @param message error message
   */
  constructor(message: string) {
    super(message);
  }

}
