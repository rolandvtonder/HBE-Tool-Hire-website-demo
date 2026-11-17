/**
 * All copy and business details live here — pages only lay it out.
 *
 * Anything marked PLACEHOLDER must be confirmed or replaced by HBE before the
 * site goes live (domain, email, street address, hours, and the exact items in
 * each category, which are a typical tool-hire range, not a stock list).
 */

export const SITE = {
  url: 'https://www.hbetoolhire.co.za', // PLACEHOLDER — the live domain, no trailing slash
  name: 'HBE Tool Hire & Rentals',
  short: 'HBE',
  tagline: 'Tool hire & rentals in Durban',
  ogImage: '/media/og.jpg',
};

export const CONTACT = {
  phoneDisplay: '073 771 3494',
  phoneIntl: '+27737713494',
  whatsapp: '27737713494',
  email: 'info@hbetoolhire.co.za', // PLACEHOLDER
  street: '', // PLACEHOLDER — e.g. '12 Example Road, Wiggins'
  postal: '', // PLACEHOLDER — e.g. '4091'
  city: 'Durban',
  region: 'KwaZulu-Natal',
  regionCode: 'KZN',
  country: 'ZA',
};

export const address = () => [CONTACT.street, `${CONTACT.city}, ${CONTACT.region}`].filter(Boolean).join(', ');

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name} ${address()}`)}`;

/** Opening hours — PLACEHOLDER until HBE confirms. `schema` feeds the Google business data. */
export const HOURS: {days: string; time: string; schema: string[]; opens?: string; closes?: string}[] = [
  {days: 'Monday – Friday', time: '07:30 – 17:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '17:00'},
  {days: 'Saturday', time: '08:00 – 12:00', schema: ['Saturday'], opens: '08:00', closes: '12:00'},
  {days: 'Sunday & public holidays', time: 'Closed', schema: []},
];

export const waLink = (text = `Hi ${SITE.short}, I'd like a quote for tool hire.`) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:${CONTACT.phoneIntl}`;
export const mailLink = (subject = 'Tool hire quote', body = '') =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

/** Greater Durban / eThekwini delivery areas. */
export const AREAS = [
  'Durban CBD', 'Berea', 'Morningside', 'Glenwood', 'Musgrave', 'Overport', 'Wiggins & Cato Manor', 'Sydenham',
  'Durban North', 'Umhlanga', 'La Lucia', 'Mount Edgecombe', 'Phoenix', 'Verulam', 'Tongaat',
  'Westville', 'Pinetown', 'Kloof', 'Hillcrest', 'Gillitts', 'New Germany', 'Queensburgh',
  'Bluff', 'Montclair', 'Chatsworth', 'Umlazi', 'Isipingo', 'Amanzimtoti', 'KwaMashu', 'Inanda',
];

export const NAV = [
  {label: 'Home', href: '/'},
  {label: 'Equipment hire', href: '/equipment/'},
  {label: 'Delivery', href: '/delivery/'},
  {label: 'About us', href: '/about/'},
  {label: 'FAQ & terms', href: '/faq/'},
  {label: 'Contact & quote', href: '/contact/'},
];

export type Line = {t: string; i?: boolean};

/** Headline lines; `i` lines are set in italic yellow. */
export const HOME = {
  eyebrow: 'Tool hire & rentals · Durban, KZN',
  lines: [{t: 'Hire the'}, {t: 'right tool.', i: true}, {t: 'Delivered across'}, {t: 'Durban.', i: true}] as Line[],
  body: 'Breakers, compactors, generators and more — serviced, tested and ready to work. Collect from our yard or we’ll bring it to site anywhere in eThekwini.',
  promises: [
    {title: 'Serviced every hire', body: 'Every machine is cleaned, checked and test-run before it goes out — so it starts first time on your site.'},
    {title: 'Delivered to site', body: 'Delivery and collection across Greater Durban, from Umhlanga to Amanzimtoti and up to Hillcrest.'},
    {title: 'Quick quotes on WhatsApp', body: 'Tell us the job and the dates. We’ll come back with availability and a price — no forms, no runaround.'},
  ],
  steps: [
    {title: 'Ask for a quote', body: 'WhatsApp, call or use the quote form. Tell us what you need, when, and where.'},
    {title: 'Confirm & book', body: 'We confirm availability, the rate and what to bring on the day.'},
    {title: 'Collect or delivered', body: 'Pick it up from the yard or we drop it on site, with a quick run-through.'},
    {title: 'Return it', body: 'Bring it back — or we collect — when the job’s done. Need longer? Just let us know.'},
  ],
};

export type Item = {name: string; desc: string; uses: string[]};
export type Faq = {q: string; a: string};
export type Category = {
  slug: string;
  title: string;
  name: [string, string];
  short: string;
  image: string;
  imageAlt: string;
  /** Two short facts shown on the home-page panel. */
  panel: [string, string][];
  intro: string;
  items: Item[]; // PLACEHOLDER — typical range; replace with HBE's actual stock
  tips: string[];
  faqs: Faq[];
  metaTitle: string;
  metaDescription: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'breakers-drills',
    title: 'Breakers & Drills',
    name: ['Breakers', '& drills'],
    short: 'Demolition breakers, chipping hammers, rotary hammers and core drills.',
    image: 'breakers.webp',
    imageAlt: 'Worker in a hi-vis vest breaking up a pavement with a jackhammer',
    panel: [['For', 'Concrete, tiles, paving'], ['Hire', 'Daily · Weekend · Weekly']],
    intro:
      'From lifting old floor tiles to breaking out a concrete slab, the right breaker saves hours. We hire heavy demolition breakers, lighter chipping hammers and SDS rotary hammers for drilling into concrete and brick — each one serviced and supplied with the right chisels and bits for the job.',
    items: [
      {name: 'Heavy demolition breaker', desc: 'Electric jackhammer for breaking concrete slabs, foundations and thick paving.', uses: ['Slabs', 'Foundations', 'Paving']},
      {name: 'Medium breaker', desc: 'Lighter, easier to handle — ideal for walls, steps and smaller slabs.', uses: ['Walls', 'Steps', 'Renovation']},
      {name: 'Chipping hammer', desc: 'For lifting floor and wall tiles, screed and plaster quickly and cleanly.', uses: ['Tile removal', 'Screed', 'Plaster']},
      {name: 'SDS rotary hammer drill', desc: 'Drills and light chisels into concrete, brick and block.', uses: ['Anchors', 'Chasing', 'Fixing']},
      {name: 'Core drill', desc: 'Clean round holes through walls and slabs for pipes, cables and ducting.', uses: ['Plumbing', 'Electrical', 'Aircon']},
    ],
    tips: [
      'Tell us the material and thickness — we’ll match the breaker and chisel.',
      'Wear hearing, eye and dust protection when breaking concrete.',
      'Check for buried pipes and cables before you start.',
    ],
    faqs: [
      {q: 'Which breaker do I need for floor tiles?', a: 'A chipping hammer with a wide tile chisel is usually best for lifting tiles and adhesive. For a full slab, step up to a demolition breaker. Tell us the job and we’ll recommend one.'},
      {q: 'Do chisels and bits come with the hire?', a: 'Breakers go out with a chisel suited to your job. Ask us for extra or specialist chisels and drill bits when you book.'},
    ],
    metaTitle: 'Breaker & Jackhammer Hire Durban | HBE Tool Hire',
    metaDescription: 'Hire demolition breakers, jackhammers, chipping hammers, SDS rotary hammers and core drills in Durban. Serviced kit, delivered across eThekwini. Get a quote on WhatsApp.',
  },
  {
    slug: 'compactors',
    title: 'Compactors & Rammers',
    name: ['Compactors', '& rammers'],
    short: 'Plate compactors and rammers for paving, trenches and foundations.',
    image: 'compaction.webp',
    imageAlt: 'Orange rammer compactor standing on prepared ground at a building site',
    panel: [['For', 'Paving, trenches, bases'], ['Fuel', 'Petrol, ready to start']],
    intro:
      'A solid base is the difference between paving that lasts and paving that sinks. Our plate compactors and rammers compact sand, gravel and soil for driveways, paving, trenches and foundations — fuelled, serviced and ready to work.',
    items: [
      {name: 'Plate compactor', desc: 'Forward plate compactor for sand and crusher-run bases under paving and driveways.', uses: ['Paving', 'Driveways', 'Patios']},
      {name: 'Reversible plate compactor', desc: 'Heavier, forward-and-reverse plate for deeper layers and bigger areas.', uses: ['Large areas', 'Deep fill', 'Sub-base']},
      {name: 'Rammer (jumping jack)', desc: 'For trenches, foundations and cohesive soils where a plate can’t reach.', uses: ['Trenches', 'Foundations', 'Backfill']},
      {name: 'Paving pad', desc: 'Rubber pad that fits the plate compactor to bed in pavers without damaging them.', uses: ['Pavers', 'Interlocking blocks']},
    ],
    tips: [
      'Compact in thin layers — about 100–150 mm at a time works best.',
      'Slightly damp material compacts better than bone-dry sand.',
      'Ask for a paving pad if you’re running over laid pavers.',
    ],
    faqs: [
      {q: 'Plate compactor or rammer?', a: 'Plates suit granular material like sand and crusher-run over open areas. Rammers are better for trenches, tight spots and clay-type soils.'},
      {q: 'Does the compactor come with fuel?', a: 'Petrol machines go out ready to start. We’ll explain fuel and return conditions when you book.'},
    ],
    metaTitle: 'Plate Compactor & Rammer Hire Durban | HBE Tool Hire',
    metaDescription: 'Plate compactor and rammer (jumping jack) hire in Durban for paving, driveways, trenches and foundations. Delivered across eThekwini. WhatsApp HBE for a quote.',
  },
  {
    slug: 'generators',
    title: 'Generators & Power',
    name: ['Generators', '& power'],
    short: 'Petrol and diesel generators, leads and site lighting for load-shedding and sites.',
    image: 'generators.webp',
    imageAlt: 'Man smiling while setting up a portable generator outside',
    panel: [['For', 'Sites, events, outages'], ['Includes', 'Leads on request']],
    intro:
      'Keep tools running on sites without power, at outdoor events or through outages. We hire petrol and diesel generators sized from small backup units to site sets, plus extension leads and lighting. Tell us what you need to run and we’ll size it for you.',
    items: [
      {name: 'Portable petrol generator', desc: 'Compact unit for hand tools, lights and small appliances.', uses: ['Hand tools', 'Backup', 'Events']},
      {name: 'Site generator', desc: 'Larger output for breakers, mixers and several tools at once.', uses: ['Building sites', 'Workshops']},
      {name: 'Diesel generator', desc: 'For longer run times and heavier, continuous loads.', uses: ['Long jobs', 'Heavy loads']},
      {name: 'Extension leads & distribution box', desc: 'Heavy-duty leads and multi-outlet boxes to power the site safely.', uses: ['Site power', 'Events']},
      {name: 'Site lighting', desc: 'Work lights for early starts, late finishes and indoor jobs.', uses: ['Night work', 'Indoor']},
    ],
    tips: [
      'List what you’ll run — we’ll add up the load and size the generator.',
      'Never run a generator indoors or in a closed garage.',
      'Keep it level, dry and away from open windows.',
    ],
    faqs: [
      {q: 'What size generator do I need?', a: 'Add up the wattage of everything you’ll run at the same time, and allow extra for motors that draw more at start-up. Send us the list and we’ll size it for you.'},
      {q: 'Can I hire a generator for load-shedding at home?', a: 'Yes. We’ll recommend a unit for what you want to run and explain safe connection — never back-feed into your house wiring without a qualified electrician.'},
    ],
    metaTitle: 'Generator Hire Durban | Petrol & Diesel | HBE Tool Hire',
    metaDescription: 'Petrol and diesel generator hire in Durban for building sites, events and load-shedding. Leads and site lighting available. Delivered across eThekwini.',
  },
  {
    slug: 'concrete',
    title: 'Concrete & Mixing',
    name: ['Concrete', '& mixing'],
    short: 'Concrete mixers, poker vibrators, power floats and wheelbarrows.',
    image: 'concrete.webp',
    imageAlt: 'Builder loading sand and stone into a concrete mixer on site',
    panel: [['For', 'Slabs, footings, plaster'], ['Power', 'Electric & petrol']],
    intro:
      'Mix, place and finish concrete without the back-breaking work. We hire electric and petrol concrete mixers, poker vibrators to remove air pockets, power floats for a smooth finish, and the barrows to move it all.',
    items: [
      {name: 'Electric concrete mixer', desc: 'Drum mixer for concrete, mortar and plaster where there’s power on site.', uses: ['Mortar', 'Plaster', 'Small slabs']},
      {name: 'Petrol concrete mixer', desc: 'Same job, no power point needed.', uses: ['Remote sites', 'Footings']},
      {name: 'Poker vibrator', desc: 'Removes air pockets for stronger, denser concrete in slabs and columns.', uses: ['Slabs', 'Columns', 'Beams']},
      {name: 'Power float (helicopter)', desc: 'Trowels a fresh slab to a smooth, hard finish.', uses: ['Floors', 'Garages']},
      {name: 'Wheelbarrow', desc: 'Heavy-duty builder’s barrow.', uses: ['Moving mix', 'Rubble']},
    ],
    tips: [
      'Wash the drum out before it sets — return the mixer clean.',
      'Plan your pour: mixer, vibrator and barrows on site before you start.',
      'Wear gloves and eye protection; wet cement burns skin.',
    ],
    faqs: [
      {q: 'Do I need an electric or petrol mixer?', a: 'If there’s a plug point nearby, electric is quieter and simpler. For sites without power, choose petrol.'},
      {q: 'What if concrete sets in the mixer?', a: 'Rinse the drum out as soon as you finish. Cleaning set concrete out of a returned mixer is charged.'},
    ],
    metaTitle: 'Concrete Mixer Hire Durban | Vibrators & Floats | HBE',
    metaDescription: 'Hire electric and petrol concrete mixers, poker vibrators and power floats in Durban. Serviced, delivered across eThekwini. Quick quotes on WhatsApp.',
  },
  {
    slug: 'cutting-grinding',
    title: 'Cutting & Grinding',
    name: ['Cutting', '& grinding'],
    short: 'Angle grinders, floor saws, brick saws, tile cutters and chop saws.',
    image: 'cutting.webp',
    imageAlt: 'Sparks flying from an angle grinder cutting metal in a workshop',
    panel: [['For', 'Steel, brick, tile, paving'], ['Blades', 'Matched to the job']],
    intro:
      'Clean, accurate cuts through steel, brick, paving, tile and concrete. We hire angle grinders, floor saws for cutting slabs and roads, wet brick and tile saws, and chop saws — with the right blade or disc for your material.',
    items: [
      {name: 'Angle grinder (115 mm / 230 mm)', desc: 'Cutting and grinding steel, paving and masonry.', uses: ['Steel', 'Paving', 'Chasing']},
      {name: 'Floor saw / road cutter', desc: 'Straight, deep cuts in concrete slabs and tar.', uses: ['Slabs', 'Driveways', 'Roads']},
      {name: 'Brick & block saw', desc: 'Bench saw for accurate cuts in brick, block and pavers.', uses: ['Bricks', 'Pavers', 'Block']},
      {name: 'Tile cutter', desc: 'Wet tile saw and manual cutters for porcelain and ceramic.', uses: ['Porcelain', 'Ceramic']},
      {name: 'Chop saw', desc: 'Square cuts in steel tube, angle and bar.', uses: ['Steel', 'Fabrication']},
    ],
    tips: [
      'Tell us the material — the blade matters more than the machine.',
      'Use water suppression when cutting masonry to keep silica dust down.',
      'Always keep the guard on and wear eye and hearing protection.',
    ],
    faqs: [
      {q: 'Are blades included?', a: 'Saws go out with a blade suited to your material. Diamond blades are charged on wear — we measure before and after the hire. We’ll confirm when you book.'},
      {q: 'Can I cut porcelain tiles with a grinder?', a: 'You can, but a wet tile saw gives cleaner edges and less chipping. Ask us which suits your tiles.'},
    ],
    metaTitle: 'Floor Saw, Grinder & Tile Cutter Hire Durban | HBE',
    metaDescription: 'Hire angle grinders, floor saws, brick saws, tile cutters and chop saws in Durban. Right blade for your material. Delivered across eThekwini.',
  },
  {
    slug: 'scaffolding-ladders',
    title: 'Scaffolding & Ladders',
    name: ['Scaffolding', '& ladders'],
    short: 'Frame scaffolding, mobile towers, step and extension ladders, trestles.',
    image: 'access.webp',
    imageAlt: 'Worker in a yellow hard hat on scaffolding against a blue building',
    panel: [['For', 'Painting, roofing, ceilings'], ['Hire', 'By the week']],
    intro:
      'Work at height safely. We hire frame scaffolding, mobile scaffold towers on wheels, step and extension ladders, and trestles with planks — for painting, gutters, ceilings, roofing and building work.',
    items: [
      {name: 'Frame scaffolding', desc: 'Modular frames, braces and boards, hired by the set.', uses: ['Building', 'Plastering', 'Painting']},
      {name: 'Mobile scaffold tower', desc: 'Lockable wheels for moving along walls and ceilings.', uses: ['Ceilings', 'Painting', 'Shopfitting']},
      {name: 'Extension ladder', desc: 'For gutters, roofs and high walls.', uses: ['Gutters', 'Roofs']},
      {name: 'Step ladder', desc: 'Freestanding steps in a range of heights.', uses: ['Indoor', 'Ceilings']},
      {name: 'Trestles & planks', desc: 'Low-level working platform for ceilings and walls.', uses: ['Ceilings', 'Drywall']},
    ],
    tips: [
      'Tell us the working height and the ground conditions.',
      'Always lock tower wheels and fit guardrails before climbing.',
      'Set ladders at a 1-in-4 angle and tie or foot them.',
    ],
    faqs: [
      {q: 'How much scaffolding do I need?', a: 'Send us the wall length and working height (a photo helps). We’ll work out the number of sets.'},
      {q: 'Do you erect the scaffolding?', a: 'Ask us when you book. We’ll explain the options and how to assemble it safely.'},
    ],
    metaTitle: 'Scaffolding & Ladder Hire Durban | HBE Tool Hire',
    metaDescription: 'Scaffolding, mobile scaffold towers, extension ladders, step ladders and trestles for hire in Durban. Delivered across eThekwini. Get a quote.',
  },
  {
    slug: 'garden-landscaping',
    title: 'Garden & Landscaping',
    name: ['Garden', '& landscaping'],
    short: 'Brushcutters, chainsaws, mowers, hedge trimmers and post-hole augers.',
    image: 'garden.webp',
    imageAlt: 'Man cutting a log with an orange chainsaw, sawdust flying',
    panel: [['For', 'Clearing, cutting, digging'], ['Fuel', 'Petrol, ready to start']],
    intro:
      'Clear an overgrown plot, cut back trees after a storm or dig post holes for a new fence. We hire petrol brushcutters, chainsaws, lawnmowers, hedge trimmers and augers — sharpened, serviced and ready to go.',
    items: [
      {name: 'Brushcutter', desc: 'For long grass, bush and overgrown verges.', uses: ['Clearing', 'Verges']},
      {name: 'Chainsaw', desc: 'Cutting logs, branches and fallen trees.', uses: ['Trees', 'Firewood', 'Storm clean-up']},
      {name: 'Lawnmower', desc: 'Petrol mower for regular lawns and bigger yards.', uses: ['Lawns']},
      {name: 'Hedge trimmer', desc: 'Tidy hedges and shrubs fast.', uses: ['Hedges', 'Shrubs']},
      {name: 'Auger / post-hole digger', desc: 'Petrol auger for fence posts, poles and planting.', uses: ['Fencing', 'Planting']},
    ],
    tips: [
      'Wear chaps, gloves, goggles and hearing protection with chainsaws.',
      'Clear stones and wire before brushcutting.',
      'Call before you dig — check for buried services.',
    ],
    faqs: [
      {q: 'Is the chainsaw sharpened before hire?', a: 'Yes. Every chainsaw goes out with a sharp, correctly tensioned chain.'},
      {q: 'Do you hire safety gear for chainsaws?', a: 'Ask us when you book — we’ll tell you what protection you need for the job.'},
    ],
    metaTitle: 'Chainsaw, Brushcutter & Garden Tool Hire Durban | HBE',
    metaDescription: 'Hire chainsaws, brushcutters, lawnmowers, hedge trimmers and post-hole augers in Durban. Serviced and sharpened. Delivered across eThekwini.',
  },
  {
    slug: 'cleaning-pumps',
    title: 'Cleaning & Water Pumps',
    name: ['Cleaning', '& pumps'],
    short: 'Pressure washers, wet & dry vacuums, floor machines and water pumps.',
    image: 'cleaning.webp',
    imageAlt: 'Person in a yellow rain jacket pressure washing the side of a house',
    panel: [['For', 'Walls, paving, flooding'], ['Power', 'Electric & petrol']],
    intro:
      'Blast years of grime off driveways and walls, clean up after builders, or pump out a flooded basement. We hire electric and petrol pressure washers, wet & dry vacuums, floor scrubbers and submersible water pumps.',
    items: [
      {name: 'Pressure washer (electric)', desc: 'For patios, cars, walls and outdoor furniture.', uses: ['Patios', 'Walls', 'Vehicles']},
      {name: 'Pressure washer (petrol)', desc: 'Higher pressure for driveways, roofs and big areas.', uses: ['Driveways', 'Roofs', 'Large areas']},
      {name: 'Wet & dry vacuum', desc: 'Builder’s clean-up, spills and dust.', uses: ['Builders’ clean', 'Spills']},
      {name: 'Floor scrubber / polisher', desc: 'Deep-cleans and polishes hard floors.', uses: ['Tiles', 'Shops', 'Offices']},
      {name: 'Submersible water pump', desc: 'Drains flooded areas, pools and excavations.', uses: ['Flooding', 'Pools', 'Trenches']},
    ],
    tips: [
      'Test a small area first — high pressure can damage soft surfaces.',
      'Keep electrical leads out of standing water.',
      'Tell us how deep and how dirty the water is for pump hire.',
    ],
    faqs: [
      {q: 'Electric or petrol pressure washer?', a: 'Electric suits homes, cars and patios. Petrol gives more pressure for driveways, roofs and commercial jobs.'},
      {q: 'Can the pump handle muddy water?', a: 'Some pumps handle dirty water better than others. Tell us what you’re pumping and we’ll match the pump.'},
    ],
    metaTitle: 'Pressure Washer & Water Pump Hire Durban | HBE Tool Hire',
    metaDescription: 'Hire pressure washers, wet & dry vacuums, floor scrubbers and submersible water pumps in Durban. Electric and petrol. Delivered across eThekwini.',
  },
];

/** The three categories on the home-page panels. */
export const FEATURED = ['breakers-drills', 'compactors', 'generators'];

/** General FAQs — wording is general; PLACEHOLDER where HBE's own policy must be confirmed. */
export const FAQ_GROUPS: {title: string; faqs: Faq[]}[] = [
  {
    title: 'Hiring',
    faqs: [
      {q: 'What do I need to hire equipment?', a: 'Bring a valid South African ID, passport or driver’s licence and proof of address. Companies can hire on an order number. We’ll confirm exactly what to bring when you book.'},
      {q: 'How do I book?', a: 'WhatsApp or call us on 073 771 3494, or send the quote form. Tell us the item, the dates and whether you need delivery. We’ll confirm availability and the rate.'},
      {q: 'How long can I hire for?', a: 'We quote daily, weekend and weekly rates. Need it longer? Let us know before your hire ends and we’ll extend it.'},
      {q: 'I’m not sure which tool I need. Can you help?', a: 'Yes — that’s what we’re here for. Tell us the job (or send a photo) and we’ll recommend the right machine.'},
    ],
  },
  {
    title: 'Payment & deposits',
    faqs: [
      {q: 'Is there a deposit?', a: 'Most items need a refundable deposit, paid back when the equipment comes back clean and undamaged. We’ll tell you the amount with your quote.'},
      {q: 'How can I pay?', a: 'We’ll confirm the payment options when you book.'},
    ],
  },
  {
    title: 'Delivery & collection',
    faqs: [
      {q: 'Do you deliver?', a: 'Yes — across Greater Durban and eThekwini. The delivery cost depends on distance and the size of the equipment, and is included in your quote.'},
      {q: 'Can I collect myself?', a: 'Of course. Collect from our yard during opening hours. Larger machines may need a bakkie or trailer — ask us.'},
    ],
  },
  {
    title: 'Care & breakdowns',
    faqs: [
      {q: 'What if the equipment breaks down?', a: 'Stop using it and call or WhatsApp us straight away. Don’t try to repair it yourself — we’ll sort out a fix or a swap.'},
      {q: 'Do machines come with fuel?', a: 'Petrol and diesel machines go out ready to start. We’ll explain how to return them when you book.'},
      {q: 'What about damage or loss?', a: 'Fair wear and tear is on us. Damage from misuse, and loss or theft while on hire, is the hirer’s responsibility.'},
    ],
  },
];

/** Summary of hire conditions — PLACEHOLDER: replace with HBE's own terms. */
export const TERMS = [
  'The hirer is responsible for the equipment from the time it is collected or delivered until it is returned or collected.',
  'Equipment must be used only for its intended purpose, by a competent person, following the safety guidance given.',
  'Equipment may not be sub-hired, lent out or moved to another site without our agreement.',
  'Return equipment clean and in the condition it was hired. Cleaning, repairs and missing parts are charged.',
  'Report any breakdown or damage immediately. Do not attempt repairs.',
  'Hire continues until the equipment is returned. Late returns are charged at the daily rate.',
  'Loss or theft while on hire is charged at replacement value.',
  'For delivery, safe access and someone to receive the equipment must be available at the agreed time.',
];

export const ABOUT = {
  lines: [{t: 'Local tools.'}, {t: 'Straight answers.', i: true}] as Line[],
  body: 'HBE Tool Hire & Rentals supplies serviced construction, DIY and garden equipment to builders, contractors and homeowners across Durban.',
  // PLACEHOLDER — replace with HBE's own story (when and why it started, who runs it).
  story: [
    'We started HBE for a simple reason: getting the right tool shouldn’t be the hardest part of the job. Builders, contractors and homeowners need equipment that works first time, a straight answer on price, and someone who picks up the phone.',
    'So that’s how we run it. Every machine is cleaned, checked and test-run between hires. We tell you honestly which tool suits the job — even if that means the cheaper one. And we deliver across eThekwini, so you can stay on site.',
  ],
  values: [
    {title: 'Ready to work', body: 'Serviced, fuelled where needed and test-run before every hire.'},
    {title: 'Honest advice', body: 'We’ll match the machine to the job — not upsell you a bigger one.'},
    {title: 'Local & reachable', body: 'Durban-based, on WhatsApp and the phone, with delivery across eThekwini.'},
  ],
};

export const DELIVERY = {
  steps: [
    {title: 'Tell us where & when', body: 'Send the site address, the date and a contact person on site.'},
    {title: 'We quote delivery', body: 'Delivery and collection cost depends on distance and equipment size — it’s included in your quote.'},
    {title: 'We drop it on site', body: 'We offload, do a quick run-through and you sign the hire agreement.'},
    {title: 'We collect it', body: 'Let us know when you’re done and we’ll arrange collection.'},
  ],
  notes: [
    'Someone must be on site to receive the equipment and sign for it.',
    'Make sure there’s safe access for our vehicle and space to offload.',
    'Book delivery as early as you can — especially for weekends.',
    'Outside Greater Durban? Ask us — we may still be able to help.',
  ],
};
