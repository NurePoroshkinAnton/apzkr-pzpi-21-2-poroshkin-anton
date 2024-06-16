import urequests
import ujson
import config

from models import ClimateProfile

class RoomService:
    def __init__(self, server_url):
        self.server_url = server_url

    def get_active_profile(self, room_id):
        try:
            url = "{}/active-profile?roomId={}".format(self.server_url, room_id)
            headers = {"ngrok-skip-browser-warning": "true"}

            response = urequests.get(url, headers=headers)

            if response.status_code == 200:
                data = ujson.loads(response.text)
                climate_profile = ClimateProfile(**data)
                return climate_profile
            else:
                print("Error: HTTP status code", response.status_code)
                return None
        except Exception as e:
            print("Error:", e)
            return None

    def get_number_by_id(self, room_id):
        try:
            url = "{}/number-by-id?roomId={}".format(self.server_url, room_id)
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