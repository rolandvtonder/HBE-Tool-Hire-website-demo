import {CategoryGrid, PageHero} from '../components/Blocks';
import {useReveals} from '../hooks/useReveals';
import {u} from '../lib/url';

export function NotFound() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Error 404"
        lines={[{t: 'Wrong'}, {t: 'turn.', i: true}]}
        body="That page isn’t here — it may have moved. Try one of the equipment ranges below, or head back home."
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'Page not found', href: '/404/'},
        ]}
      >
        <a href={u('/')} className="caps mt-8 inline-flex min-h-12 items-center bg-yellow px-6 py-3.5 text-ink hover:bg-white">
          Back to home
        </a>
      </PageHero>
      <section className="bg-ink">
        <div className="wrap section-y">
          <CategoryGrid />
        </div>
      </section>
    </div>
  );
}
