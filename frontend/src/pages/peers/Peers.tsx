import { Component, h } from 'preact';

/**
 * Peers page.
 *
 * This lists all the pears the user is connected to.
 */
export default class Peers extends Component<{}, {}> {
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
        <h2>Peers</h2>
        <p>This should show all your peers, but they are not here yet.</p>
      </div>
    );
  }
}
