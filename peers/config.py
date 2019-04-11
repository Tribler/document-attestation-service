from __future__ import print_function
from __future__ import division
from __future__ import unicode_literals
from __future__ import with_statement
from __future__ import absolute_import
from __future__ import generators
from __future__ import nested_scopes

import os
import json


class Config:
    PATH = os.path.dirname(os.path.abspath(__file__))
    SERVERPORT = 8000
    URL = 'localhost'
    NUMPEERS = 20
    PEERSSTARTPORT = 14410

    FOLDER = os.path.join(PATH,"..","frontend","dist")
