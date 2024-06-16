import urequests
import ujson
import network
import usocket
import umail
import utime

from room_service import RoomService
from climate_device_service import ClimateDeviceService
from utils import get_smtp_credentials, Logger
from models import ClimateDeviceStatus
import config

ACTIVE_PROFILE_ID = ""
room_service = None
climate_device_service = None

logger = Logger('Main')

def perform_work():
    global ACTIVE_PROFILE_ID
    global room_service
    global climate_device_service

    room_service = RoomService(config.SERVER_URL + "/rooms")
    climate_device_service = ClimateDeviceService(config.SERVER_URL + "/climate-devices")

    connect_to_network()

    while True:
        logger.info('Started polling')

        new_profile = room_service.get_active_profile(config.ROOM_ID)

        if (not new_profile):
            logger.info("No climate profile is active for the room.")
        elif (new_profile.id != ACTIVE_PROFILE_ID):
            logger.info("Fetched new active profile. Applying...")
            climate_devices = climate_device_service.get_by_room(config.ROOM_ID)

            for device in climate_devices:
                response = climate_device_service.apply_profile(device, new_profile)
                handle_climate_device_response(response, device)

            ACTIVE_PROFILE_ID = new_profile.id
        else:
            logger.info("Fetched profile is already applied.")

        logger.info("Performed successful polling iteration. Sleeping for {} seconds".format(config.POLLING_INTERVAL))
        utime.sleep(config.POLLING_INTERVAL) 


def send_warning_email(response, device):
    logger.info("Sending {} message for device {}".format(response["status"], device.id))

    smtp_crentials = get_smtp_credentials(config.SERVER_URL)
    room_number = room_service.get_number_by_id(config.ROOM_ID)

    email_sender = "From: {} <{}>\n".format(config.EMAIL_SENDER_NAME, smtp_crentials["email"])
    email_subject = "Subject: Actions needed for cliamte device with accession number {} in room {}\n".format(device.accessionNumber, room_number)

    email_status_string = ""

    if (response["status"] == ClimateDeviceStatus.WARNING):
        email_status_string = "reported a warning"
    else:
        email_status_string = "reported an error"

    email_recommendations = ""

    if (response["status"] == ClimateDeviceStatus.WARNING):
        email_recommendations = "Make sure to take neccessary actions"
    else:
        email_recommendations = "Immediate actions are necessary"

    email_body = """
Greetings!

A climate device with accession number {} in room {} {} with following message: {}

{}
""".format(device.accessionNumber, room_number, email_status_string, response["message"], email_recommendations)

    smtp = umail.SMTP('smtp.gmail.com', 587, username=smtp_crentials["email"], password=smtp_crentials["password"])
    smtp.to(config.COMPANY_EMAIL)
    smtp.write(email_sender)
    smtp.write(email_subject)

    smtp.send(email_body)


def connect_to_network():
    wlan = network.WLAN(network.STA_IF)

    wlan.active(True)
    if not wlan.isconnected():
        logger.info("Connecting to network...")
        wlan.connect(config.WIFI_SSID, config.WIFI_PASSWORD)
        while not wlan.isconnected():
            pass
    
    logger.info('Successfully connected to network')


def handle_climate_device_response(response, device):
    if (response["status"] != device.status):
        climate_device_service.update_status(device.id, response["status"])
        
    if (response["status"] != ClimateDeviceStatus.OK):
        send_warning_email(response, device)


def get_ssid():
        ssid = input("Enter Wi-Fi SSID (default: 'Wokwi-GUEST'): ")
        config.WIFI_SSID = ssid.strip() or "Wokwi-GUEST"


def get_password():
    password = input("Enter Wi-Fi password (leave empty if none): ")
    config.WIFI_PASSWORD = password.strip()


def get_server_url():
    url = input("Enter server URL: ")

    while not url.strip():
        print("Server URL is required.")
        url = input("Enter server URL: ")

    config.SERVER_URL = url.strip()


def get_sender_name():
    name = input("Enter email sender name (default: 'Climatly Administration'): ")
    config.EMAIL_SENDER_NAME = name.strip() or "Climatly Administration"


def get_polling_interval():
    while True:
        try:
            user_input = input("Enter polling interval in seconds (minimum 15, default 60): ")

            if user_input == '':
                config.POLLING_INTERVAL = 60
                return

            interval = int(user_input)
            if interval >= 15:
                config.POLLING_INTERVAL = interval
                return
            else:
                print("Polling interval must be at least 15 seconds.")
        except ValueError:
            print("Invalid input. Please enter a number.")  


def get_room_id():
    room_id = input("Enter room ID: ")

    while not room_id.strip():
        print("Room ID is required.")
        room_id = input("Enter room ID: ")

    config.ROOM_ID = room_id.strip()


def get_company_email():
    email = input("Enter company email: ")

    while not email.strip():
        print("Company email is required.")
        email = input("Enter company email: ")

    config.COMPANY_EMAIL = email.strip()


def full_configuration():
    get_ssid()
    get_password()
    get_server_url()
    get_sender_name()
    get_polling_interval()
    get_room_id()
    get_company_email()


def single_configuration():
    while True:
        print("\nSingle configuration menu:")
        print("1 - Configure Wi-Fi SSID")
        print("2 - Configure Wi-Fi Password")
        print("3 - Configure server URL")
        print("4 - Configure email sender name")
        print("5 - Configure polling interval")
        print("6 - Configure room ID")
        print("7 - Configure company email")
        print("8 - Back to main menu")

        choice = input("Select an option: ")

        if choice == '1':
            get_ssid()
        elif choice == '2':
            get_password()
        elif choice == '3':
            get_server_url()
        elif choice == '4':
            get_sender_name()
        elif choice == '5':
            get_polling_interval()
        elif choice == '6':
            get_room_id()
        elif choice == '7':
            get_company_email()
        elif choice == '8':
            break
        else:
            print("Invalid option. Please try again.")


def main():
    while True:
        print("\nMain Menu:")
        print("1 - Complete full configuration")
        print("2 - Change a single configuration parameter")
        print("3 - Start the program")

        choice = input("Select an option: ")

        if choice == '1':
            full_configuration()
        elif choice == '2':
            single_configuration()
        elif choice == '3':
            perform_work()
        else:
            print("Invalid option. Please try again.")

main()