using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace XamMob.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Login : ContentPage
    {
        public Login(string ip, string port)
        {
            Ip = ip;
            Port = port;
            client = new HttpClient();
            InitializeComponent();
        }

        public string Ip { get; set; }

        public string Port { get; set; }

        HttpClient client;

        List<User> userData;


        private async void LogInClicked(object sender, EventArgs e)
        {
            try
            {
                var response = await client.GetAsync($"http://{Ip}:{Port}/api/identity/all");
                var content = response.Content.ReadAsStringAsync().Result;
                userData = JsonConvert.DeserializeObject<Response<List<User>>>(content).data;
            }
            catch (Exception es)
            {
                await DisplayAlert("Alert", "aaaord", "OK");
            }
            try
            {
                var user = userData.FirstOrDefault(x => x.Login.Equals(this.Logi.Text) && x.Password.Equals(GetHash(this.Password.Text)));
                if (user != null)
                {
                    Storage.User = user;
                    try
                    {
                        var response = await client.GetAsync($"http://{Ip}:{Port}/api/playlist/all?id=" + user.ID);
                        var content = response.Content.ReadAsStringAsync().Result;
                        await DisplayAlert("Alert", "succes playlist request", "OK");
                        var playlists = JsonConvert.DeserializeObject<Response<List<PlaylistViewModel>>>(content).data;
                        Storage.Playlists = playlists;
                        Application.Current.MainPage = new MainPage();
                    }
                    catch (Exception es)
                    {
                        await DisplayAlert("Alert", "Failen on playlists load", "OK");
                    }
                    //Application.Current.MainPage = new Courses(user);
                }
                else
                {
                    await DisplayAlert("Alert", "Incorrect login or password", "OK");
                }
            }
            catch( Exception esss)
            {
                await DisplayAlert("Alert", esss.Message, "OK");
            }
        }
        private string GetHash(string value)
        {
            using (SHA256 hash = SHA256Managed.Create())
            {
                return String.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));

            }
        }
    }


}