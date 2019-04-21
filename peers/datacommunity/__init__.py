
from .datacommunity import *
from . import dataendpoint
from pyipv8.ipv8.REST.root_endpoint import RootEndpoint

ipv8_service._COMMUNITIES.update({
    "DataCommunity":DataCommunity
})

configuration.default["overlays"].append({
    "class":"DataCommunity",
    'key': "anonymous id",
    'walkers': [{
        'strategy': "RandomWalk",
        'peers': 20,
        'init': {
            'timeout': 3.0
        }
    }],
    'initialize': {},
    'on_start': []
})


oldinit = RootEndpoint.__init__
def newinit(self,session):
    oldinit(self,session)
    self.putChild(b"data",dataendpoint.DataEndpoint(session))
    

RootEndpoint.__init__ = newinit


