import { ExplorerService } from "../service/explorer.service";

export class ExplorerController {
  private readonly explorerService = new ExplorerService();

  getAllFolders = async () => {
    return await this.explorerService.getAllFolders();
  }

  getFolderById = async ({ params }: { params: { id: number } }) => {
    return await this.explorerService.getFolderById(+params.id);
  }

  createFolder = async ({ body }: { body: { name: string; parentId: number | null } }) => {
    return await this.explorerService.createFolder(body.name, body.parentId);
  }

  updateFolder = async ({ params, body }: { params: { id: number }; body: { name: string, parentId: number | null } }) => {
    return await this.explorerService.updateFolder(+params.id, body.name, body.parentId);
  }

  deleteFolder = async ({ params }: { params: { id: number } }) => {
    return await this.explorerService.deleteFolder(+params.id);
  }

  searchFolderAndFiles = async ({ query }: { query: { search: string } }) => {
    return await this.explorerService.searchFolderAndFiles(query.search);
  }
}
