import { Component, h } from 'preact';

/**
 * Page not found page.
 */
export default class NotFound extends Component<{}, {}> {
  /**
   * Render the component.
   *
   * Called by Preact.
   *
   * @return The element to render.
   */
  public render(): JSX.Element {
    return (
      <div>
        <h2>404</h2>
        <p>It looks like you're lost...</p>
      </div>
    );
  }
}
