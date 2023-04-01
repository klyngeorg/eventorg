import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="w-full max-w-md space-y-8">
      <h1 className="text-2xl text-center text-primary-900 font-bold">
        Hei 👋
      </h1>
      <p>
        Så hyggelig at du vil være med på vårt arrangementer. For å gjøre det
        enklere for alle må vi be deg om å fylle inn noen enkle opplysninger
        nedenfor.
      </p>
      <p>
        Les gjerne{' '}
        <a
          className="interactive-text-primary underline"
          href="https://klyngeorg.no/privacy"
        >
          vår personvernerklæring
        </a>{' '}
        om du lurer på hvordan vi lagrer disse og andre opplysninger.
      </p>
      <div className="bg-on-primary-container text-primary-container rounded-lg p-4 flex gap-3 flex-col">
        {[
          { key: 'Sted', value: 'Dette er en adresse' },
          { key: 'Dato og tidspunkt', value: '2023-03-01' },
        ].map((item, key) => (
          <div className="flex gap-3 flex-col sm:flex-row" key={key}>
            <dt className="text-sm font-bold">{item.key}</dt>
            <dd className="text-sm">{item.value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
