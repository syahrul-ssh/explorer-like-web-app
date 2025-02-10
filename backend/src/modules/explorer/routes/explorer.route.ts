import { Elysia } from 'elysia';
import { ExplorerController } from '../controller/explorer.controller';

const explorerController = new ExplorerController();

export const explorerRoutes = new Elysia()
  .get('/api/folders', explorerController.getAllFolders)
  .get('/api/folder/:id', explorerController.getFolderById)
  .post('/api/folder', explorerController.createFolder)
  .put('/api/folder/:id', explorerController.updateFolder)
  .delete('/api/folder/:id', explorerController.deleteFolder)
  .get('/api/search', explorerController.searchFolderAndFiles);
