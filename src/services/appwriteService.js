import { Client, TablesDB, Query, ID } from 'appwrite';

class AppwriteService {
  constructor() {
    this.projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    this.databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    this.tableId = import.meta.env.VITE_APPWRITE_TABLE_ID;

    if (!this.projectId || !this.databaseId || !this.tableId) {
      throw new Error('Appwrite configuration is missing. Please check your environment variables.');
    }

    this.client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(this.projectId);

    this.database = new TablesDB(this.client);
  }

  async updateSearchCount(searchTerm, movie) {
    try {
      const queries = [Query.equal('searchTerm', searchTerm)];
      const result = await this.database.listRows({
        databaseId: this.databaseId,
        tableId: this.tableId,
        queries,
      });

      const rows = result.rows;

      if (rows.length > 0) {
        const row = rows[0];
        const currentCount = Number(row.count ?? 0);

        await this.database.incrementRowColumn({
          databaseId: this.databaseId,
          tableId: this.tableId,
          rowId: row.$id,
          column: 'count',
          value: 1,
        });

        return {
          action: 'updated',
          searchTerm,
          count: currentCount + 1,
        };
      }

      const newData = {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      };

      const createRes = await this.database.createRow({
        databaseId: this.databaseId,
        tableId: this.tableId,
        rowId: ID.unique(),
        data: newData,
      });

      return {
        action: 'created',
        id: createRes.$id,
        searchTerm,
      };
    } catch (error) {
      console.error('updateSearchCount error:', error);
      throw new Error('Failed to update search analytics');
    }
  }

  async getTrendingMovies() {
    try {
      const response = await this.database.listRows({
        databaseId: this.databaseId,
        tableId: this.tableId,
        queries: [Query.limit(5), Query.orderDesc('count')],
      });

      return response.rows || [];
    } catch (error) {
      console.error('getTrendingMovies error:', error);
      throw new Error('Failed to fetch trending movies');
    }
  }
}

export default new AppwriteService();
