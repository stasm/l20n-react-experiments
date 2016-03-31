// shim translations for these two known data-l10n-ids
export const translations = {
  'hello-world': 'Witaj <em>{$name}</em>!',
  'type-your-name': 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>',
};

export function formatEntity(key, args) {
  return Promise.resolve(
    translations[key].replace('{$name}', () => args.name)
  );
}
