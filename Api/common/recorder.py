import pyaudio
import threading
from common.driver import AudioDriver


    
class Recorder(AudioDriver):
    """
    Record audio in MONO | format 16bit\n
    Initializes PortAudio stream object for data recording.\n
    Methods:
    - start_recording() - initialize thread for audio recording and start the loop
    - stop_recording() - terminate port audio I/O & stop thread
    """

    def __init__(self) -> None:
        super().__init__()

        self.port = pyaudio.PyAudio()
        self.stream = self.port.open(
            format=self.format,
            channels=self.channels,
            rate=self.rate,
            input=True,
            frames_per_buffer=self.chunk
        )
        self.frames = []
        self.recording = False
        self._recording_thread = None

    
    def _recording_loop(self):
        while self.recording:
            data = self.stream.read(self.chunk)    
            self.frames.append(data)
        
    
    def start_recording(self):
        self.frames = []
        self.recording = True
        self._recording_thread = threading.Thread(target=self._recording_loop)
        self._recording_thread.start()
        print('Recording...')

    
    def stop_recording(self):
        if self._recording_thread and self._recording_thread.is_alive():
            self.recording = False
            self.stream.start_stream()
            self.stream.close()
            self.port.terminate()
            self._recording_thread.join()
            print('Stopping...')

    
    def play_recording(self):
        if not self.frames:
            print('No recorded audio')
            return
        
        playback_port = pyaudio.PyAudio()
        try:
            playback = playback_port.open(
                format=self.format,
                channels=self.channels,
                rate=self.rate,
                output=True
            )

            for data in self.frames:
                playback.write(data)
            
            print('Playback complete')
        finally:
            playback.stop_stream()
            playback.close()
            playback_port.terminate()