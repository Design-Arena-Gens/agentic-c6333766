'use client';

import { useMemo, useState } from 'react';

type ThemeId = 'bright' | 'warm' | 'dusk' | 'midnight';
type FontId = 'sans' | 'serif' | 'dyslexic';

type ThemeConfig = {
  label: string;
  background: string;
  text: string;
  accent: string;
  muted: string;
};

const themes: Record<ThemeId, ThemeConfig> = {
  bright: {
    label: 'Bright Light',
    background: '#fdfdfd',
    text: '#131313',
    accent: '#2563eb',
    muted: '#4b5563'
  },
  warm: {
    label: 'Soft Sepia',
    background: '#f3ecd9',
    text: '#2c241a',
    accent: '#b45309',
    muted: '#6b4f31'
  },
  dusk: {
    label: 'Evening Dusk',
    background: '#1f2933',
    text: '#f1f5f9',
    accent: '#0ea5e9',
    muted: '#94a3b8'
  },
  midnight: {
    label: 'Midnight Noir',
    background: '#050608',
    text: '#f9fafb',
    accent: '#38bdf8',
    muted: '#9ca3af'
  }
};

const fontLabels: Record<FontId, string> = {
  sans: 'Sans (Source Sans 3)',
  serif: 'Serif (Merriweather)',
  dyslexic: 'Accessible (Atkinson Hyperlegible)'
};

const sampleSections = [
  {
    title: 'Designing for Quiet Focus',
    body:
      'Readability is less about aesthetic trends and more about predictability. The best reading interfaces simply stay out of the way, letting eyes settle into a steady cadence so the brain can process meaning at its own pace.'
  },
  {
    title: 'Principles of Comfortable Reading',
    body:
      'Comfort is a moving target. Some readers need generous line spacing; others prefer narrow columns to keep their place. Giving people control over these micro-adjustments is the most reliable shortcut to clarity.'
  },
  {
    title: 'Accessibility as a Default',
    body:
      'Accessibility features should not feel like add-ons. When inclusive options are part of the default experience, everyone benefits—especially people with low vision, dyslexia, or attention differences.'
  }
];

const families: Record<FontId, string> = {
  sans: 'var(--font-family-base)',
  serif: 'var(--font-family-serif)',
  dyslexic: 'var(--font-family-dyslexic)'
};

export default function Page() {
  const [themeId, setThemeId] = useState<ThemeId>('bright');
  const [fontId, setFontId] = useState<FontId>('sans');
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.7);
  const [maxWidth, setMaxWidth] = useState(68);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [paragraphSpacing, setParagraphSpacing] = useState(1.2);
  const [enableReadingGuide, setEnableReadingGuide] = useState(false);
  const [softEdges, setSoftEdges] = useState(true);

  const theme = themes[themeId];

  const previewStyle = useMemo(() => ({
    backgroundColor: theme.background,
    color: theme.text,
    fontFamily: families[fontId],
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}em`,
    textTransform: 'none',
    maxWidth: `${maxWidth}ch`,
    padding: '2.5rem',
    borderRadius: softEdges ? '24px' : '0px',
    boxShadow: softEdges
      ? '0 20px 60px rgba(15, 23, 42, 0.16)'
      : '0 0 0 rgba(0,0,0,0)',
    transition: 'background-color var(--transition-base), color var(--transition-base), box-shadow var(--transition-base)'
  }), [fontId, fontSize, letterSpacing, lineHeight, maxWidth, softEdges, theme.background, theme.text]);

  const guideStyle = enableReadingGuide
    ? {
        backgroundImage: `linear-gradient(rgba(148, 163, 184, 0) calc(50% - 0.7em), ${theme.accent}33 calc(50% - 0.4em), ${theme.accent}55 calc(50% + 0.4em), rgba(148, 163, 184, 0) calc(50% + 0.7em))`,
        backgroundSize: '100% 3.2em'
      }
    : {};

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 1.5rem',
        gap: '2rem',
        background: 'linear-gradient(145deg, #f8fafc, #eef2ff)'
      }}
    >
      <header style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            backgroundColor: '#e0e7ff',
            color: '#3730a3',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: '0.75rem'
          }}
        >
          Readability Toolkit
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-family-serif)',
            fontSize: '3rem',
            margin: '1rem 0 0.75rem',
            color: '#111827'
          }}
        >
          Make everything effortlessly readable
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#475569',
            margin: 0
          }}
        >
          Tune typography, rhythm, and contrast until the page feels calm. Every control updates live so you can test what fits your eyes best.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <section
          style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '1.8rem',
            boxShadow: '0 15px 45px rgba(15, 23, 42, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>Reading preferences</h2>

          <ControlGroup label="Theme" hint="Choose the contrast profile that feels comfortable">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {(Object.keys(themes) as ThemeId[]).map((id) => {
                const option = themes[id];
                const isActive = themeId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setThemeId(id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: isActive ? option.accent : '#d1d5db',
                      backgroundColor: '#fff',
                      padding: '0.85rem 1rem',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: '#111827',
                      boxShadow: isActive ? `0 0 0 4px ${option.accent}20` : 'none',
                      transition: 'border-color var(--transition-base), box-shadow var(--transition-base)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', textAlign: 'left' }}>
                      <span style={{ fontWeight: 600 }}>{option.label}</span>
                      <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{id === themeId ? 'Active' : 'Tap to apply'}</span>
                    </div>
                    <span
                      aria-hidden
                      style={{
                        width: '3.5rem',
                        height: '2rem',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${option.background}, ${option.text}15)`
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </ControlGroup>

          <ControlGroup label="Font family" hint="Swap between typefaces to reduce visual fatigue">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {(Object.keys(fontLabels) as FontId[]).map((id) => {
                const isActive = fontId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setFontId(id)}
                    style={{
                      padding: '0.65rem 1.1rem',
                      borderRadius: '999px',
                      border: '1px solid',
                      borderColor: isActive ? theme.accent : '#d1d5db',
                      backgroundColor: isActive ? `${theme.accent}15` : '#ffffff',
                      color: '#0f172a',
                      cursor: 'pointer',
                      fontFamily: families[id],
                      fontSize: '0.95rem',
                      transition: 'all var(--transition-base)'
                    }}
                  >
                    {fontLabels[id]}
                  </button>
                );
              })}
            </div>
          </ControlGroup>

          <SliderControl
            label="Font size"
            value={fontSize}
            min={14}
            max={26}
            step={1}
            suffix="px"
            onChange={setFontSize}
          />
          <SliderControl
            label="Line height"
            value={lineHeight}
            min={1.2}
            max={2}
            step={0.1}
            suffix="x"
            onChange={setLineHeight}
          />
          <SliderControl
            label="Paragraph spacing"
            value={paragraphSpacing}
            min={0.5}
            max={2}
            step={0.1}
            suffix="em"
            onChange={setParagraphSpacing}
          />
          <SliderControl
            label="Column width"
            value={maxWidth}
            min={40}
            max={90}
            step={2}
            suffix="ch"
            onChange={setMaxWidth}
          />
          <SliderControl
            label="Letter spacing"
            value={letterSpacing}
            min={0}
            max={0.12}
            step={0.01}
            suffix="em"
            onChange={setLetterSpacing}
          />

          <ToggleControl
            label="Reading guide"
            description="Adds a subtle highlight to keep your place while scanning lines."
            checked={enableReadingGuide}
            onChange={setEnableReadingGuide}
          />
          <ToggleControl
            label="Soft edges"
            description="Gives the reading surface gentle shadows and rounded corners."
            checked={softEdges}
            onChange={setSoftEdges}
          />
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
                Live preview
              </p>
              <h2 style={{ margin: '0.25rem 0 0', fontSize: '1.7rem', color: '#0f172a' }}>See your settings in action</h2>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#475569',
                fontSize: '0.9rem'
              }}
            >
              <div
                style={{
                  width: '0.65rem',
                  height: '0.65rem',
                  borderRadius: '999px',
                  backgroundColor: theme.accent
                }}
              />
              <span>{themes[themeId].label}</span>
            </div>
          </div>

          <article
            style={{
              position: 'relative',
              margin: '0 auto',
              width: '100%'
            }}
          >
            <div
              style={{
                ...previewStyle,
                ...guideStyle,
                margin: '0 auto',
                backgroundClip: 'padding-box'
              }}
            >
              {sampleSections.map((section) => (
                <section key={section.title} style={{ marginBottom: `${paragraphSpacing}em`, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25em', fontWeight: 600, color: theme.accent }}>{section.title}</h3>
                  <p style={{ margin: 0, color: theme.text }}>{section.body}</p>
                </section>
              ))}
              <div
                style={{
                  marginTop: `${paragraphSpacing * 1.1}em`,
                  paddingTop: '1.5rem',
                  borderTop: `1px solid ${theme.muted}55`,
                  display: 'grid',
                  gap: '0.75rem',
                  color: theme.muted
                }}
              >
                <p style={{ margin: 0 }}>
                  Tip: Try pairing modest paragraph spacing with a slightly wider line height for a calmer rhythm. If you feel your eyes jumping lines, reduce the column width until each line feels manageable.
                </p>
                <p style={{ margin: 0 }}>
                  Your selections are stored in memory for the session so you can adjust quickly without losing your spot.
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

type ControlGroupProps = {
  label: string;
  hint?: string;
  children: React.ReactNode;
};

function ControlGroup({ label, hint, children }: ControlGroupProps) {
  return (
    <div style={{ display: 'grid', gap: '0.6rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span style={{ fontWeight: 600, color: '#0f172a' }}>{label}</span>
        {hint ? (
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

type SliderControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
};

function SliderControl({ label, value, min, max, step, suffix, onChange }: SliderControlProps) {
  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#0f172a' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '0.85rem', color: '#475569' }}>
          {value}
          {suffix ?? ''}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(parseFloat(event.target.value))}
        style={{
          appearance: 'none',
          width: '100%',
          height: '6px',
          borderRadius: '999px',
          background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
          outline: 'none'
        }}
      />
    </div>
  );
}

type ToggleControlProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function ToggleControl({ label, description, checked, onChange }: ToggleControlProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1rem 1.1rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <span style={{ fontWeight: 600, color: '#0f172a' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{description}</span>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: '48px',
          height: '28px',
          borderRadius: '999px',
          border: 'none',
          backgroundColor: checked ? '#38bdf8' : '#cbd5f5',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color var(--transition-base)'
        }}
        aria-pressed={checked}
      >
        <span
          style={{
            position: 'absolute',
            top: '4px',
            left: checked ? '26px' : '4px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)',
            transition: 'left var(--transition-base)'
          }}
        />
      </button>
    </div>
  );
}
