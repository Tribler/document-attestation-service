import { Component, h } from 'preact';

import { Injector } from '../../controllers';
import { PeerController } from '../../controllers/PeerController';

/**
 * Peers page.
 *
 * This lists all the pears the user is connected to.
 */
export default class Peers extends Component<{}, IState> {
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
      <div>
        <h2>Peers</h2>
        <p>This should show all your peers, but they are not here yet.</p>
      </div>
    );
  }

  /**
   * Component mount event.
   *
   * Called by Preact.
   */
  public componentWillMount() {
    this.timerId = setInterval(() => this.fetchPeers(), 500);
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
   * Fetch the peers of this peer.
   */
  private async fetchPeers(): Promise<void> {
    const ctr = await Injector.get<PeerController>('PeerController');
    const req = await fetch(`${ctr.currentPeer}/attestation?type=peers`);
    const json = await req.json();

    this.setState({ peers: json });
  }
}

interface IState {
  /**
   * A list of all peers.
   */
  peers: string[];
}
