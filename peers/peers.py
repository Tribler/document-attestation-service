from __future__ import print_function
from __future__ import division
from __future__ import unicode_literals
from __future__ import with_statement
from __future__ import absolute_import
from __future__ import generators
from __future__ import nested_scopes

from base64 import b64encode
from twisted.internet import reactor
from ipv8.configuration import get_default_configuration
from ipv8.REST.rest_manager import RESTManager
from ipv8_service import IPv8
from config import Config

def startPeer(peerid):
    configuration = get_default_configuration()
    configuration['logger']['level'] = "ERROR"
    configuration['keys'] = [
        {'alias': "anonymous id", 'generation': u"curve25519", 'file': u"ec{}_multichain.pem".format(peerid)},
        {'alias': "my peer", 'generation': u"medium", 'file': u"ec{}.pem".format(peerid)}
    ]

    # Only load the basic communities
    requested_overlays = [
        'DiscoveryCommunity', 
        'AttestationCommunity', 
        'IdentityCommunity'
    ]
    configuration['overlays'] = [
        o 
        for o in configuration['overlays']
        if o['class'] in requested_overlays
    ]

    # Give each peer a separate working directory
    working_directory_overlays = [
        'AttestationCommunity', 
        'IdentityCommunity'
    ]
    for overlay in configuration['overlays']:
        if overlay['class'] in working_directory_overlays:
            overlay['initialize'] = {'working_directory': 'state_{}'.format(peerid)}

    # Start the IPv8 service
    ipv8 = IPv8(configuration)
    rest_manager = RESTManager(ipv8)

    rest_manager.start(Config.PEERSSTARTPORT + peerid)

    # this function takes twisted render_[GET,POST] function and returns a replacement function which injects a CORS header
    def injectCORS(func):
        def inner(request):
            request.setHeader('Access-Control-Allow-Origin', '*')
            return func(request)
        return inner

    #searches recursively for all resources and applies injectCORS on it
    def recursiveFinder(entities):
        for i in entities:
            if hasattr(i[1],"listEntries"):
                for j in i[1].listEntities():
                    recursiveFinder(j)


            if hasattr(i[1], "render_GET"):
                i[1].render_GET = injectCORS(i[1].render_GET)


            if hasattr(i[1], "render_POST"):
                i[1].render_POST = injectCORS(i[1].render_POST)

    recursiveFinder(rest_manager.root_endpoint.listEntities())


    # Print the peer for reference
    print("Starting peer {} running on {}:{}".format(
        b64encode(ipv8.keys["anonymous id"].mid),
        Config.URL,
        Config.PEERSSTARTPORT + peerid
    ))



def startPeers(peers=Config.NUMPEERS):
    for peerid in range(1,peers+1):
        startPeer(peerid)


    reactor.run()
