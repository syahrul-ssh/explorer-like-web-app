import { ExplorerRepository } from "../repositories/explorer.repository";


export class ExplorerService {
  private explorerRepo = new ExplorerRepository();

  async getAllFolders() {
    return await this.explorerRepo.getAllFolders();
  }

  async getFolderById(id: number) {
    return await this.explorerRepo.getFolderById(id);
  }

  async createFolder(name: string, parentId: number | null) {
    try {
      await this.explorerRepo.createFolder(name, parentId);
    } catch (error) {
      console.log(error);
    }
  }

  async updateFolder(id: number, name: string, parentId: number | null) {
    return await this.explorerRepo.updateFolder(id, name, parentId);
  }

  async deleteFolder(id: number) {
    return await this.explorerRepo.deleteFolder(id);
  }

  async searchFolderAndFiles(search: string) {
    return await this.explorerRepo.searchFolderAndFiles(search);
  }
}
