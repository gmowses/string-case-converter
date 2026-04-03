import { useState } from 'react'
import { Copy, Sun, Moon, Languages, CaseSensitive } from 'lucide-react'

const translations = {
  en: {
    title: 'String Case Converter',
    subtitle: 'Convert text between camelCase, snake_case, PascalCase, kebab-case, SCREAMING_SNAKE, lower case, Title Case and Sentence case.',
    inputLabel: 'Input text',
    inputPlaceholder: 'Type or paste your text here...',
    results: 'Conversions',
    copy: 'Copy',
    copied: 'Copied!',
    builtBy: 'Built by',
  },
  pt: {
    title: 'Conversor de Nomenclatura',
    subtitle: 'Converta texto entre camelCase, snake_case, PascalCase, kebab-case, SCREAMING_SNAKE, lower case, Title Case e Sentence case.',
    inputLabel: 'Texto de entrada',
    inputPlaceholder: 'Digite ou cole seu texto aqui...',
    results: 'Conversoes',
    copy: 'Copiar',
    copied: 'Copiado!',
    builtBy: 'Criado por',
  },
} as const

type Lang = keyof typeof translations

function tokenize(input: string): string[] {
  // Split on spaces, hyphens, underscores, camelCase and PascalCase boundaries
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .map(t => t.toLowerCase())
}

function toCamel(tokens: string[]): string {
  return tokens.map((t, i) => i === 0 ? t : t.charAt(0).toUpperCase() + t.slice(1)).join('')
}
function toPascal(tokens: string[]): string {
  return tokens.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join('')
}
function toSnake(tokens: string[]): string {
  return tokens.join('_')
}
function toKebab(tokens: string[]): string {
  return tokens.join('-')
}
function toScreaming(tokens: string[]): string {
  return tokens.join('_').toUpperCase()
}
function toLower(tokens: string[]): string {
  return tokens.join(' ')
}
function toTitle(tokens: string[]): string {
  return tokens.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' ')
}
function toSentence(tokens: string[]): string {
  const joined = tokens.join(' ')
  return joined.charAt(0).toUpperCase() + joined.slice(1)
}
function toDotCase(tokens: string[]): string {
  return tokens.join('.')
}
function toPathCase(tokens: string[]): string {
  return tokens.join('/')
}

export default function StringCaseConverter() {
  const [lang, setLang] = useState<Lang>(() => navigator.language.startsWith('pt') ? 'pt' : 'en')
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [input, setInput] = useState('hello world example text')
  const [copied, setCopied] = useState<Record<string, boolean>>({})

  const t = translations[lang]

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }

  const tokens = tokenize(input)

  const conversions = [
    { label: 'camelCase', value: toCamel(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'PascalCase', value: toPascal(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'snake_case', value: toSnake(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'kebab-case', value: toKebab(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'SCREAMING_SNAKE', value: toScreaming(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'lower case', value: toLower(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'Title Case', value: toTitle(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'Sentence case', value: toSentence(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'dot.case', value: toDotCase(tokens), color: 'text-pink-600 dark:text-pink-400' },
    { label: 'path/case', value: toPathCase(tokens), color: 'text-pink-600 dark:text-pink-400' },
  ]

  const copyVal = (key: string, val: string) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopied(c => ({ ...c, [key]: true }))
      setTimeout(() => setCopied(c => ({ ...c, [key]: false })), 2000)
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <CaseSensitive size={18} className="text-white" />
            </div>
            <span className="font-semibold">String Case Converter</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleDark} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/gmowses/string-case-converter" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">{t.subtitle}</p>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
            <label className="text-sm font-medium">{t.inputLabel}</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.inputPlaceholder}
              rows={3}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
            <h2 className="font-semibold">{t.results}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {conversions.map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</span>
                    <button
                      onClick={() => copyVal(label, value)}
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-pink-500 transition-colors"
                    >
                      <Copy size={12} />
                      {copied[label] ? t.copied : t.copy}
                    </button>
                  </div>
                  <p className="font-mono text-sm font-semibold text-pink-600 dark:text-pink-400 break-all">{value || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <span>{t.builtBy} <a href="https://github.com/gmowses" className="text-zinc-600 dark:text-zinc-300 hover:text-pink-500 transition-colors">Gabriel Mowses</a></span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  )
}
