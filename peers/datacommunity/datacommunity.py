from __future__ import print_function
from __future__ import division
from __future__ import unicode_literals
from __future__ import with_statement
from __future__ import absolute_import
from __future__ import generators
from __future__ import nested_scopes


from pyipv8.ipv8.community import Community
from pyipv8.ipv8.peer import Peer
from pyipv8.ipv8.keyvault.crypto import ECCrypto
from pyipv8.ipv8.messaging.lazy_payload import VariablePayload
from pyipv8.ipv8.lazy_community import lazy_wrapper
from pyipv8.ipv8 import configuration

from pyipv8 import ipv8_service


class DataPayload(VariablePayload):
    format_list = ['raw']
    names = ['utp']


class DataCommunity(Community):

    master_peer = Peer(ECCrypto().generate_key(u"medium"))

    def __init__(self, *args, **kwargs):
        super(DataCommunity, self).__init__(*args, **kwargs)

        self.decode_map = {
            chr(234): self.on_message,
        }

    @lazy_wrapper(DataPayload)
    def on_message(self, source_address, payload):
        print("message", source_address, payload)
        pass

    def send_file(self, filename, filetype, data):
        pass
