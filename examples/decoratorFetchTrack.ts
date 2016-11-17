import Client from '../src/spotify-graphql';
import SpotifyDecorators from '../src/decorators';

const accessToken = 'xxx';

let { SpotifyQuery } = SpotifyDecorators(Client(accessToken));

class Fetcher {

  @SpotifyQuery(`
    query getTrack($id: String!) {
      track(id: $id) {
        name
        artists {
          name
        }
        album {
          name
        }
      }
    }
  `)
  static getTrack (response?): any {
    let track = response.track;
    return `the track ${track.name} was played by ${track.artists[0].name}`;
  }
}


Fetcher.getTrack({ id : '3W2ZcrRsInZbjWylOi6KhZ' }).then(sentence => {
  console.log(sentence);
  // output "the track You & Me - Flume Remix was played by Disclosure"
}, error => { console.log(error) });