// ========================================
// PULSE MUSIC - FINAL PROJECT
// Vanilla JavaScript
// ========================================

// Main variables
var songs = [];
var currentSongIndex = -1;

var likedSongs = JSON.parse(localStorage.getItem("pulseLikedSongs")) || [];
var playlists = JSON.parse(localStorage.getItem("pulsePlaylists")) || [];
var playedCount = Number(localStorage.getItem("pulsePlayedCount")) || 0;

// Audio player
var audio = document.getElementById("audio");

// Main containers
var recentList = document.getElementById("recent-list");
var searchResults = document.getElementById("search-results");
var libraryResults = document.getElementById("library-results");
var playlistContainer = document.getElementById("playlist-container");
var genreFilters = document.getElementById("genre-filters");

// Player information
var playerTitle = document.getElementById("player-title");
var playerArtist = document.getElementById("player-artist");
var largeCover = document.getElementById("large-cover");

var miniTitle = document.getElementById("mini-title");
var miniArtist = document.getElementById("mini-artist");
var miniCover = document.getElementById("mini-cover");

// Player buttons
var playButton = document.getElementById("play-toggle");
var mobilePlayButton = document.getElementById("mobile-play");
var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");

var progressBar = document.getElementById("progress");
var currentTimeText = document.getElementById("current-time");
var durationText = document.getElementById("duration");
var volumeControl = document.getElementById("volume");

// Search form
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");

// Playlist form
var playlistModal = document.getElementById("playlist-modal");
var playlistForm = document.getElementById("playlist-form");
var playlistName = document.getElementById("playlist-name");
var playlistDescription = document.getElementById("playlist-description");

var openPlaylistButton = document.getElementById("open-playlist-modal");
var closeModalButton = document.getElementById("close-modal");

// Other buttons
var heroPlayButton = document.getElementById("hero-play");
var playMixButton = document.getElementById("play-mix");

// Settings
var settingsForm = document.getElementById("settings-form");
var notificationsCheckbox = document.getElementById("notifications");
var qualityCheckbox = document.getElementById("quality");

// Toast message
var toast = document.getElementById("toast");

// Library filter
var currentLibraryFilter = "all";

// ========================================
// LOAD SONG DATA
// ========================================

async function loadSongs() {
  try {
    var response = await fetch("data/songs.json");

    if (!response.ok) {
      throw new Error("The song data could not be loaded.");
    }

    songs = await response.json();

    displayRecentSongs();
    displaySearchResults(songs);
    displayGenreFilters();
    displayLibrary();
    updateProfileStats();
  } catch (error) {
    console.log(error);

    recentList.innerHTML =
      "<p>The songs could not be loaded. Please open the project with Live Server.</p>";

    showToast("Please use Live Server to open the project.");
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function getInitials(text) {
  var words = text.split(" ");
  var letters = "";

  for (var i = 0; i < words.length; i++) {
    letters += words[i].charAt(0);
  }

  return letters.substring(0, 2).toUpperCase();
}

function isSongLiked(songId) {
  for (var i = 0; i < likedSongs.length; i++) {
    if (likedSongs[i] === songId) {
      return true;
    }
  }

  return false;
}

function findSongIndex(songId) {
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].id === songId) {
      return i;
    }
  }

  return -1;
}

function protectText(text) {
  var temporaryElement = document.createElement("div");
  temporaryElement.textContent = text;
  return temporaryElement.innerHTML;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

// ========================================
// CREATE SONG CARDS
// ========================================

function createSongCard(song) {
  var likedClass = "";

  if (isSongLiked(song.id)) {
    likedClass = "liked";
  }

  var card = "";

  card += '<article class="song-card">';
  card +=
    '<div class="cover ' +
    song.color +
    '">' +
    getInitials(song.title) +
    "</div>";

  card += "<h3>" + protectText(song.title) + "</h3>";
  card +=
    "<p>" +
    protectText(song.artist) +
    " · " +
    protectText(song.genre) +
    "</p>";

  card += '<div class="song-actions">';

  card +=
    '<button class="icon-btn play-song" data-song-id="' +
    song.id +
    '" aria-label="Play ' +
    protectText(song.title) +
    '">▶</button>';

  card +=
    '<button class="icon-btn like-song ' +
    likedClass +
    '" data-song-id="' +
    song.id +
    '" aria-label="Like ' +
    protectText(song.title) +
    '">♡</button>';

  card += "</div>";
  card += "</article>";

  return card;
}

function createTrackRow(song) {
  var likedClass = "";

  if (isSongLiked(song.id)) {
    likedClass = "liked";
  }

  var row = "";

  row += '<article class="track">';

  row +=
    '<div class="mini-cover ' +
    song.color +
    '">' +
    getInitials(song.title) +
    "</div>";

  row += "<div>";
  row += "<h3>" + protectText(song.title) + "</h3>";

  row +=
    "<p>" +
    protectText(song.artist) +
    " · " +
    protectText(song.album) +
    " · " +
    song.duration +
    "</p>";

  row += "</div>";

  row += '<div class="track-actions">';

  row +=
    '<button class="icon-btn play-song" data-song-id="' +
    song.id +
    '" aria-label="Play ' +
    protectText(song.title) +
    '">▶</button>';

  row +=
    '<button class="icon-btn like-song ' +
    likedClass +
    '" data-song-id="' +
    song.id +
    '" aria-label="Like ' +
    protectText(song.title) +
    '">♡</button>';

  row += "</div>";
  row += "</article>";

  return row;
}

// ========================================
// DISPLAY SONGS
// ========================================

function displayRecentSongs() {
  var html = "";
  var numberOfSongs = 3;

  if (songs.length < 3) {
    numberOfSongs = songs.length;
  }

  for (var i = 0; i < numberOfSongs; i++) {
    html += createSongCard(songs[i]);
  }

  recentList.innerHTML = html;
  addSongButtonEvents();
}

function displaySearchResults(songList) {
  var html = "";

  if (songList.length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }

  for (var i = 0; i < songList.length; i++) {
    html += createTrackRow(songList[i]);
  }

  searchResults.innerHTML = html;
  addSongButtonEvents();
}

// ========================================
// SONG BUTTON EVENTS
// ========================================

function addSongButtonEvents() {
  var playSongButtons = document.querySelectorAll(".play-song");
  var likeSongButtons = document.querySelectorAll(".like-song");

  for (var i = 0; i < playSongButtons.length; i++) {
    playSongButtons[i].addEventListener("click", function () {
      var songId = Number(this.getAttribute("data-song-id"));
      playSong(songId);
    });
  }

  for (var j = 0; j < likeSongButtons.length; j++) {
    likeSongButtons[j].addEventListener("click", function () {
      var songId = Number(this.getAttribute("data-song-id"));
      toggleLike(songId);
    });
  }
}

// ========================================
// MUSIC PLAYER
// ========================================

function playSong(songId) {
  var songIndex = findSongIndex(songId);

  if (songIndex === -1) {
    return;
  }

  currentSongIndex = songIndex;

  var selectedSong = songs[currentSongIndex];

  audio.src = selectedSong.audio;

  audio.play().catch(function () {
    showToast("Press play again if the browser blocked the audio.");
  });

  playedCount = playedCount + 1;

  localStorage.setItem("pulsePlayedCount", playedCount);

  updatePlayerInformation(selectedSong);
  updatePlayButtons(true);
  updateProfileStats();
}

function updatePlayerInformation(song) {
  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;

  miniTitle.textContent = song.title;
  miniArtist.textContent = song.artist;

  durationText.textContent = song.duration;

  largeCover.className = "cover " + song.color;
  largeCover.textContent = getInitials(song.title);

  miniCover.className = "mini-cover " + song.color;
  miniCover.textContent = getInitials(song.title);
}

function updatePlayButtons(isPlaying) {
  if (isPlaying === true) {
    playButton.textContent = "❚❚";
    mobilePlayButton.textContent = "❚❚";
  } else {
    playButton.textContent = "▶";
    mobilePlayButton.textContent = "▶";
  }
}

function togglePlayPause() {
  if (currentSongIndex === -1) {
    if (songs.length > 0) {
      playSong(songs[0].id);
    }

    return;
  }

  if (audio.paused === true) {
    audio.play();
    updatePlayButtons(true);
  } else {
    audio.pause();
    updatePlayButtons(false);
  }
}

function playNextSong() {
  if (songs.length === 0) {
    return;
  }

  if (currentSongIndex === -1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex = currentSongIndex + 1;

    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
  }

  playSong(songs[currentSongIndex].id);
}

function playPreviousSong() {
  if (songs.length === 0) {
    return;
  }

  if (currentSongIndex === -1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex = currentSongIndex - 1;

    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
  }

  playSong(songs[currentSongIndex].id);
}

// ========================================
// PLAYER EVENT LISTENERS
// ========================================

playButton.addEventListener("click", function () {
  togglePlayPause();
});

mobilePlayButton.addEventListener("click", function () {
  togglePlayPause();
});

nextButton.addEventListener("click", function () {
  playNextSong();
});

previousButton.addEventListener("click", function () {
  playPreviousSong();
});

heroPlayButton.addEventListener("click", function () {
  if (songs.length > 0) {
    playSong(songs[0].id);
  }
});

playMixButton.addEventListener("click", function () {
  if (songs.length > 0) {
    playSong(songs[0].id);
  }
});

volumeControl.addEventListener("input", function () {
  audio.volume = volumeControl.value;
});

progressBar.addEventListener("input", function () {
  if (audio.duration) {
    var newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
  }
});

audio.addEventListener("timeupdate", function () {
  if (!audio.duration) {
    return;
  }

  var progressValue = (audio.currentTime / audio.duration) * 100;

  progressBar.value = progressValue;

  var minutes = Math.floor(audio.currentTime / 60);
  var seconds = Math.floor(audio.currentTime % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  currentTimeText.textContent = minutes + ":" + seconds;
});

audio.addEventListener("ended", function () {
  playNextSong();
});

audio.addEventListener("pause", function () {
  updatePlayButtons(false);
});

audio.addEventListener("play", function () {
  updatePlayButtons(true);
});

// ========================================
// LIKE SONGS
// ========================================

function toggleLike(songId) {
  var position = likedSongs.indexOf(songId);

  if (position === -1) {
    likedSongs.push(songId);
    showToast("Added to liked songs.");
  } else {
    likedSongs.splice(position, 1);
    showToast("Removed from liked songs.");
  }

  localStorage.setItem(
    "pulseLikedSongs",
    JSON.stringify(likedSongs)
  );

  displayRecentSongs();
  displaySearchResults(songs);
  displayLibrary();
  updateProfileStats();
}

// ========================================
// SEARCH
// ========================================

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var searchText = searchInput.value.toLowerCase().trim();
  var matchingSongs = [];

  for (var i = 0; i < songs.length; i++) {
    var songTitle = songs[i].title.toLowerCase();
    var songArtist = songs[i].artist.toLowerCase();
    var songAlbum = songs[i].album.toLowerCase();
    var songGenre = songs[i].genre.toLowerCase();

    if (
      songTitle.indexOf(searchText) !== -1 ||
      songArtist.indexOf(searchText) !== -1 ||
      songAlbum.indexOf(searchText) !== -1 ||
      songGenre.indexOf(searchText) !== -1
    ) {
      matchingSongs.push(songs[i]);
    }
  }

  displaySearchResults(matchingSongs);
});

// ========================================
// GENRE FILTERS
// ========================================

function displayGenreFilters() {
  var genres = ["All"];

  for (var i = 0; i < songs.length; i++) {
    if (genres.indexOf(songs[i].genre) === -1) {
      genres.push(songs[i].genre);
    }
  }

  var html = "";

  for (var j = 0; j < genres.length; j++) {
    var activeClass = "";

    if (j === 0) {
      activeClass = "active";
    }

    html +=
      '<button class="filter-btn genre-filter ' +
      activeClass +
      '" data-genre-filter="' +
      genres[j] +
      '">' +
      genres[j] +
      "</button>";
  }

  genreFilters.innerHTML = html;
  addGenreFilterEvents();
}

function addGenreFilterEvents() {
  var genreButtons = document.querySelectorAll(".genre-filter");

  for (var i = 0; i < genreButtons.length; i++) {
    genreButtons[i].addEventListener("click", function () {
      var selectedGenre = this.getAttribute("data-genre-filter");

      for (var j = 0; j < genreButtons.length; j++) {
        genreButtons[j].classList.remove("active");
      }

      this.classList.add("active");

      if (selectedGenre === "All") {
        displaySearchResults(songs);
      } else {
        var genreSongs = [];

        for (var k = 0; k < songs.length; k++) {
          if (songs[k].genre === selectedGenre) {
            genreSongs.push(songs[k]);
          }
        }

        displaySearchResults(genreSongs);
      }
    });
  }
}

// Home mood buttons
var moodButtons = document.querySelectorAll("[data-genre]");

for (var i = 0; i < moodButtons.length; i++) {
  moodButtons[i].addEventListener("click", function () {
    var selectedGenre = this.getAttribute("data-genre");
    var genreSongs = [];

    switchView("search");

    for (var j = 0; j < songs.length; j++) {
      if (songs[j].genre === selectedGenre) {
        genreSongs.push(songs[j]);
      }
    }

    displaySearchResults(genreSongs);
  });
}

// ========================================
// NAVIGATION
// ========================================

function switchView(viewName) {
  var views = document.querySelectorAll(".view");
  var navigationButtons = document.querySelectorAll("[data-view]");

  for (var i = 0; i < views.length; i++) {
    views[i].classList.remove("active");
  }

  var selectedView = document.getElementById(viewName + "-view");

  if (selectedView) {
    selectedView.classList.add("active");
  }

  for (var j = 0; j < navigationButtons.length; j++) {
    navigationButtons[j].classList.remove("active");

    if (
      navigationButtons[j].getAttribute("data-view") ===
      viewName
    ) {
      navigationButtons[j].classList.add("active");
    }
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

var navigationButtons = document.querySelectorAll("[data-view]");

for (var i = 0; i < navigationButtons.length; i++) {
  navigationButtons[i].addEventListener("click", function (event) {
    event.preventDefault();

    var selectedView = this.getAttribute("data-view");

    switchView(selectedView);
  });
}

// ========================================
// LIBRARY
// ========================================

function displayLibrary() {
  displayPlaylists();

  var songsToDisplay = [];

  if (currentLibraryFilter === "liked") {
    for (var i = 0; i < songs.length; i++) {
      if (isSongLiked(songs[i].id)) {
        songsToDisplay.push(songs[i]);
      }
    }
  } else if (currentLibraryFilter === "all") {
    songsToDisplay = songs;
  }

  if (currentLibraryFilter === "playlists") {
    libraryResults.innerHTML = "";

    if (playlists.length === 0) {
      libraryResults.innerHTML =
        "<p>You have not created a playlist yet.</p>";
    }

    return;
  }

  var html = "";

  if (songsToDisplay.length === 0) {
    libraryResults.innerHTML = "<p>No liked songs yet.</p>";
    return;
  }

  for (var j = 0; j < songsToDisplay.length; j++) {
    html += createTrackRow(songsToDisplay[j]);
  }

  libraryResults.innerHTML = html;
  addSongButtonEvents();
}

function displayPlaylists() {
  var html = "";

  for (var i = 0; i < playlists.length; i++) {
    html += '<article class="playlist-card">';
    html += "<small>PLAYLIST</small>";
    html += "<h3>" + protectText(playlists[i].name) + "</h3>";

    if (playlists[i].description !== "") {
      html +=
        "<p>" +
        protectText(playlists[i].description) +
        "</p>";
    } else {
      html += "<p>No description</p>";
    }

    html += "</article>";
  }

  playlistContainer.innerHTML = html;
}

var libraryFilterButtons =
  document.querySelectorAll("[data-library-filter]");

for (var i = 0; i < libraryFilterButtons.length; i++) {
  libraryFilterButtons[i].addEventListener(
    "click",
    function () {
      for (
        var j = 0;
        j < libraryFilterButtons.length;
        j++
      ) {
        libraryFilterButtons[j].classList.remove("active");
      }

      this.classList.add("active");

      currentLibraryFilter =
        this.getAttribute("data-library-filter");

      displayLibrary();
    }
  );
}

// ========================================
// PLAYLIST FORM
// ========================================

openPlaylistButton.addEventListener("click", function () {
  playlistModal.showModal();
});

closeModalButton.addEventListener("click", function () {
  playlistModal.close();
});

playlistForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var nameValue = playlistName.value.trim();
  var descriptionValue = playlistDescription.value.trim();

  if (nameValue === "") {
    showToast("Please enter a playlist name.");
    return;
  }

  var newPlaylist = {
    id: Date.now(),
    name: nameValue,
    description: descriptionValue
  };

  playlists.push(newPlaylist);

  localStorage.setItem(
    "pulsePlaylists",
    JSON.stringify(playlists)
  );

  playlistForm.reset();
  playlistModal.close();

  displayLibrary();
  updateProfileStats();

  showToast("Playlist created.");
});

// ========================================
// PROFILE STATISTICS
// ========================================

function updateProfileStats() {
  document.getElementById("played-count").textContent =
    playedCount;

  document.getElementById("liked-count").textContent =
    likedSongs.length;

  document.getElementById("playlist-count").textContent =
    playlists.length;
}

// ========================================
// SETTINGS
// ========================================

function loadSettings() {
  var savedSettings =
    JSON.parse(localStorage.getItem("pulseSettings")) || {};

  if (savedSettings.notifications === true) {
    notificationsCheckbox.checked = true;
  } else {
    notificationsCheckbox.checked = false;
  }

  if (savedSettings.quality === true) {
    qualityCheckbox.checked = true;
  } else {
    qualityCheckbox.checked = false;
  }
}

settingsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var settings = {
    notifications: notificationsCheckbox.checked,
    quality: qualityCheckbox.checked
  };

  localStorage.setItem(
    "pulseSettings",
    JSON.stringify(settings)
  );

  showToast("Preferences saved.");
});

// ========================================
// START APPLICATION
// ========================================

loadSettings();
loadSongs();
