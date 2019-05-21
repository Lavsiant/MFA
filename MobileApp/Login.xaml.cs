using System;
using Newtonsoft.Json;

using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MobileApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Login : ContentPage
    {


        public Login(string ip, string port)
        {
            InitializeComponent();
        }

        public string IP { get; set; }
        public string Port { get; set; }

        private HttpClient client;




        private async void LogInClicked(object sender, EventArgs e)
        {

                try
                {
                    var response = client.GetAsync($"http://{IP}:{Port}/api/identity/all").Result;
                    var content = response.Content.ReadAsStringAsync().Result;
                    userData = JsonConvert.DeserializeObject<List<User>>(content);
                    break;
                }
                catch
                {

                }
            

            var user = userData.FirstOrDefault(x => x.UserName.Equals(this.Login.Text) && x.Password.Equals(this.Password.Text));
            if (user != null)
            {
                Application.Current.MainPage = new Courses(user);
            }
            else
            {
                await DisplayAlert("Alert", "Incorrect login or password", "OK");
            }
        }
    }
}