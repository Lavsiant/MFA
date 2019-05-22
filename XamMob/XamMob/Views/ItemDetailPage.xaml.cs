using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using XamMob.Models;
using XamMob.ViewModels;

namespace XamMob.Views
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(true)]
    public partial class ItemDetailPage : ContentPage
    {
        ItemDetailViewModel viewModel;

        public ItemDetailPage(PlaylistViewModel playlist)
        {
            InitializeComponent();
            Playlist = playlist;
            Songs = playlist.Songs;
            BindingContext = this;
        }

        public PlaylistViewModel Playlist { get; set; }

        public List<SongViewModel> Songs { get; set; }


        async void OnItemSelected(object sender, SelectedItemChangedEventArgs args)
        {
            var item = args.SelectedItem as SongViewModel;
            if (item == null)
                return;

            Device.OpenUri(new Uri("https://www.youtube.com/watch?v=WEQnzs8wl6E"));
        }

        async void DeletePlaylist(object sender, EventArgs args)
        {
            var client = new HttpClient();
            await client.GetAsync($"http://{Storage.Ip}:{Storage.Port}/api/playlist/delete?userId={Storage.User.ID}&name={Playlist.Name}");
            var pl = Storage.Playlists.FirstOrDefault(x => x.Name == Playlist.Name);
            if (pl != null)
            {
                Storage.Playlists.Remove(pl);
            }
          
            Application.Current.MainPage = new MainPage();
        }
    }
}