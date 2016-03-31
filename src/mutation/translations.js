// shim translations for these two known data-l10n-ids
const translations = {
  'hello-world': {
    value: 'Witaj <em>{$name}</em>!',
    attrs: {
      title: 'This is L20n working with React!'
    }
  },
  'type-your-name': {
    value: 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>',
    attrs: null
  }
};

export function formatEntity(key, args) {
  return Promise.resolve(
    Object.assign({}, translations[key], {
      value: translations[key].value.replace('{$name}', () => args.name)
    })
  );
}
