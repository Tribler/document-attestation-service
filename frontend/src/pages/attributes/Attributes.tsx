import { Component, h } from 'preact';

import { Injector } from '../../controllers';
import { PeerController } from '../../controllers/PeerController';

/**
 * Attributes page.
 *
 * This lists all the attributes the peer knows about.
 */
export default class Attributes extends Component<{}, IState> {
  /**
   * ID of the interval timer.
   */
  private timerId: number;

  /**
   * Render the component.
   *
   * Called by Preact.
   *
   * @return The element to render.
   */
  public render(): JSX.Element {
    return (
      <section>
        <h2>Attributes</h2>
        <h3>A list of all attributes known by the peer.</h3>
        <table>
          <tr class="header">
            <th>#</th>
            <th>Name</th>
            <th>Attribute ID</th>
            <th>Other party</th>
          </tr>
          {this.state.attributes.map((attribute, index, arr) => (
            <tr>
              <td>
                {index + 1}/{arr.length}
              </td>
              <td>{attribute[0]}</td>
              <td>{attribute[1]}</td>
              <td>{attribute[3]}</td>
            </tr>
          ))}
          {this.state.attributes.length === 0 && (
            <tr>
              <td class="empty">-</td>
              <td class="empty">-</td>
              <td class="empty">-</td>
              <td class="empty">-</td>
            </tr>
          )}
        </table>
      </section>
    );
  }

  /**
   * Component mount event.
   *
   * Called by Preact.
   */
  public componentWillMount() {
    this.timerId = setInterval(() => this.fetchAttributes(), 500);

    this.setState({
      attributes: [],
    });

    this.fetchAttributes();
  }

  /**
   * Component unmount event.
   * This is used for cleaning up the timer.
   *
   * Called by Preact.
   */
  public componentWillUnmount() {
    clearInterval(this.timerId);
  }

  /**
   * Fetch the attributes.
   */
  private async fetchAttributes(): Promise<void> {
    const ctr = await Injector.get<PeerController>('PeerController');
    const req = await fetch(`${ctr.currentPeer}/attestation?type=attributes`);
    const json = await req.json();

    this.setState({ attributes: json });
  }
}

interface IState {
  /**
   * A list of all attributes.
   */
  attributes: string[][];
}
