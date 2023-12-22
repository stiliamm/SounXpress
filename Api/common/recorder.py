import pyaudio
import threading
from common.driver import AudioDriver
import wave
import os


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
        self.frames: list = []
        self.recording: bool = False
        self._recording_thread = None

    def _recording_loop(self):
        while self.recording:
            try:
                data = self.stream.read(self.chunk)
                self.frames.append(data)
            except IOError as e:
                print(f"Error recording: {e}")

    def start_recording(self):
        self.frames = []
        self.recording = True
        self._recording_thread = threading.Thread(target=self._recording_loop)
        self._recording_thread.start()

    def stop_recording(self):
        if self._recording_thread and self._recording_thread.is_alive():
            self.recording = False
            self._recording_thread.join()

    def play_recording(self):
        if not self.frames:
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
        finally:
            playback.stop_stream()
            playback.close()
            playback_port.terminate()

    def save_recording(self, username: str, file_name: str):
        if not self.frames:
            return

        _SAVE_PATH = f'./static/recordings/{username}_{file_name}.wav'
        with wave.open(_SAVE_PATH, 'wb') as wf:
            wf.setnchannels(self.channels)
            wf.setsampwidth(self.port.get_sample_size(self.format))
            wf.setframerate(self.rate)
            wf.writeframes(b''.join(self.frames))

        self.frames = []
