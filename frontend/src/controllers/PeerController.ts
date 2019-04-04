import { observable } from 'gweld';

export class PeerController {
  /**
   * Current index of the peers.
   */
  @observable
  public currentPeer: string;
  /**
   * A list of all discovered peers.
   */
  @observable
  public readonly peers: string[];

  /**
   * Create the controller.
   */
  constructor() {
    this.peers = ['http://localhost:14411'];
    this.currentPeer = this.peers[0];
  }

  /**
   * Add a newly discovered peer.
   * @param peer The peer to add.
   */
  public add(peer: string) {
    this.peers.push(peer);
  }
}
