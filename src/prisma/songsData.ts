// default data for db seed
export const artistsData: {
  name: string
  albumPhoto?: string
  songs: {
    name: string
    duration: number
    url: string
    artist?: string
    photo?: string
  }[]
}[] = [
  {
    name: 'Glitch',
    songs: [
      {
        name: 'Fermi Paradox',
        duration: 235,
        artist: 'Glitch',
        url: 'https://dl.dropboxusercontent.com/s/7xmpwvvek6szx5n/fermi-paradox.mp3?dl=0',
      },
    ],
  },
  {
    name: 'Purple Cat',
    songs: [
      {
        name: 'Long Day',
        duration: 185,
        artist: 'Purple Cat',
        url: 'https://dl.dropboxusercontent.com/s/9h90r7ku3df5o9y/long-day.mp3?dl=0',
      },
    ],
  },
  {
    name: 'Ben Sound',
    songs: [
      {
        name: 'The Elevator Bossa Nova',
        duration: 238,
        artist: 'Ben Sound',
        url: 'https://dl.dropboxusercontent.com/s/7dh5o3kfjcz0nh3/The-Elevator-Bossa-Nova.mp3?dl=0',
      },
    ],
  },
  {
    name: 'LiQWYD',
    songs: [
      {
        name: 'Winter',
        duration: 162,
        artist: 'LiQWYD',
        url: 'https://dl.dropboxusercontent.com/s/tlx2zev0as500ki/winter.mp3?dl=0',
      },
    ],
  },
  {
    name: 'FSM Team',
    songs: [
      {
        name: 'Eternal Springtime',
        duration: 302,
        artist: 'FSM Team',
        url: 'https://dl.dropboxusercontent.com/s/92u8d427bz0b1t8/eternal-springtime.mp3?dl=0',
      },
      {
        name: 'Astronaut in a Submarine',
        duration: 239,
        artist: 'FSM Team',
        url: 'https://dl.dropboxusercontent.com/s/9b43fr6epbgji4f/astronaut-in-a-submarine.mp3?dl=0',
      },
    ],
  },

  {
    name: 'Igor',
    albumPhoto: 'https://upload.wikimedia.org/wikipedia/ru/e/e4/Tyler%2C_the_Creator_-_Igor.jpg',
    songs: [
      {
        name: 'A BOY IS A GUN',
        duration: 210,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/yrlqxbc01w2r3cw/A%20BOY%20IS%20A%20GUN.mp3?dl=0',
      },
      {
        name: 'ARE WE STILL FRIENDS',
        duration: 265,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/1bfna84vqqbz4y1/ARE%20WE%20STILL%20FRIENDS.mp3?dl=0',
      },
      {
        name: 'EXACTLY WHAT YOU RUN FROM YOU END UP CHASING',
        duration: 14,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/d7i6morfieo2gew/EXACTLY%20WHAT%20YOU%20RUN%20FROM%20YOU%20END%20UP%20CHASING.mp3?dl=0',
      },
      {
        name: 'GONE, GONE / THANK YOU',
        duration: 375,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/9eo6s98hy2n68c3/GONE%2C%20GONE%20_%20THANK%20YOU.mp3?dl=0',
      },
      {
        name: 'I DONT LOVE YOU ANYMORE',
        duration: 161,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/u2xp7t6f57wfjla/I%20DON%27T%20LOVE%20YOU%20ANYMORE.mp3?dl=0',
      },
      {
        name: 'I THINK',
        duration: 212,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/5pcqmddwzzpugj9/I%20THINK.mp3?dl=0',
      },
      {
        name: "IGOR'S THEME",
        duration: 200,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/wfw7k9otn8n2d3h/IGOR%27S%20THEME.mp3?dl=0',
      },
      {
        name: 'NEW MAGIC WAND',
        duration: 195,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/0vgfctxgbuofgbx/NEW%20MAGIC%20WAND.mp3?dl=0',
      },
      {
        name: 'RUNNING OUT OF TIME',
        duration: 177,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/0r1x7tfkgdbvn79/RUNNING%20OUT%20OF%20TIME.mp3?dl=0',
      },
      {
        name: "WHAT'S GOOD",
        duration: 205,
        artist: 'Tyler, The Creator',
        url: 'https://dl.dropboxusercontent.com/s/8e0osu6lsok2by1/WHAT%27S%20GOOD.mp3?dl=0',
      },
    ],
  },

  {
    name: 'Lo-Fi',
    albumPhoto: 'https://avatars.yandex.net/get-music-user-playlist/71140/1034563997.1000.86597/200x200?1617267585858',
    songs: [
      {
        name: 'Air',
        duration: 77,
        artist: 'Lo-Fi Beats',
        url: 'https://dl.dropboxusercontent.com/s/qgswwnzcmjj3voo/Air.mp3?dl=0',
      },
      {
        name: 'August',
        duration: 114,
        artist: 'Lo-Fi Beats',
        url: 'https://dl.dropboxusercontent.com/s/4uph6iplf2p5b03/August.mp3?dl=0',
      },
      {
        name: 'Too tired',
        duration: 116,
        artist: 'Lo-Fi Beats',
        url: 'https://dl.dropboxusercontent.com/s/irq0jnyvb50y45i/Too%20Tired.mp3?dl=0',
      },
      {
        name: 'No samples',
        duration: 206,
        artist: 'Lo-Fi Beats',
        url: 'https://dl.dropboxusercontent.com/s/ouj3mi7c6mb0016/No%20Samples.mp3?dl=0',
      },
      {
        name: 'Sekao',
        duration: 132,
        artist: 'Lo-Fi Beats',
        url: 'https://dl.dropboxusercontent.com/s/jg4aogei106gx9c/sekao.mp3?dl=0',
      },
    ],
  },

  {
    name: 'ye',
    albumPhoto: 'https://i.scdn.co/image/ab67616d0000b2730cd942c1a864afa4e92d04f2',
    songs: [
      {
        name: 'Yikes',
        duration: 188,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/e8iq3r5pvp7tplr/Yikes.mp3?dl=0',
      },
      {
        name: 'All Mine',
        duration: 145,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/jsekx7d58x2x33a/All%20Mine.mp3?dl=0',
      },
      {
        name: 'Ghost Town',
        duration: 271,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/5707wlah6luvcv0/Ghost%20Town.mp3?dl=0',
      },
      {
        name: 'I Thought About Killing You',
        duration: 274,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/5tj15yu2dcddae3/I%20Thought%20About%20Killing%20You.mp3?dl=0',
      },
      {
        name: 'No Mistakes',
        duration: 123,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/3cco3l7nje7x4ya/No%20Mistakes.mp3?dl=0',
      },
      {
        name: 'Violent Crimes',
        duration: 215,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/zsk2k73fmn02trm/Violent%20Crimes.mp3?dl=0',
      },
      {
        name: "Wouldn't Leave",
        duration: 205,
        artist: 'Kanye West',
        url: 'https://dl.dropboxusercontent.com/s/5km8kgsumvlc0d0/Wouldn%27t%20Leave.mp3?dl=0',
      },
    ],
  },
]
