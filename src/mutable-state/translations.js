// shim translations for these two known data-l10n-ids
const translations = {
  'hello-world': {
    id: 'hello-world',
    value: 'Witaj <em>świecie</em>!',
    attrs: {
      title: 'This is L20n working with React!'
    }
  },
  'type-your-name': {
    id: 'type-your-name',
    value: 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>',
    attrs: null
  }
};

export function formatEntity(key) {
  return Promise.resolve(translations[key]);
}
