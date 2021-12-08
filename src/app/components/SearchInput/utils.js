import db from 'utils/project/search/db';
import fuzzy from 'utils/project/search/fuzzy';

const searchByTitle = fuzzy(db, 'title');

export { searchByTitle };
