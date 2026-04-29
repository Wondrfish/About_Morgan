/* ─────────────────────────────────────────────────────────────
   Morgan State University — Interactive History Timeline
   Built with React 18 + Babel (browser-transpiled JSX)
───────────────────────────────────────────────────────────── */
'use strict';

const { useState, useEffect, useRef, useMemo } = React;

// ── ERA DEFINITIONS ──────────────────────────────────────────
const ERAS = [
  { id: 'all',      label: 'All Eras',                color: '#003893' },
  { id: 'founding', label: '🌱 Founding (1864–1900)', color: '#5b21b6' },
  { id: 'early',    label: '🏗️ Early Growth (1901–1939)', color: '#065f46' },
  { id: 'civil',    label: '✊ Civil Rights (1940–1974)', color: '#92400e' },
  { id: 'modern',   label: '🎓 Modern MSU (1975–Now)', color: '#003893' },
];

const ERA_THEME = {
  founding: { bar: '#7c3aed', glow: 'rgba(124,58,237,0.25)', light: '#ede9fe', dot: '#7c3aed' },
  early:    { bar: '#059669', glow: 'rgba(5,150,105,0.25)',  light: '#d1fae5', dot: '#059669' },
  civil:    { bar: '#d97706', glow: 'rgba(217,119,6,0.25)',  light: '#fef3c7', dot: '#d97706' },
  modern:   { bar: '#003893', glow: 'rgba(0,56,147,0.25)',   light: '#dbeafe', dot: '#2563eb' },
};

const TAG_COLORS = {
  Origins:       '#7c3aed',
  Governance:    '#0891b2',
  Academics:     '#1d4ed8',
  Legal:         '#475569',
  Inclusion:     '#be185d',
  Faculty:       '#065f46',
  Campus:        '#92400e',
  Leadership:    '#1d4ed8',
  'Civil Rights':'#b91c1c',
  Recognition:   '#b45309',
  Milestone:     '#ea580c',
  Legacy:        '#6b21a8',
};

// ── ALL 30 EVENTS ─────────────────────────────────────────────
const EVENTS = [
  {
    id: 1, year: 1864, era: 'founding', icon: '✊', tag: 'Origins',
    title: 'The Visionary Founders',
    subtitle: 'African-American Ministers Plant the Seed',
    summary: 'African-American ministers develop a vision for an institution to train free and newly-freed African Americans.',
    description: 'The founding of what is now Morgan State University began as early as 1864, when African-American ministers in the newly-established Washington Conference of the Methodist Episcopal Church — most of them associated with Sharp Street Methodist Episcopal Church — developed a vision and plans for an institution for the training of free and newly-freed African Americans. They sought the support of white religious leaders in the Baltimore Conference of the Methodist Episcopal Church to help establish the school.',
    people: ['Rev. Benjamin Brown', 'Rev. Samuel Green, Sr.', 'Rev. Elijah Grissom', 'Rev. James Harper', 'Rev. James Peck'],
    milestone: true,
  },
  {
    id: 2, year: 1866, era: 'founding', icon: '📋', tag: 'Governance',
    title: 'First Board of Trustees Formed',
    subtitle: 'Christmas Day, December 25, 1866',
    summary: 'Thirteen leaders of the Baltimore Conference form the Board of Trustees with a $5,000 budget.',
    description: 'On Christmas Day in 1866, thirteen white leaders of the Baltimore Conference of the Methodist Church met to form the Board of Trustees for The Centenary Biblical Institute of the Methodist Episcopal Church. With a starting budget of $5,000, they named the institute in honor of the 100th anniversary of the Methodist Episcopal Church — thus the name "Centenary Biblical Institute." The effort was led by Bishop Levi Scott, who had presided at the founding meeting of the Washington Conference.',
    people: ['Bishop Levi Scott'],
    milestone: true,
  },
  {
    id: 3, year: 1867, era: 'founding', icon: '📚', tag: 'Academics',
    title: 'First Class Offered',
    subtitle: 'April 30, 1867 — Nine Students',
    summary: 'The first "systematic course of lectures" is delivered to nine prospective ministers at Sharp Street Church.',
    description: 'On Tuesday, April 30, 1867, the institution offered its first class — a "systematic course of lectures" — delivered by Rev. James H. Brown in the lecture hall at the Sharp Street Methodist Episcopal Church, to nine prospective ministers. This moment marks the very first day of instruction at what would become Morgan State University.',
    people: ['Rev. James H. Brown'],
    milestone: true,
  },
  {
    id: 4, year: 1867, era: 'founding', icon: '⚖️', tag: 'Legal',
    title: 'Official Charter Filed — Founders Day',
    subtitle: 'November 27, 1867',
    summary: 'Articles of Incorporation are filed in the Supreme Court of Baltimore City. Morgan observes Founders Day in November.',
    description: 'On Wednesday, November 27, 1867, the Board of Trustees filed Articles of Incorporation in the Supreme Court of Baltimore City, officially establishing The Centenary Biblical Institute of the Methodist Episcopal Church of Baltimore. This was the official date of the charter of the institute; thus, Morgan State University observes Founders Day in November of each year.',
    people: [],
    milestone: true,
  },
  {
    id: 5, year: 1872, era: 'founding', icon: '🏛️', tag: 'Governance',
    title: 'First African-Americans on the Board',
    subtitle: '1872 — Peyton Property Campus',
    summary: 'Four African-Americans are appointed to the Board of Trustees. The Institute moves to 44 E. Saratoga Street.',
    description: 'In 1872, the first African-Americans were appointed to the Board of Trustees: Wesley J. Parker, R. H. Robinson, Henry W. Martin and William Perkins. That same year, seeking a more permanent location, the Institute moved to the Peyton Property — a three-story building at 44 E. Saratoga Street.',
    people: ['Wesley J. Parker', 'R. H. Robinson', 'Henry W. Martin', 'William Perkins'],
    milestone: false,
  },
  {
    id: 6, year: 1873, era: 'founding', icon: '👤', tag: 'Leadership',
    title: 'First President Appointed',
    subtitle: 'October 1873',
    summary: 'Rev. J. Emory Round, abolitionist and editor, becomes the first President at $1,500 per year.',
    description: 'In October of 1873, Rev. J. Emory Round — abolitionist and Assistant Editor of Zion Herald — was appointed the first President of the Centenary Biblical Institute, at $1,500 per annum.',
    people: ['Rev. J. Emory Round'],
    milestone: false,
  },
  {
    id: 7, year: 1874, era: 'founding', icon: '👩', tag: 'Inclusion',
    title: 'First Female Students Admitted',
    subtitle: '1874–1875',
    summary: 'The Institution opens its doors to women, breaking barriers that had limited enrollment to men.',
    description: 'Between 1874 and 1875, the Centenary Biblical Institute admitted its first female students, broadening access to higher education and breaking barriers that had previously limited enrollment to men training for the Methodist ministry.',
    people: [],
    milestone: true,
  },
  {
    id: 8, year: 1878, era: 'founding', icon: '🎓', tag: 'Inclusion',
    title: 'First Female Graduate — Susie H. Carr',
    subtitle: '1878 — Charter Amended',
    summary: 'Charter amended to train teachers as well as ministers. Susie H. Carr receives the first diploma issued to a woman.',
    description: "In 1878, The Centenary Biblical Institute amended its charter to enable the school to train teachers, as well as ministers, and it graduated (issued a diploma to) its first female student: Susie H. Carr. This was a landmark moment in the institution's commitment to inclusive education.",
    people: ['Susie H. Carr'],
    milestone: true,
  },
  {
    id: 9, year: 1879, era: 'founding', icon: '🧑‍🏫', tag: 'Faculty',
    title: 'First African-American Professors',
    subtitle: '1879 — Alumni Return to Teach',
    summary: 'Three alumni are appointed as the first African-American professors at the institution.',
    description: "In 1879, the Institute appointed three of its alumni as its first African-American professors: John F. Griffin (Class of '77), Sylvester N. Narwood (Class of '77) and Benjamin O. Bird (Class of '78). This historic step placed Black educators in the classroom and transformed the institution from within.",
    people: ['John F. Griffin', 'Sylvester N. Narwood', 'Benjamin O. Bird'],
    milestone: true,
  },
  {
    id: 10, year: 1881, era: 'founding', icon: '🏠', tag: 'Campus',
    title: 'Move to Edmondson & Fulton Avenues',
    subtitle: '1881',
    summary: 'Institute moves to a new donated location at Edmondson and Fulton Avenues with $5,000 for improvements.',
    description: 'In 1881, the Institute moved to a new location at Edmondson and Fulton Avenues, which had been donated to the school — along with $5,000 for capital improvements — by Rev. and Mrs. John F. Goucher in 1879.',
    people: ['Rev. John F. Goucher'],
    milestone: false,
  },
  {
    id: 11, year: 1882, era: 'founding', icon: '🌙', tag: 'Leadership',
    title: 'Second President & First Evening School',
    subtitle: '1882',
    summary: "Rev. William Maslin Frysinger becomes second President and launches the institution's first evening school.",
    description: "In 1882, Rev. William Maslin Frysinger, D.D., of the Central Pennsylvania Conference, was named second President and started the institution's first evening school — expanding access to education for working individuals.",
    people: ['Rev. William Maslin Frysinger, D.D.'],
    milestone: false,
  },
  {
    id: 12, year: 1886, era: 'founding', icon: '🌱', tag: 'Legacy',
    title: 'Princess Anne Academy Established',
    subtitle: '1886 — Forerunner of UMES',
    summary: 'The Delaware Conference establishes Princess Anne Academy as a branch — the forerunner of the University of Maryland Eastern Shore.',
    description: 'In 1886, the Delaware Conference of the Methodist Episcopal Church established Princess Anne Academy in Princess Anne, Maryland, as a branch of the Centenary Biblical Institute. It was later converted to Princess Anne Academy — Eastern Branch of the Agricultural College of Maryland — and is the forerunner of the University of Maryland Eastern Shore (UMES).',
    people: [],
    milestone: false,
  },
  {
    id: 13, year: 1895, era: 'founding', icon: '🎓', tag: 'Academics',
    title: 'First Baccalaureate Degree Awarded',
    subtitle: '1895',
    summary: "George W. F. McMechen becomes Morgan's first college graduate, marking the institution's evolution into a degree-granting college.",
    description: "In 1895, Morgan awarded its first baccalaureate degree: George W. F. McMechen became the institution's first college graduate. This milestone marked the evolution of Morgan from a biblical training institute into a full degree-granting college.",
    people: ['George W. F. McMechen'],
    milestone: true,
  },
  {
    id: 14, year: 1902, era: 'early', icon: '👤', tag: 'Leadership',
    title: "Dr. John Oakley Spencer — Morgan's Longest-Serving President",
    subtitle: '1902 — 35-Year Tenure',
    summary: "First non-minister leader appointed. Dr. Spencer would serve 35 years — Morgan's longest presidential tenure.",
    description: "In 1902, Morgan College appointed the institution's first leader who was not a minister in the Methodist Episcopal Church as its fourth President: Dr. John Oakley Spencer, Principal of the Hudson River Institute in Claverack, New York. Dr. Spencer was to be Morgan's longest-serving president, with a term of 35 years.",
    people: ['Dr. John Oakley Spencer'],
    milestone: true,
  },
  {
    id: 15, year: 1917, era: 'early', icon: '🏗️', tag: 'Campus',
    title: 'Current Campus Acquired — Ivy Mill Property',
    subtitle: '1917 — Corner of Hillen & Cold Spring Lane',
    summary: 'Morgan purchases the Ivy Mill Property in Lauraville — the current 143-acre campus in northeast Baltimore.',
    description: 'In 1917, Morgan College purchased the Ivy Mill Property in Lauraville at the corner of Hillen and Grindon (now Cold Spring Lane) as the new site for the College. It renovated the Ivy Mill Hotel to house classes and a library, renaming it Washington Hall, and renovated three other structures named Young Hall, Cummings Hall and Woolford Hall.',
    people: [],
    milestone: true,
  },
  {
    id: 16, year: 1919, era: 'early', icon: '🏛️', tag: 'Campus',
    title: 'Carnegie Hall Completed',
    subtitle: '1919',
    summary: 'Carnegie Hall is built with a donation from Andrew Carnegie and matching Conference funds.',
    description: 'In 1919, Morgan College completed construction of Carnegie Hall, built with a large donation from industrialist and philanthropist Andrew Carnegie and matching funds from the Washington and Baltimore Conferences of the Methodist Episcopal Church.',
    people: ['Andrew Carnegie'],
    milestone: false,
  },
  {
    id: 17, year: 1925, era: 'early', icon: '✅', tag: 'Academics',
    title: 'Full Middle States Accreditation',
    subtitle: '1925',
    summary: 'Morgan receives full accreditation from the Middle States Association of Colleges and Schools.',
    description: 'In 1925, Morgan College sought and received full accreditation from the Middle States Association of Colleges and Schools, cementing its standing as a fully recognized institution of higher learning.',
    people: [],
    milestone: true,
  },
  {
    id: 18, year: 1937, era: 'early', icon: '⭐', tag: 'Leadership',
    title: 'First African-American President',
    subtitle: '1937 — A Historic Milestone',
    summary: 'Dr. Dwight Oliver Wendell Holmes becomes the fifth President and the first African-American to lead the institution.',
    description: "In 1937, on the retirement of President Spencer, Dwight Oliver Wendell Holmes, Ph.D., Graduate Dean at Howard University, became the fifth and first African-American President of Morgan College. This milestone reflected the institution's deepening commitment to Black leadership and self-determination.",
    people: ['Dwight Oliver Wendell Holmes, Ph.D.'],
    milestone: true,
  },
  {
    id: 19, year: 1939, era: 'early', icon: '🏛️', tag: 'Governance',
    title: 'Transferred to the State of Maryland',
    subtitle: 'November 9, 1939 — Morgan State College',
    summary: 'Morgan is purchased by Maryland for $225,000, becoming a public institution: Morgan State College.',
    description: 'On November 9, 1939, Morgan College was officially transferred to the State of Maryland, having been purchased from the Board of Trustees for $225,000. It became Morgan State College. This transition to public status dramatically increased funding capacity and opened broader access to Black Marylanders seeking higher education during the Jim Crow era.',
    people: [],
    milestone: true,
  },
  {
    id: 20, year: 1948, era: 'civil', icon: '👤', tag: 'Leadership',
    title: 'Sixth President — Dr. Martin David Jenkins',
    subtitle: '1948',
    summary: 'Dr. Martin David Jenkins is appointed sixth President, leading Morgan through the critical Civil Rights decades.',
    description: 'In 1948, Martin David Jenkins, Ph.D., Professor of Education at Howard University, was appointed sixth President of Morgan State College. Jenkins led the institution through the critical decades of the Civil Rights Movement, presiding over significant academic expansion.',
    people: ['Martin David Jenkins, Ph.D.'],
    milestone: false,
  },
  {
    id: 21, year: 1955, era: 'civil', icon: '✊', tag: 'Civil Rights',
    title: 'Morgan Leads the Sit-In Movement',
    subtitle: '1955 — Five Years Before Greensboro',
    summary: "The \"Morgan Four\" stage one of the nation's earliest lunch counter sit-ins at Read's Drug Store in Baltimore.",
    description: "Morgan students — known as the \"Morgan Four\" — staged some of the nation's earliest lunch counter sit-ins at Read's Drug Store in Baltimore, five years before the Greensboro sit-ins gained national attention. These students demonstrated Morgan's historic role at the forefront of social justice and the American Civil Rights Movement.",
    people: ['The Morgan Four'],
    milestone: true,
  },
  {
    id: 22, year: 1964, era: 'civil', icon: '📖', tag: 'Academics',
    title: 'Graduate School Re-established',
    subtitle: '1964 — First Master\'s Degrees in 1967',
    summary: 'Morgan re-establishes its Graduate School and awards its first master\'s degrees three years later.',
    description: "In 1964, Morgan State College re-established the Graduate School (first established in 1923) and awarded its first master's degrees in 1967, marking a new chapter in advanced scholarship at the institution.",
    people: [],
    milestone: true,
  },
  {
    id: 23, year: 1969, era: 'civil', icon: '🏆', tag: 'Recognition',
    title: 'Named Model Liberal Arts College',
    subtitle: '1969',
    summary: 'Morgan is named a model liberal arts college by Middle States and ranked in the top-ten African-American universities by Newsweek.',
    description: 'In 1969, Morgan was selected as a model liberal arts college by the Middle States Association of Colleges and Schools and was ranked by a Newsweek poll among the top-ten African-American colleges and universities in the nation.',
    people: [],
    milestone: true,
  },
  {
    id: 24, year: 1975, era: 'modern', icon: '🏫', tag: 'Milestone',
    title: 'Morgan State College Becomes Morgan State University',
    subtitle: 'July 1, 1975 — Doctoral Authority Granted',
    summary: 'By act of the Maryland General Assembly, Morgan becomes a university with authority to confer the doctorate and is designated the state\'s public urban university.',
    description: "On July 1, 1975, Morgan State College, by act of the Maryland General Assembly, became Morgan State University, with authority to confer the doctorate, and it was designated as the state's public urban university. This elevation marked a profound transformation in the institution's scope, mission and national standing.",
    people: [],
    milestone: true,
  },
  {
    id: 25, year: 1983, era: 'modern', icon: '📜', tag: 'Academics',
    title: 'First Doctorate Awarded',
    subtitle: '1983',
    summary: 'Elzee C. Gladden receives the first Ed.D. in Urban Educational Leadership — fulfilling the promise of the 1975 elevation.',
    description: "In 1983, Morgan State University awarded its first doctorate, the Ed.D. in Urban Educational Leadership, to Elzee C. Gladden, fulfilling the promise of the university's 1975 elevation to doctoral status.",
    people: ['Elzee C. Gladden'],
    milestone: true,
  },
  {
    id: 26, year: 1984, era: 'modern', icon: '👤', tag: 'Leadership',
    title: 'Ninth President — Dr. Earl S. Richardson',
    subtitle: '1984',
    summary: 'Dr. Earl S. Richardson is appointed ninth President. Soper Library is later named in his honor.',
    description: 'In 1984, Earl S. Richardson, Ed.D., Assistant to the Chancellor of the original University of Maryland System, was appointed ninth President of Morgan State University. His long tenure reshaped Morgan as a national research institution. Soper Library bears his name.',
    people: ['Earl S. Richardson, Ed.D.'],
    milestone: false,
  },
  {
    id: 27, year: 2007, era: 'modern', icon: '🔬', tag: 'Recognition',
    title: 'Carnegie Doctoral Research University Designation',
    subtitle: '2007',
    summary: 'Morgan is classified as a Doctoral Research University by Carnegie — one of only a handful of HBCUs to reach this tier.',
    description: "In 2007, Morgan State University was designated by the Carnegie Classification of Institutions of Higher Education as a doctoral research university, placing Morgan among the nation's leading research institutions and one of only a handful of HBCUs to achieve this distinction.",
    people: [],
    milestone: true,
  },
  {
    id: 28, year: 2010, era: 'modern', icon: '👤', tag: 'Leadership',
    title: 'Tenth President — Dr. David Wilson',
    subtitle: '2010',
    summary: "Dr. David Wilson becomes Morgan's 10th inaugurated president, bringing national higher-education leadership experience.",
    description: "In 2010, David Wilson, Ed.D., Chancellor of both the University of Wisconsin Colleges and the University of Wisconsin–Extension, became Morgan's 10th inaugurated president, bringing transformative vision and national leadership experience to the university's future.",
    people: ['David Wilson, Ed.D.'],
    milestone: false,
  },
  {
    id: 29, year: 2016, era: 'modern', icon: '🏛️', tag: 'Recognition',
    title: 'Designated a National Treasure',
    subtitle: '2016 — National Trust for Historic Preservation',
    summary: "Morgan is declared a National Treasure — the only HBCU and only institution to receive this designation for its entire campus.",
    description: "In 2016, the National Trust for Historic Preservation designated Morgan State University as a National Treasure, making it the only HBCU and the only institution of higher education to receive such designation for its entire campus.",
    people: [],
    milestone: true,
  },
  {
    id: 30, year: 2016, era: 'modern', icon: '🎓', tag: 'Milestone',
    title: "Morgan's 50,000th Graduate",
    subtitle: 'December 16, 2016 — Winter Commencement',
    summary: 'Joseph Jones becomes the 50,000th graduate. With a record 434 graduates that semester, Morgan reaches 50,177 total alumni.',
    description: "At the December 16, 2016 Commencement Exercises, the 257th student to cross the stage became the 50,000th graduate of the institution: Joseph Jones, an undergraduate student receiving the Bachelor of Science Degree in computer science. With a record 434 graduates at the winter exercises, Morgan State University, since its founding as the Centenary Biblical Institute in 1867, had a total of 50,177 graduates.",
    people: ['Joseph Jones'],
    milestone: true,
  },
];

// ── HELPERS ───────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return isMobile;
}

// ── TAG BADGE ─────────────────────────────────────────────────
function TagBadge({ tag }) {
  const bg = TAG_COLORS[tag] || '#003893';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 9px', borderRadius: '20px',
      fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: bg,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>{tag}</span>
  );
}

// ── PERSON TAG ────────────────────────────────────────────────
function PersonTag({ name }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '20px', margin: '3px 3px 0 0',
      fontSize: '0.78rem', fontWeight: 600, color: '#003893',
      background: '#e8eef8', border: '1px solid #c5d5f0',
    }}>👤 {name}</span>
  );
}

// ── SINGLE EVENT CARD ─────────────────────────────────────────
function EventCard({ event, index, isRight, isMobile }) {
  const [expanded, setExpanded] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const ref = useRef(null);
  const theme = ERA_THEME[event.era] || ERA_THEME.modern;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setVisible(true), (index % 6) * 90);
        obs.disconnect();
      }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  // On mobile: all cards on one side; desktop: alternate
  const onRight = !isMobile && isRight;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : (onRight ? 'flex-end' : 'flex-start'),
        paddingBottom: '1.75rem',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) translateX(0)'
          : `translateY(28px) translateX(${onRight ? '18px' : '-18px'})`,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* ── vertical dot ── */}
      <div style={{
        position: 'absolute',
        left: isMobile ? '0' : '50%',
        top: '1.4rem',
        width: event.milestone ? 20 : 14,
        height: event.milestone ? 20 : 14,
        borderRadius: '50%',
        background: event.milestone ? '#F58025' : theme.dot,
        border: '3px solid white',
        boxShadow: event.milestone
          ? '0 0 0 4px rgba(245,128,37,0.35)'
          : `0 0 0 3px ${theme.glow}`,
        transform: isMobile ? 'translateX(-50%)' : 'translateX(-50%)',
        zIndex: 2,
        flexShrink: 0,
        transition: 'transform 0.2s',
      }} />

      {/* ── card ── */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={() => setExpanded(p => !p)}
        onKeyDown={e => e.key === 'Enter' && setExpanded(p => !p)}
        style={{
          width: isMobile ? 'calc(100% - 1.8rem)' : 'calc(50% - 2.2rem)',
          marginLeft: isMobile ? '1.8rem' : 0,
          background: '#fff',
          borderRadius: '14px',
          padding: '1.2rem 1.4rem',
          cursor: 'pointer',
          border: `2px solid ${expanded ? theme.dot : 'transparent'}`,
          borderLeft: `5px solid ${event.milestone ? '#F58025' : theme.bar}`,
          boxShadow: expanded
            ? '0 8px 36px rgba(0,56,147,0.16)'
            : '0 3px 14px rgba(0,56,147,0.08)',
          transition: 'box-shadow 0.25s, border-color 0.25s, transform 0.2s',
          transform: expanded ? 'scale(1.01)' : 'scale(1)',
          outline: 'none',
        }}
        onFocus={e => e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.glow}`}
        onBlur={e => e.currentTarget.style.boxShadow = expanded ? '0 8px 36px rgba(0,56,147,0.16)' : '0 3px 14px rgba(0,56,147,0.08)'}
      >
        {/* Row 1: year + tag + milestone badge */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '0.55rem' }}>
          <span style={{
            fontFamily: 'Merriweather, Georgia, serif',
            fontSize: '1.35rem', fontWeight: 700,
            color: ERA_THEME[event.era]?.bar || '#003893',
          }}>{event.year}</span>
          <TagBadge tag={event.tag} />
          {event.milestone && (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#F58025', letterSpacing: '0.07em' }}>★ MILESTONE</span>
          )}
          <span style={{
            marginLeft: 'auto', fontSize: '0.85rem', color: '#94a3b8',
            transition: 'transform 0.3s',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>▼</span>
        </div>

        {/* Row 2: icon + title */}
        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.45rem' }}>
          <span style={{ fontSize: '1.5rem', lineHeight: 1.2, flexShrink: 0 }}>{event.icon}</span>
          <div>
            <h3 style={{
              fontFamily: 'Merriweather, Georgia, serif',
              fontSize: '0.98rem', color: '#1a1a2e', margin: 0, lineHeight: 1.4,
            }}>{event.title}</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.15rem 0 0', fontStyle: 'italic' }}>
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Summary */}
        <p style={{ fontSize: '0.88rem', color: '#4a5568', margin: 0, lineHeight: 1.65 }}>
          {event.summary}
        </p>

        {/* Expanded body */}
        {expanded && (
          <div style={{
            marginTop: '1rem', paddingTop: '1rem',
            borderTop: `2px solid ${theme.light}`,
            animation: 'tlFadeIn 0.3s ease',
          }}>
            <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.8, marginBottom: event.people.length ? '1rem' : 0 }}>
              {event.description}
            </p>
            {event.people.length > 0 && (
              <div>
                <p style={{
                  fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8',
                  textTransform: 'uppercase', letterSpacing: '0.09em', margin: '0 0 0.4rem',
                }}>Key People</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {event.people.map(p => <PersonTag key={p} name={p} />)}
                </div>
              </div>
            )}
            <p style={{
              marginTop: '0.9rem', fontSize: '0.75rem', color: '#94a3b8',
              fontStyle: 'italic',
            }}>Source: morgan.edu/about/our-history</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN TIMELINE COMPONENT ───────────────────────────────────
function InteractiveTimeline() {
  const [activeEra, setActiveEra]     = useState('all');
  const [search, setSearch]           = useState('');
  const [milestoneOnly, setMilestone] = useState(false);
  const isMobile = useIsMobile();

  const filtered = useMemo(() => EVENTS.filter(e => {
    if (activeEra !== 'all' && e.era !== activeEra) return false;
    if (milestoneOnly && !e.milestone) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        String(e.year).includes(q) ||
        e.tag.toLowerCase().includes(q) ||
        e.people.some(p => p.toLowerCase().includes(q))
      );
    }
    return true;
  }), [activeEra, search, milestoneOnly]);

  // Era stats
  const counts = useMemo(() => {
    const c = {};
    EVENTS.forEach(e => { c[e.era] = (c[e.era] || 0) + 1; });
    return c;
  }, []);

  return (
    <div style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>

      {/* ── inject keyframe animation ── */}
      <style>{`
        @keyframes tlFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tl-era-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      {/* ── CONTROLS ── */}
      <div style={{
        background: '#f8faff', borderRadius: '16px',
        padding: '1.5rem', marginBottom: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 12px rgba(0,56,147,0.06)',
      }}>

        {/* Search */}
        <div style={{ marginBottom: '1.25rem' }}>
          <input
            type="text"
            placeholder="🔍  Search events, people, or years…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', maxWidth: 480,
              padding: '0.6rem 1.1rem',
              borderRadius: '50px',
              border: '2px solid #e2e8f0',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#003893'; e.target.style.boxShadow = '0 0 0 3px rgba(0,56,147,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Era filter pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {ERAS.map(era => {
            const active = activeEra === era.id;
            return (
              <button
                key={era.id}
                className="tl-era-btn"
                onClick={() => setActiveEra(era.id)}
                style={{
                  padding: '0.42rem 1rem',
                  borderRadius: '50px',
                  border: `2px solid ${active ? era.color : '#e2e8f0'}`,
                  background: active ? era.color : '#fff',
                  color: active ? '#fff' : '#374151',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                {era.label}
                {era.id !== 'all' && (
                  <span style={{
                    display: 'inline-block', marginLeft: '6px',
                    padding: '0 7px', borderRadius: '12px',
                    background: active ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                    fontSize: '0.72rem', fontWeight: 700,
                  }}>{counts[era.id] || 0}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Milestone toggle */}
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', color: '#374151' }}>
          <input
            type="checkbox"
            checked={milestoneOnly}
            onChange={e => setMilestone(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#F58025', cursor: 'pointer' }}
          />
          <span style={{ fontWeight: 600 }}>★ Major milestones only</span>
        </label>

        {/* Count */}
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0.75rem 0 0' }}>
          Showing <strong style={{ color: '#003893' }}>{filtered.length}</strong> of {EVENTS.length} events
          {search && <> matching "<strong style={{ color: '#003893' }}>{search}</strong>"</>}
          {activeEra !== 'all' && <> in <strong style={{ color: ERAS.find(e => e.id === activeEra)?.color }}>{ERAS.find(e => e.id === activeEra)?.label}</strong></>}
        </p>
      </div>

      {/* ── ERA LEGEND ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        {ERAS.filter(e => e.id !== 'all').map(era => (
          <div key={era.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: ERA_THEME[era.id]?.dot, display: 'inline-block' }} />
            {era.label.replace(/^\S+\s/, '')}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#F58025' }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#F58025', display: 'inline-block', boxShadow: '0 0 0 3px rgba(245,128,37,0.3)' }} />
          ★ Major Milestone
        </div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginLeft: 'auto' }}>
          Click any card to read the full story
        </div>
      </div>

      {/* ── TIMELINE TRACK ── */}
      <div style={{ position: 'relative', paddingTop: '0.5rem' }}>

        {/* Vertical gradient line */}
        <div style={{
          position: 'absolute',
          left: isMobile ? '0' : '50%',
          top: 0, bottom: 0,
          width: 3,
          background: 'linear-gradient(to bottom, #7c3aed 0%, #059669 33%, #d97706 66%, #003893 100%)',
          transform: 'translateX(-50%)',
          borderRadius: '2px',
        }} />

        {/* Events */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: '#f8faff', borderRadius: '16px',
            border: '2px dashed #e2e8f0',
          }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</p>
            <p style={{ color: '#64748b', fontWeight: 600 }}>No events match your filters.</p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Try adjusting your search or era selection.</p>
          </div>
        ) : (
          filtered.map((event, idx) => (
            <EventCard
              key={event.id}
              event={event}
              index={idx}
              isRight={idx % 2 !== 0}
              isMobile={isMobile}
            />
          ))
        )}
      </div>

      {/* ── FOOTER STATS BAR ── */}
      <div style={{
        marginTop: '2rem',
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, #003893, #002266)',
        borderRadius: '14px',
        display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
        justifyContent: 'center',
      }}>
        {[
          { label: 'Total Events', value: EVENTS.length },
          { label: 'Milestone Moments', value: EVENTS.filter(e => e.milestone).length },
          { label: 'Years Covered', value: '1864–2016' },
          { label: 'Presidential Terms', value: '10' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'Merriweather, serif', color: '#F58025' }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ── MOUNT ─────────────────────────────────────────────────────
const tlRoot = document.getElementById('timeline-root');
if (tlRoot) {
  ReactDOM.createRoot(tlRoot).render(<InteractiveTimeline />);
}
