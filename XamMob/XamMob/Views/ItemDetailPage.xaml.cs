using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;

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

      
    }
}