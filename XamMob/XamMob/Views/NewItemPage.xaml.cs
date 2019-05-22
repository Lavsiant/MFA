using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net.Http;
using System.Net.Http.Headers;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using XamMob.Models;

namespace XamMob.Views
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(true)]
    public partial class NewItemPage : ContentPage
    {
        public Item Item { get; set; }

        public NewItemPage()
        {
            InitializeComponent();

            Item = new Item
            {
                Text = "Playlist name",
            };

            BindingContext = this;
        }

        async void Save_Clicked(object sender, EventArgs e)
        {
            var client = new HttpClient();
            var pl = new PlaylistViewModel()
            {
                Name = Item.Text
            };
            var myContent = JsonConvert.SerializeObject(pl);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.PostAsync($"http://{Storage.Ip}:{Storage.Port}/api/playlist/create?userId=" + Storage.User.ID, byteContent);
            Storage.Playlists.Add(pl);
            Application.Current.MainPage = new MainPage();
            //MessagingCenter.Send(this, "AddItem", Item);
            //await Navigation.PopModalAsync();
        }

        async void Cancel_Clicked(object sender, EventArgs e)
        {
            await Navigation.PopModalAsync();
        }
    }
}