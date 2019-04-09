import { Component, h } from 'preact';

/**
 * Loading page.
 */
export default class Loading extends Component<{}, {}> {
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
        <h2>Loading..</h2>
        <p>Please wait for the page to load.</p>
      </div>
    );
  }
}
