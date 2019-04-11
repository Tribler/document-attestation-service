import { Component, h } from 'preact';
import { observe } from 'gweld/preact';

import { Injector } from '../../controllers';
import { PeerController } from '../../controllers/PeerController';

@observe
export default class Dropdown extends Component<{}, {}> {
  private controller: PeerController;

  constructor(props) {
    super(props);
  }

  public async componentWillMount() {
    this.state = { localpeers: [] };
    Injector.get<PeerController>('PeerController').then(ctr => {
      this.controller = ctr;
      this.forceUpdate();
      this.fetchPeers(2);
    });
  }

  public async fetchPeers(index) {
    try {
      const peer = 'http://localhost:1441' + index;
      await fetch(peer + '/attestation?type=peers');
      console.log(this.controller);
      this.controller.add(peer);
      console.log(this.controller.peers.length);
      await this.fetchPeers(index + 1);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  public render(): JSX.Element {
    return (
      this.controller && (
        <select
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
