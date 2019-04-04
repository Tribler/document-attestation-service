from base64 import b64encode
import multiprocessing as mp

import SocketServer
import SimpleHTTPServer
import atexit
import os

from twisted.internet import reactor

from ipv8.configuration import get_default_configuration
from ipv8.REST.rest_manager import RESTManager
from ipv8_service import IPv8

PORT = 8000
URL = 'localhost:{port}'.format(port=PORT)



# Launch two IPv8 services.
# We run REST endpoints for these services on:
#  - http://localhost:14411/
#  - http://localhost:14412/
# This script also prints the peer ids for reference with:
#  - http://localhost:1441*/attestation?type=peers
for i in [1, 2]:
    configuration = get_default_configuration()
    configuration['logger']['level'] = "ERROR"
    configuration['keys'] = [
        {'alias': "anonymous id", 'generation': u"curve25519", 'file': u"ec%d_multichain.pem" % i},
        {'alias': "my peer", 'generation': u"medium", 'file': u"ec%d.pem" % i}
    ]

    # Only load the basic communities
    requested_overlays = ['DiscoveryCommunity', 'AttestationCommunity', 'IdentityCommunity']
    configuration['overlays'] = [o for o in configuration['overlays'] if o['class'] in requested_overlays]

    # Give each peer a separate working directory
    working_directory_overlays = ['AttestationCommunity', 'IdentityCommunity']
    for overlay in configuration['overlays']:
        if overlay['class'] in working_directory_overlays:
            overlay['initialize'] = {'working_directory': 'state_%d' % i}

    # Start the IPv8 service
    ipv8 = IPv8(configuration)
    rest_manager = RESTManager(ipv8)
    rest_manager.start(14410 + i)

    # Print the peer for reference
    print "Starting peer", b64encode(ipv8.keys["anonymous id"].mid)




Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.webapp': 'application/x-web-app-manifest+json',
});
os.chdir(os.path.join(os.path.dirname(__file__),'frontend', "dist"))

httpd = SocketServer.TCPServer(("", PORT), Handler)
print "Serving at port", PORT

server_process = mp.Process(target=httpd.serve_forever)
server_process.daemon = True
server_process.start()

reactor.run()



@atexit.register
def onexit():
    server_process.terminate()