class ClimateProfile:
    def __init__(self, id, name, temperature, humidity, isActive, clientId, createdAt):
        self.id = id
        self.name = name
        self.temperature = temperature
        self.humidity = humidity
        self.is_active = isActive
        self.client_id = clientId
        self.createdAt = createdAt


class ClimateDevice:
    def __init__(self, id, type, address, status, roomId, accessionNumber, manufacturer, room):
        self.id = id
        self.type = type
        self.address = address
        self.status = status
        self.room_id = roomId
        self.accessionNumber = accessionNumber
        self.manufacturer = manufacturer
        self.room = room

class ClimateDeviceStatus:
    OK = "ok"
    WARNING = "warning"
    ERROR = "error"

class ClimateDeviceType:
    THERMOSTAT = "thermostat"
    HUMIDISTAT = "humidistat"