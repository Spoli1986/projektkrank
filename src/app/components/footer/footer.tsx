import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import Fb from '../../../../public/5279111_network_fb_social media_facebook_facebook logo_icon.svg';
import Insta from '../../../../public/5279112_camera_instagram_social media_instagram logo_icon.png';
import Yt from '../../../../public/5279120_play_video_youtube_youtuble logo_icon.png';
import Mx3 from '../../../../public/mx3.png';
import SpotifyIcon from '../../../../public/spotify.png';
import Logo from '../../../../public/Logo ohne Hintergrund.png';

const socials: { href: string; label: string; image: StaticImageData | string }[] = [
  { href: 'https://www.facebook.com/projektkrank', label: 'Facebook', image: Fb },
  { href: 'https://www.youtube.com/channel/UCkK24yYafCxzWbGVnOd68qw/videos', label: 'YouTube', image: Yt },
  { href: 'https://open.spotify.com/artist/7u4xNZfoPt4N6Sl3yBUp0S?si=II8bn7ISSnyiZOD2O83QEA', label: 'Spotify', image: SpotifyIcon },
  { href: 'https://www.instagram.com/projekt_krank/', label: 'Instagram', image: Insta },
  { href: 'https://mx3.ch/home/search?q=projekt+krank', label: 'MX3', image: Mx3 },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="site-shell flex flex-col gap-7 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <Link href="/#home" className="relative block h-14 w-40" aria-label="Zur Startseite">
            <Image src={Logo} alt="Projekt Krank" fill sizes="160px" className="object-contain object-left" />
          </Link>
          <span className="hidden h-8 w-px bg-white/10 sm:block" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-zinc-600">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              className="icon-button"
            >
              <span className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
                <Image src={social.image} alt="" fill sizes="20px" className="object-contain p-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
