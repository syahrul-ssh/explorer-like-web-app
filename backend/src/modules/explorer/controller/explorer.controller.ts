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

  uploadFile = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) throw new Error('No file uploaded');

    return await this.explorerService.uploadFile(file);
  };

  saveFile = async ({ body }: { body: { fileName: string, folderId: number } }) => {
    return await this.explorerService.saveFile(body.fileName, body.folderId);
  }

  searchFolderAndFiles = async ({ query }: { query: { search: string } }) => {
    return await this.explorerService.searchFolderAndFiles(query.search);
  }
}
