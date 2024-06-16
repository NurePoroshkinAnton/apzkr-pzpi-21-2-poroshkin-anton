import urequests
import ujson
import logging

def get_smtp_credentials(server_url):
    try:
        url = "{}/static/smtp-credentials".format(server_url)
        headers = {"ngrok-skip-browser-warning": "true"}

        response = urequests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = ujson.loads(response.text)
            return data
        else:
            print("Error: HTTP status code", response.status_code)
            return None
    except Exception as e:
        print("Error:", e)
        return None

class ConsoleLogHandler(logging.Handler):
    def emit(self, record):
        if (record.name):
            print("{} - [{}]: {}".format(record.name, record.levelname, record.message))
        else:
            print("[{}]: {}".format(record.levelname, record.message))

class Logger:
    def __init__(self, name = ''):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        console_handler = ConsoleLogHandler()
        self.logger.addHandler(console_handler)

    def info(self, message):
        self.logger.info(message)

