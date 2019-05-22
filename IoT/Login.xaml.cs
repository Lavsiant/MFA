using IoT.Models;
using IoT.Storage;
using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
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
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Window
    {
          HttpClient _client;

        public Login()
        {
            InitializeComponent();


        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try {
                _client = new HttpClient();
                var response = _client.GetAsync($"http://{EmulStorage.IP}:{EmulStorage.Port}/api/identity/all").Result;
                var content = response.Content.ReadAsStringAsync().Result;
                var userData = JsonConvert.DeserializeObject<Response<List<User>>>(content).data;
                
                var user = userData.FirstOrDefault(x => x.Login.Equals(this.Logi.Text) && x.Password.Equals(GetHash(this.Password.Text)));
                if (user == null)
                {
                    MessageBox.Show("Incorrect login or password");
                }
                else
                {
                    EmulStorage.User = user;
                    var wind = new IoTWindow();
                    wind.Show();
                    this.Close();
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
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
