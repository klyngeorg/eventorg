import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex flex-col gap-3 max-w-lg">
    <h1 className="text-xl font-bold">Våre salgsbetingelser</h1>
    <div className="flex flex-col gap-3">
      <p>
        Dette kjøpet er regulert av de nedenstående standard salgsbetingelser
        for forbrukerkjøp av varer over Internett. Forbrukerkjøp over internett
        reguleres hovedsakelig av avtaleloven, forbrukerkjøpsloven,
        markedsføringsloven, angrerettloven og ehandelsloven, og disse lovene
        gir forbrukeren ufravikelige rettigheter.
      </p>
      <p>
        Vilkårene i denne avtalen skal ikke forstås som noen begrensning i de
        lovbestemte rettighetene, men oppstiller partenes viktigste rettigheter
        og plikter for handelen.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Avtalen</h2>
      <p>
        Avtalen består av disse salgsbetingelsene, opplysninger gitt i
        bestillingsløsningen og eventuelt særskilt avtalte vilkår. Ved eventuell
        motstrid mellom opplysningene, går det som særskilt er avtalt mellom
        partene foran, så fremt det ikke strider mot ufravikelig lovgivning.
      </p>
      <p>
        Avtalen vil i tillegg bli utfylt av relevante lovbestemmelser som
        regulerer kjøp av varer mellom næringsdrivende og forbrukere.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Partene</h2>
      <p>
        Partene i avtalen er Klynge Næringsforening, org.nr. 930 334 693, med
        registrert adresse i Myntgata 2, 0151 Oslo, og kjøperen.
      </p>
      <p>
        Kjøper er den forbruker eller foretak som foretar bestillingen, og
        betegnes i det følgende som kjøper/kjøperen.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Pris</h2>
      <p>
        Den oppgitte prisen for varen og tjenester er den totale prisen kjøper
        skal betale. Denne prisen inkluderer alle avgifter og tilleggskostnader.
        Ytterligere kostnader som selger før kjøpet ikke har informert om, skal
        kjøper ikke bære.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Avtaleinngåelse</h2>
      <p>
        Avtalen er bindende for begge parter når kjøperen har sendt sin
        bestilling til selgeren.
      </p>
      <p>
        Avtalen er likevel ikke bindende hvis det har forekommet skrive- eller
        tastefeil i tilbudet fra selgeren i bestillingsløsningen i løsningen
        eller i kjøperens bestilling, og den annen part innså eller burde ha
        innsett at det forelå en slik feil.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Betalingen</h2>
      <p>
        Selgeren kan kreve betaling for varen fra det tidspunkt den blir sendt
        fra selgeren til kjøperen.
      </p>
      <p>
        Dersom kjøperen bruker kredittkort eller debetkort ved betaling, kan
        selgeren reservere kjøpesummen på kortet ved bestilling. Kortet blir
        belastet samme dag som varen sendes.
      </p>
      <p>
        Ved betaling med faktura, blir fakturaen til kjøperen utstedt ved
        forsendelse av varen. Betalingsfristen fremgår av fakturaen og er på
        minimum 10 dager fra mottak.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Levering</h2>
      <p>
        Kjøp av billetter er levering skjedd umiddelbart selger har sendt e-post
        med bekreftelse.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Angrerett</h2>
      <p>
        Det er ikke angrerett på billetter som er kjøpt på nettet. Dette følger
        av angrerettloven § 22.
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">Oppfyllelse</h2>
      <p>
        Kjøper kan fastholde kjøpet og kreve oppfyllelse fra selger. Kjøper kan
        imidlertid ikke kreve oppfyllelse dersom det foreligger en hindring som
        selgeren ikke kan overvinne, eller dersom oppfyllelse vil medføre en så
        stor ulempe eller kostnad for selger at det står i vesentlig misforhold
        til kjøperens interesse i at selgeren oppfyller. Skulle vanskene falle
        bort innen rimelig tid, kan kjøper likevel kreve oppfyllelse.
      </p>
      <p>
        Kjøperen taper sin rett til å kreve oppfyllelse om vedkommende venter
        urimelig lenge med å fremme kravet.
      </p>
    </div>
  </div>
);

export default Page;
