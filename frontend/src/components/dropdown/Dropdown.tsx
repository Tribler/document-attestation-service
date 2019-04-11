import { Component, h } from 'preact';
import { observe } from 'gweld/preact';

import { Injector } from '../../controllers';
import { PeerController } from '../../controllers/PeerController';

@observe
export default class Dropdown extends Component<{}, {}> {
  private controller: PeerController;

  public async componentWillMount() {
    this.state = { localpeers: [] };
    Injector.get<PeerController>('PeerController').then(ctr => {
      this.controller = ctr;
      this.forceUpdate();
      this.fetchPeers(14411).catch(() => console.info('Discovered all nodes.'));
    });
  }

  public async fetchPeers(index) {
    const peer = 'http://localhost:' + index;
    await fetch(peer + '/attestation?type=peers');
    this.controller.add(peer);
    await this.fetchPeers(index + 1);
  }

  public render(): JSX.Element {
    return (
      this.controller && (
        <select
          id="dropdown"
          onChange={peer =>
            (this.controller.currentPeer = (peer as any).target.value)
          }
        >
          {this.controller.peers.map((peer, index) => (
            <option value={peer}>Peer {index + 1}</option>
          ))}
        </select>
      )
    );
  }
}
