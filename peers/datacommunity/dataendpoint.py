from pyipv8.ipv8.REST.base_endpoint import BaseEndpoint
from .datacommunity import DataCommunity
from base64 import b64decode, b64encode
import json
import cgi


class DataEndpoint(BaseEndpoint):

    def __init__(self, session):
        super(DataEndpoint, self).__init__()

        self.session = session

        data_overlays = [overlay for overlay in self.session.overlays if isinstance(
            overlay, DataCommunity)]
        if data_overlays:
            self.data_overlay = data_overlays[0]

    def get_peer_from_mid(self, mid_b64):
        """
        Find a peer by base64 encoded mid.
        """
        mid = b64decode(mid_b64)
        peers = self.session.network.verified_peers[:]
        matches = [p for p in peers if p.mid == mid]
        return matches[0] if matches else None

    def render_GET(self, request):
        return b""

    def render_POST(self, request):

        if not request.args or b'mid' not in request.args or not request.content:
            request.setResponseCode(400)
            return b""
        else:
            mid = request.args["mid"]
            headers = request.getAllHeaders()

            fileobj = cgi.FieldStorage(
                fp=request.content,
                headers=headers,
                environ={'REQUEST_METHOD': 'POST',
                         'CONTENT_TYPE': headers['content-type'],
                         }
            )
            # searches for the first key and uses it. multiple keys are ignored.
            fileobj = fileobj[fileobj.keys()[0]]

            # print(fileobj.type)
            # print(fileobj.filename)
            # print(fileobj.value)

            self.data_overlay.send_file(
                fileobj.filename, fileobj.type, fileobj.value)

            return b""
