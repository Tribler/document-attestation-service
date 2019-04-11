from __future__ import print_function
from __future__ import division
from __future__ import unicode_literals
from __future__ import with_statement
from __future__ import absolute_import
from __future__ import generators
from __future__ import nested_scopes

import multiprocessing as mp

import SocketServer
import SimpleHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import atexit
import os

from config import Config


class HTTPreqhandler(SimpleHTTPRequestHandler):
    # def send_response(self, *args, **kwargs):
    #     SimpleHTTPRequestHandler.send_response(self, *args, **kwargs)
    #     self.send_header('Access-Control-Allow-Origin', '*')
    pass


def startServer():
    # change to the serving directory
    os.chdir(Config.FOLDER)

    httpserver = SocketServer.TCPServer(
        (Config.URL, Config.SERVERPORT), 
        HTTPreqhandler
    )

    print("Serving at port {}".format(Config.SERVERPORT))

    server_process = mp.Process(target=httpserver.serve_forever)
    server_process.daemon = True
    server_process.start()


    @atexit.register
    def onexit():
        server_process.terminate()