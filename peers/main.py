from __future__ import print_function
from __future__ import division
from __future__ import unicode_literals
from __future__ import with_statement
from __future__ import absolute_import
from __future__ import generators
from __future__ import nested_scopes


import peers
import webserver

serv = webserver.startServer()
peers.startPeers()
