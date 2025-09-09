import { Client, TablesDB, Query, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const queries = [Query.equal('searchTerm', searchTerm)];
    const result = await database.listRows({ databaseId: DATABASE_ID, tableId: TABLE_ID, queries });
    const rows = result.rows;

    if (rows.length > 0) {
      const row = rows[0];
      const rowId = row.$id;
      const currentCount = Number(row.count ?? 0);

      await database.incrementRowColumn({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId,
        column: 'count',
        value: 1,
      });
      return { action: 'updated', searchTerm, count: currentCount + 1 };
    }

    const newData = {
      searchTerm: searchTerm,
      count: 1,
      movie_id: movie.id,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };

    const createRes = await database.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: newData,
    });

    return { action: 'created', id: createRes.$id, searchTerm };
  } catch (error) {
    console.error('updateSearchCount error:', error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc('count')],
    });
    return response.rows;
  } catch (error) {
    console.error('getTrendingMovies error:', error);
  }
};
