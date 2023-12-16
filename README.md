Audio Recorder App

The Audio Recorder App is a simple Python application that allows users to record audio in MONO format with 16-bit quality. It leverages the PyAudio library for audio input and output and provides a graphical user interface built with Tkinter for easy interaction.
Features

    Start and Stop Recording: The app provides buttons to start and stop audio recording, making it easy to capture audio data.

    Save Recorded Audio: After stopping the recording, users can save the recorded audio to a WAV file format. They can choose the file location and specify the name of the saved audio file.

Prerequisites

Before using the Audio Recorder App, make sure you have the following installed:

    Python: The app is built using Python and requires a working Python environment. You can download Python from python.org.

    PyAudio: PyAudio is used for audio input and output. You can install it using pip:

    pip install pyaudio

Usage

    Run the Application: To start the app, run the main script:

    css

    python main.py

    User Interface: The app opens a graphical user interface with the following elements:
        A canvas displaying the title "Audio Recorder."
        Start button: Click to begin audio recording.
        Stop button: Click to stop audio recording.
        Save button: Click to save the recorded audio to a WAV file.

    Recording Audio:
        Click the "Start" button to begin recording audio.
        Click the "Stop" button to end the recording.

    Saving Audio:
        Click the "Save" button to open a file dialog.
        Choose the location and enter a name for the audio file.
        Click "Save" to save the recorded audio in WAV format.

License

This Audio Recorder App is open-source and released under the MIT License. You can find the license information in the LICENSE file included with this project.
Acknowledgments

    This app uses the PyAudio library for audio recording.
    The graphical user interface is created using the Tkinter library.

Contributing

If you'd like to contribute to this project, feel free to fork it, make your changes, and create a pull request. We welcome contributions and improvements.

Enjoy using the Audio Recorder App! If you have any questions or encounter issues, please feel free to reach out to the project maintainers.
