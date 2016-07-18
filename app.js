//Icons from: http://erikflowers.github.io/weather-icons/
//Open Weather: http://openweathermap.org/current#geo
$(document).ready(function() {
  var isFahrenheit = true;

  init();
  $('#unit-switch').on('click', function() {

    $('#unit-switch i').toggleClass("spin");
    $('.temp-unit').toggleClass("current");
    isFahrenheit = !isFahrenheit;

    if (isFahrenheit) {
      $('#temp').html(Math.round(f) + "&deg;");

    } else {
      $('#temp').html(c + "&deg;");
    }
  });
})

function init() {
  if (navigator.geolocation) {
    //var lat = position.coords.latitude;
    //var long = position.coords.longitude;
    navigator.geolocation.getCurrentPosition(getWeather);
  }
}

function getWeather(position) {
  //function getWeather() {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=imperial&APPID=4882497d6562dbf2104b6b7fbb536f19';

  $.get(url, function(data) {
    window.f = data.main.temp;
    window.c = Math.round((data.main.temp - 32) * 5 / 9);
    var weatherId = data.weather[0].id;
    $('#city').text(data.name);
    $('#icon').addClass(getIcon(weatherId));
    $('#desc').text(data.weather[0].description);
    $('#temp').html(Math.round(f) + "&deg;");
    $('#temp-unit').text("F");
    $('#data').fadeIn(400);
  });
};

//**I now realize this compatability with Open Weather Map is already built in at: https://erikflowers.github.io/weather-icons/api-list.html
//Oh well...
function getIcon(exp) {
  switch (exp) {
    case 200:
    case 201:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
    case 771:
      return "wi wi-storm-showers";
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
      return "wi wi-sprinkle";
    case 312:
    case 313:
    case 314:
    case 321:
    case 500:
    case 501:
    case 520:
    case 521:
      return "wi wi-rain";
    case 502:
    case 503:
    case 504:
    case 522:
    case 531:
      return "wi wi-rain-wind";
    case 511:
    case 611:
    case 612:
    case 615:
    case 616:
    case 906:
      return "wi wi-rain-mix";
    case 600:
    case 601:
    case 602:
    case 620:
    case 621:
    case 622:
      return "wi wi-snow";
    case 701:
    case 721:
    case 741:
      return "wi wi-fog";
    case 711:
      return "wi wi-smoke";
    case 731:
    case 751:
    case 761:
    case 762:
      return "wi wi-sandstorm"
    case 781:
    case 900:
      return "wi wi-tornado"
    case 800:
    case 951:
      return "wi wi-day-sunny";
    case 801:
    case 802:
    case 803:
      return "wi wi-day-cloudy";
    case 804:
      return "wi wi-cloudy";
    case 901:
    case 902:
    case 962:
      return "wi wi-hurricane";
    case 903:
      return "wi wi-snowflake-cold";
    case 904:
      return "wi wi-thermometer";
    case 905:
    case 952:
    case 953:
    case 954:
    case 955:
      return "wi wi-windy";
    case 956:
      return "wi wi-strong-wind";
    case 957:
    case 958:
    case 959:
      return "wi wi-gale-warning";
    case 960:
    case 961:
      return "wi wi-storm-warning";
    default:
      return "wi wi-thermometer";
  }
}