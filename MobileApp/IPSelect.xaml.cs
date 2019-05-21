using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MobileApp
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class IPSelect : ContentPage
    {
        public IPSelect()
        {
            InitializeComponent();
        }

        public IPSelect(string ip, string port)
        {
            IP = ip;
            Port = port;
            InitializeComponent();
        }

        public string IP { get; set; }
        public string Port { get; set; }

        private HttpClient client;




        private async void LogInClicked(object sender, EventArgs e)
        {


            Application.Current.MainPage = new Login(IP, Port);
        }
    }
}