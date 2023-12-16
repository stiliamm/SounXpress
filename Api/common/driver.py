import pyaudio



class AudioDriver:
    """
    General class defining audio parameters\n
    Properties:
    - chunk: int 128/2048
    - format: default 16bit
    - channels: mono (1)
    - rate: 44100, 48000 kHZ
    """
    
    def __init__(self):
        self._chunk = 2048
        self._format = pyaudio.paInt16
        self._channels = 1
        self._rate = 48000

    @property
    def chunk(self):
        return self._chunk

    @property
    def format(self):
        return self._format

    @property
    def channels(self):
        return self._channels

    @property
    def rate(self):
        return self._rate