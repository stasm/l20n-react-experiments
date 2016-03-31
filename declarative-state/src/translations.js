// shim translations for these two known data-l10n-ids
const translations = {
  'hello-world': 'Witaj <em>świecie</em>!',
  'type-your-name': 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>',
};

export function formatEntity(key) {
  return Promise.resolve(translations[key]);
}
