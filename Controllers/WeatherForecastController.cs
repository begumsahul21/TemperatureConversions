using Microsoft.AspNetCore.Mvc;

namespace TemperatureConversion.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet]
        public Temperature Get(double number, string from)
        {
            Temperature temp = new Temperature();
            temp.Input = number;
            switch (from)
            {
                case "Celsius":
                    {
                        temp.Celsius = number;
                        temp.Fahrenheit = (number * 1.8) + 32;
                        temp.Kelvin = number + 273.15;
                        break;
                    }
                case "Fahrenheit":
                    {
                        temp.Celsius = (number - 32) / 1.8;
                        temp.Fahrenheit = number;
                        temp.Kelvin = (number - 32) / 1.8 + 273.15;
                        break;
                    }
                case "Kelvin":
                    {
                        temp.Celsius = number - 273.15;
                        temp.Fahrenheit = (number - 273.15) * 1.8 + 32;
                        temp.Kelvin = number;
                        break;
                    }
            }
            return temp;
        }
    }
}

