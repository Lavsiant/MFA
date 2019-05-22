using IoT.Models;
using IoT.Services;
using IoT.Storage;
using IoT.ViewModels;
using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace IoT
{
    /// <summary>
    /// Interaction logic for IoTWindow.xaml
    /// </summary>
    public partial class IoTWindow : Window
    {
        private readonly GpsService _gpsService;
        private readonly WeatherService _weatherService;
        private readonly MoodService _moodService;

        public IoTWindow()
        {
            _gpsService = new GpsService();
            _weatherService = new WeatherService();
            _moodService = new MoodService();
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            this.Console.Text = "";
            this.Result.Text = "";
            this.Console.AppendText("Start getting coordinates...");
            var coords = _gpsService.GetCurrentCoordinates();
            this.Console.AppendText($"\n lat: {coords.Lat}   long: {coords.Long}");

            this.Console.AppendText("\n Start getting weather by coordinates...");
            var weather = _weatherService.GetWeatherTypeByCoordinates(coords.Lat, coords.Long);
            this.Console.AppendText($"\n Weather type: {weather.ToString()}");


            this.Console.AppendText("\nStart getting pulse...");
            var rand = new Random();
            var pulse = rand.Next(60, 100);
            Mood mood = _moodService.GetMoodByPulse(pulse);
            this.Console.AppendText($"\n Probably your mood is {mood}");

            var client = new HttpClient();
            var response = client.GetAsync($"http://{EmulStorage.IP}:{EmulStorage.Port}/api/smart/get?mood={(int)mood}&weather={(int)weather}&location=2&id={EmulStorage.User.ID}&count={this.Count.Text}&playlist={this.Playlist.Text}").Result;
            var content = response.Content.ReadAsStringAsync().Result;
            var userData = JsonConvert.DeserializeObject<PlaylistVm>(content);

            foreach (var song in userData.Songs)
            {
                this.Result.AppendText($"\n {song.Name}-{song.Band}  Genre:{song.Genre} Mood:{song.State.Mood} Weather:{song.State.Weather} Location:{song.State.Location} ");
            }
            //Mood mood,Weather weather, Location location,int id,int count,string playlist
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }
    }
}
