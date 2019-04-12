import { Component, h } from 'preact';

import { Injector } from '../../controllers';
import { PeerController } from '../../controllers/PeerController';

/**
 * Outstanding requests page.
 *
 * This lists all the outstanding requests the peer knows about.
 */
export default class Outstanding extends Component<{}, IState> {
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
        <h2>Outstanding requests</h2>
        <h3>A list of all outstanding requests known by the peer.</h3>
        <table>
          <tr class="header">
            <th>#</th>
            <th>Attribute Name</th>
            <th>Requested By</th>
            <th>Actions</th>
          </tr>
          {this.state.outstanding.map((outstanding, index, arr) => (
            <tr>
              <td>
                {index + 1}/{arr.length}
              </td>
              <td>{outstanding[1]}</td>
              <td>{outstanding[0]}</td>
              <td>
                <button
                  title="Attest to this request"
                  value={JSON.stringify(outstanding)}
                  class="icon"
                  onClick={e => this.attest((e as any).target.value)}
                >
                  &#9889;
                </button>
              </td>
            </tr>
          ))}
          {this.state.outstanding.length === 0 && (
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
    this.timerId = setInterval(() => this.fetchOutstanding(), 500);

    this.setState({
      outstanding: [],
    });

    this.fetchOutstanding();
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
   * Fetch the outstanding attributes.
   */
  private async fetchOutstanding(): Promise<void> {
    const ctr = await Injector.get<PeerController>('PeerController');
    const req = await fetch(`${ctr.currentPeer}/attestation?type=outstanding`);
    const json = await req.json();

    this.setState({ outstanding: json });
  }

  /**
   * Attest to a request.
   * @param request The request to sign.
   */
  private async attest(request: string): Promise<void> {
    request = JSON.parse(request);
    let value = prompt('What is the value of this attribute?');

    value = encodeURIComponent(btoa(value || 'default'));
    const peer = encodeURIComponent(request[0]);
    const name = encodeURIComponent(request[1]);
    const params = `mid=${peer}&attribute_name=${name}&attribute_value=${value}`;

    const ctr = await Injector.get<PeerController>('PeerController');
    await fetch(`${ctr.currentPeer}/attestation?type=attest&${params}`, {
      method: 'POST',
    });
  }
}

interface IState {
  /**
   * A list of all attributes.
   */
  outstanding: string[][];
}
