import urequests
import ujson
import random

from models import ClimateDevice, ClimateDeviceStatus, ClimateDeviceType
from utils import Logger
from units_convert_service import UnitsConvertService

class ClimateDeviceService:
    def __init__(self, server_url):
        self.server_url = server_url
        self.logger = Logger("ClimateDeviceService")
        self.units_convert_service = UnitsConvertService()

    def get_by_room(self, room_id):
        try:
            url = "{}?roomId={}".format(self.server_url, room_id)
            headers = {"ngrok-skip-browser-warning": "true"}

            response = urequests.get(url, headers=headers)

            if response.status_code == 200:
                data = ujson.loads(response.text)

                climate_devices = []
                for item in data:
                    climate_device = ClimateDevice(**item)
                    climate_devices.append(climate_device)
                    
                return climate_devices
            else:
                print("Error: HTTP status code", response.status_code)
                return None
        except Exception as e:
            print("Error:", e)
            return None

    def get_apply_payload_value(self, device, profile):
        if (device.type == ClimateDeviceType.THERMOSTAT):
            return profile.temperature
        else:
            return profile.humidity

    def convert_payload_units(self, value, current_units, desired_untis, device):
        if (device.type == ClimateDeviceType.THERMOSTAT):
            return self.units_convert_service.convert_temperature(value, current_units, desired_untis)
        else:
            return self.units_convert_service.convert_humidity(value, current_units, desired_untis)

    def get_apply_profile_payload(self, device, profile):
        desired_untis = self.get_desired_units(device)
        server_units = self.get_server_units(device)

        payload_value = self.get_apply_payload_value(device, profile)

        payload_value = self.convert_payload_units(payload_value, server_units, desired_untis, device)

        payload = {
            'value': payload_value,
            'units': desired_untis
        }

        return payload

    def apply_profile(self, device, profile):
        payload = self.get_apply_profile_payload(device, profile)

        self.logger.info('Applying new profile for device {} with payload {}'.format(device.id, payload))

        response = dict()
        
        if (device.id == "a4e606bd-d31d-456f-812b-0b3109844d5d"):
            response = {
                'status': ClimateDeviceStatus.WARNING,
                'message': 'warning message'
            }
        else:
            response = {
                'status': ClimateDeviceStatus.OK,
                'message': ''
            }

        return response

    def get_desired_units(self, device):
        if device.type == ClimateDeviceType.THERMOSTAT:
            return random.choice(['K', 'C', 'F'])
        else:
            return random.choice(['%', '1'])

    def update_status(self, device_id, new_status):
        try:
            url = "{}/{}".format(self.server_url, device_id)
            headers = {"ngrok-skip-browser-warning": "true"}
            payload = {
                "status": new_status
            }

            response = urequests.patch(url, headers=headers, json=payload)

            if response.status_code == 200:
                self.logger.info('Updated status to {} for climate device with id {}'.format(new_status, device_id))
            else:
                print("Error: HTTP status code", response.status_code)
                return None
        except Exception as e:
            print("Error:", e)
            return None

    def get_server_units(self, device):
        try:
            url = "{}/units-config".format(self.server_url)
            headers = {"ngrok-skip-browser-warning": "true"}

            response = urequests.get(url, headers=headers)

            if response.status_code == 200:
                data = ujson.loads(response.text)

                if (device.type == ClimateDeviceType.THERMOSTAT):
                    return data["temperature"]
                
                return data["humidity"]
            else:
                print("Error: HTTP status code", response.status_code)
                return None
        except Exception as e:
            print("Error:", e)
            return None