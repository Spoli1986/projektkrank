import React from 'react';
import Image from 'next/image';
import Stefu from '../../../public/band/stefu.jpg';
import Peter from '../../../public/band/peter.jpg';
import Hene from '../../../public/band/hene.jpg';
import Dave from '../../../public/band/dave.jpg';

type Props = {};

function Band({}: Props) {
  return (
    <div className="text-white mt-32">
      <div className="flex flex-col mt-20 items-center justify-center gap-4">
        <div className="md:grid md:grid-cols-2 lg:w-[850px] md:w-[90%] items-center flex flex-col justify-center md:justify-items-stretch align-middle">
          <div className="sm:w-max">
            <Image src={Stefu} alt="Stefu" width={300} />
          </div>
          <p className="w-[80%]">
            In zahlreichen Bands passiert es oft, dass es nach einer gewissen Zeit nicht mehr optimal funktioniert und
            Interessenskonflikte entstehen. Aus denselben Gründen haben sich Stefan (Voc, Git, Samples) und Heinz (Voc,
            Git) im 2015 von ihrer damaligen Metal-Band getrennt. Stefan investierte von da an mehr Zeit in sein
            Nebenprojekt und wurde dabei oft von Heinz unterstützt. Zu zweit starteten sie schließlich das Songwriting
            und so wurde das Nebenprojekt nur kurze Zeit später offiziell in &quot;Projekt Krank&quot; (PK) umbenannt.
          </p>
        </div>
        <div className="md:grid md:grid-cols-2 lg:w-[850px] md:w-[90%] flex flex-col-reverse items-center justify-center md:justify-items-stretch align-middle">
          <p className="w-[80%]">
            Beide wollten mehr als 08/15-Metal kreieren. Kreativität, Individualität und Variabilität wurden groß
            geschrieben. Die depressive Stimmung, die zuvor noch herrschte, wurde gleich in die Songs verpackt. Zu
            Beginn schrieben die Zwei eher theatralische Metal-Songs, mal schleppende, mal schnelle. PK sollte aber
            nicht nur für ein Genre stehen, sondern auch mal für Black-Metal, Industrial, mal in Deutsch oder Mundart
            gesungen, mal clean, crowl oder gescreemt. Es sollte einfach alles Platz finden, solange es in das Konzept
            passte.
          </p>
          <div className="sm:w-max">
            <Image src={Hene} alt="Hene" width={300} />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 lg:w-[850px] md:w-[90%] flex flex-col-reverse items-center justify-center md:justify-items-stretch align-middle">
          <div className="sm:w-max">
            <Image src={Dave} alt="Dave" width={300} />
          </div>
          <p className="w-[80%]">
            Später stieß Shadow als Bassist hinzu und sie beschlossen, nur als Trio, mit Drumcomputer und vielen
            Samples, eine erste CD in Eigenproduktion zu produzieren. In dieser Besetzung wollten sie ab 2017 auch
            Konzerte spielen. Es war eine sehr lehrreiche, spannende Zeit und viele Türen haben sich geöffnet. Eine
            tolle Band-Chemie, wie man sie früher nicht kannte, hat einen kreativen Freiraum für das Schaffen der Musik
            entstehen lassen. Doch leider kam 2019 der Ausstieg von Shadow, weshalb Stefan und Heinz gezwungen waren,
            den Bass neu zu besetzen. Mit Davill wurde jedoch rasch ein würdiger Ersatz gefunden. Weil die Band sowieso
            gerade im Umbruch war und oft Diskussionen zum Thema Drumcomputer geführt wurden, entschied sich
            &quot;Projekt Krank&quot; nun auch für einen Schlagzeuger aus Fleisch und Blut. Dieser Platz konnte sehr
            schnell mit Peter besetzt werden.
          </p>
        </div>
        <div className="md:grid md:grid-cols-2 lg:w-[850px] md:w-[90%] flex flex-col-reverse items-center justify-items-stretch ">
          <p className="w-[80%]">
            Bereits nach ein paar wenigen Stunden zu viert im Übungsraum, stand PK 2020 zum ersten Mal mit dem neuen
            Line-Up auf der Bühne. Dann kam fucking Corona. Sie beschlossen, sich während dieser Zeit mit einer
            EP-Produktion vertraut zu machen und setzten im eigenen Studio &quot;Labor 4&quot; die Aufnahmen von vier
            Songs in die Tat um. Diese wurden von V.O. Pulver vom &quot;Little Creek Studio&quot; gemischt und
            gemastert. Mittlerweile löste sich die Band ein wenig von den depressiven, überlangen Songs und kreierte
            sogar Offbeat Metal-Songs, zu welchen es sich gut tanzen lässt. Nach Abschluss der EP war PK überzeugt, den
            nächsten Schritt einleiten zu können.
          </p>
          <div className="sm:w-max">
            <Image src={Peter} alt="Peter" width={300} />
          </div>
        </div>
        <p className="lg:w-[850px] md:w-[90%] w-[80%]">
          Die vier Jungs, oder besser gesagt schon etwas ältere Jungs mit Erfahrung, haben sich nun richtig wohl gefühlt
          bei &quot;Projekt Krank&quot;. Die vier Laborratten, wie sie sich selbst gerne bezeichnen, schrieben mit der
          Zeit immer anspruchsvollere Songs. Für alle ist nicht nur die zusammen erschaffene Musik wichtig, sondern auch
          die gemeinsame Zeit, dies macht den Band-Spirit aus. &quot;Projekt Krank&quot; ist für die Bandmitglieder wie
          ein Psychiater, der ihnen dabei hilft, den ganzen Alltags-Shit sowie die kranke Welt zu vergessen und zu
          verarbeiten.
        </p>
        <p className="lg:w-[850px] md:w-[90%] w-[80%]">
          Die Band wollte nun nicht mehr nur im Proberaum rumsitzen, Songs schreiben und gelegentlich einen Gig spielen.
          Deshalb beschloss sie Anfang 2021, ein erstes Album zu produzieren und dieses mit Hilfe eines Labels zu
          vertreiben. Das Liedgut sollte das Licht der Welt erblicken, daher erschien dieser Weg als das einzig
          Vernünftige. Schließlich begannen die ersten Vorproduktionen für das erste 12-Track Album. Der Fokus lag 2021
          bis 2023 ganz klar auf den Aufnahmen zum neuen Album. Viel Zeit und Herzblut steckte die Band in dieses
        </p>
        <p className="lg:w-[850px] md:w-[90%] w-[80%]">
          Projekt. Daher spielten sie nur wenige Livegigs, z.B. als Support von &quot;Ost+Front&quot;. Aufgenommen
          wurden alle Songs, wie schon bei der EP, im eigenen Studio &quot;Labor4&quot; und mit &quot;Boersma
          Records&quot; fanden die Jungs ein sympatisches Label. Im Herbst 2023 waren alle Aufnahmen beendet.
          Anschließend standen Mix und Master auf dem Programm. Hier konnte Ralph Beier von &quot;Ashburn
          Productions&quot; gewonnen werden, der einen hervorragenden Mix und ein wuchtiges Master gezaubert hat. Neben
          der CD produzierten sie im Herbst auch noch zwei Videoclips bei &quot;Musikclip.ch&quot;.
        </p>
        <p className="lg:w-[850px] md:w-[90%] w-[80%]">
          Im Frühjahr 2024 wird das Release vom neuen Album stattfinden. Danach will PK wieder regelmäßig und oft
          Konzerte spielen. Live darf man sich nebst einer abwechslungsreichen Songauswahl auch auf eine stimmungsvolle,
          auf die Songs abgestimmte Lichtshow freuen.
        </p>
      </div>
    </div>
  );
}

export default Band;
