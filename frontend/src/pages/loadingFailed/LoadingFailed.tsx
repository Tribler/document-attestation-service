import { Component, h } from 'preact';

/**
 * Loading failure page.
 */
export default class LoadingFailed extends Component<{}, {}> {
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
        <h1>Oh no!</h1>
        <p>
          The page failed to load! Please check you connection and try again.
        </p>
      </div>
    );
  }
}
