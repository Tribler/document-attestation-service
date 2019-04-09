export class Injector {
  /**
   * All loaded controllers.
   *
   * This makes sure when you request a controller it always returns the same thing.
   */
  private static controllers: { [name: string]: any } = {};

  /**
   * Get a controller.
   *
   * @param name The name of the controller, has to match the class name.
   * @return The controller requested in the parameter.
   */
  public static async get<T>(name: string): Promise<T> {
    if (!this.controllers[name]) {
      const module = await import(`./${name}`);
      this.controllers[name] = new module[name]() as T;
    }

    return this.controllers[name] as T;
  }
}
