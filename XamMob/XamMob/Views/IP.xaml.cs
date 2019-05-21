using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace XamMob.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class IP : ContentPage
    {
        public IP()
        {
            InitializeComponent();
        }


        private async void LogInClicked(object sender, EventArgs e)
        {
            Application.Current.MainPage = new Login(this.Ip.Text, this.Port.Text);
        }
    }
}