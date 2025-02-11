import { ExplorerRepository } from "../repositories/explorer.repository";
import fs from 'fs/promises';
import path from 'path';

export class ExplorerService {
  private explorerRepo = new ExplorerRepository();

  async getAllFolders() {
    return await this.explorerRepo.getAllFolders();
  }

  async getFolderById(id: number) {
    const folder = await this.explorerRepo.getFolderById(id);

    const folderResponse = {
      id: folder?.id,
      name: folder?.name,
      parentId: folder?.parentId,
      children: folder?.children,
      files: folder?.files.map(file => ({
        id: file.id,
        name: file.name,
        path: path.resolve(`uploads/${file.name}`),
        folderId: file.folderId
      }))
    };

    return folderResponse;
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

  async uploadFile(file: any) {
    const buffer = await file.arrayBuffer();
    const fileName = `${file.name.replace(/\s+/g, '')}`;
    const filePath = path.resolve(`uploads/${fileName}`);

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    await fs.writeFile(filePath, Buffer.from(buffer));

    return { name: fileName, path: filePath, type: file.type, size: file.size };
  }

  async saveFile(fileName: string, folderId: number) {
    return await this.explorerRepo.saveFile(fileName, folderId);
  }

  async searchFolderAndFiles(search: string) {
    return await this.explorerRepo.searchFolderAndFiles(search);
  }
}
