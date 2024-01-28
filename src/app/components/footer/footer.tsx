import React from 'react';
import Fb from '../../../../public/5279111_network_fb_social media_facebook_facebook logo_icon.svg';
import Insta from '../../../../public/5279112_camera_instagram_social media_instagram logo_icon.png';
import Yt from '../../../../public/5279120_play_video_youtube_youtuble logo_icon.png';
import Mx3 from '../../../../public/mx3.png';
import Spotify from '../../../../public/spotify.png';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

function Footer({}: Props) {
  return (
    <div className="w-screen h-48 bg-[#333334203] flex flex-col items-center align-middle gap-4 justify-center">
      <div className="w-max">
        <ul className="flex flex-row justify-evenly items-center align-middle gap-4">
          <li>
            <Link href={'https://www.facebook.com/projektkrank'} target="_blank">
              <Image
                src={Fb}
                alt="Facebook"
                width={30}
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  borderRadius: '100%',
                  borderColor: 'transparent',
                }}
              />
            </Link>
          </li>
          <li>
            <Link href={'https://www.youtube.com/channel/UCkK24yYafCxzWbGVnOd68qw/videos'} target="_blank">
              <Image
                src={Yt}
                alt="Youtube"
                width={40}
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  borderRadius: '100%',
                  borderColor: 'transparent',
                }}
              />
            </Link>
          </li>
          <li>
            <Link
              href={'https://open.spotify.com/artist/7u4xNZfoPt4N6Sl3yBUp0S?si=II8bn7ISSnyiZOD2O83QEA'}
              target="_blank"
            >
              <Image
                src={Spotify}
                alt="Spotify"
                width={40}
                style={{
                  borderRadius: '100%',
                  borderColor: 'transparent',
                }}
              />
            </Link>
          </li>
          <li>
            <Link href={'https://www.instagram.com/projekt_krank/'} target="_blank">
              <Image
                src={Insta}
                alt="Insta"
                width={40}
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  borderRadius: '100%',
                  borderColor: 'transparent',
                }}
              />
            </Link>
          </li>
          <li>
            <Link href={'https://mx3.ch/home/search?q=projekt+krank'} target="_blank">
              <Image
                src={Mx3}
                alt="Mx3"
                width={40}
                style={{
                  backgroundColor: 'white',
                  color: 'white',
                  borderRadius: '100%',
                  borderColor: 'transparent',
                }}
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full text-center text-[#bb8933]">© Copyright Projekt Krank, Boersma Records</div>
    </div>
  );
}

export default Footer;
