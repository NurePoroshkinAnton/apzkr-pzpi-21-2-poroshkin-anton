class UnitsConvertService:
    def __init__(self):
        pass

    def humidity_percentage_to_fraction(self, humidity_percent):
        if 0 <= humidity_percent <= 100:
            return humidity_percent / 100
        else:
            raise ValueError("Humidity percentage must be between 0 and 100")

    def humidity_fraction_to_percentage(self, fraction):
        return fraction * 100

    def celsius_to_fahrenheit(self, celsius):
        return (celsius * 9/5) + 32

    def celsius_to_kelvin(self, celsius):
        return celsius + 273

    def fahrenheit_to_celsius(self, fahrenheit):
        return (fahrenheit - 32) * 5/9

    def fahrenheit_to_kelvin(self, fahrenheit):
        return self.celsius_to_kelvin(self.fahrenheit_to_celsius(fahrenheit))

    def kelvin_to_celsius(self, kelvin):
        return kelvin - 273

    def kelvin_to_fahrenheit(self, kelvin):
        return self.celsius_to_fahrenheit(self.kelvin_to_celsius(kelvin))

    def convert_temperature(self, value, from_unit, to_unit):
        if from_unit == to_unit:
            return value

        if from_unit == 'C':
            if to_unit == 'F':
                return self.celsius_to_fahrenheit(value)
            elif to_unit == 'K':
                return self.celsius_to_kelvin(value)
        elif from_unit == 'F':
            if to_unit == 'C':
                return self.fahrenheit_to_celsius(value)
            elif to_unit == 'K':
                return self.fahrenheit_to_kelvin(value)
        elif from_unit == 'K':
            if to_unit == 'C':
                return self.kelvin_to_celsius(value)
            elif to_unit == 'F':
                return self.kelvin_to_fahrenheit(value)
        else:
            raise ValueError("Invalid temperature unit. Use 'C', 'F', or 'K'.")
    
    def convert_humidity(self, value, from_unit, to_unit):
        if from_unit == to_unit:
            return value
        
        if from_unit == "%":
            if to_unit == "1":
                return self.humidity_percentage_to_fraction(value)
        elif from_unit == "1":
            if to_unit == "%":
                return self.humidity_fraction_to_percentage(value)
        else:
            raise ValueError("Invalid humidity unit. Use '% or '1' for fractions")