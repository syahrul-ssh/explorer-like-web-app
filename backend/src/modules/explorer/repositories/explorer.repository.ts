import { prisma } from "../../../config/prisma";

export class ExplorerRepository {
  async getAllFolders() {
    return await prisma.folder.findMany({
      include: { children: true },
      orderBy: { name: 'asc' }
    });
  }

  async getFolderById(id: number) {
    return await prisma.folder.findUnique({
      where: { id },
      include: { children: true, files: true }
    });
  }

  async createFolder(name: string, parentId: number | null) {
    return await prisma.folder.create({
      data: {
        name,
        parentId
      }
    });
  }

  async updateFolder(id: number, name: string, parentId: number | null) {
    return await prisma.folder.update({
      where: { id },
      data: { name, parentId }
    });
  }

  async deleteFolder(id: number) {
    await prisma.file.deleteMany({
      where: {
        folderId: id
      }
    });
    return await prisma.folder.deleteMany({
      where: {
        OR: [
          {
            id
          },
          {
            parentId: id
          }
        ]
      }
    });
  }

  async saveFile(fileName: string, folderId: number) {
    return await prisma.file.create({
      data: {
        name: fileName,
        folderId
      }
    });
  }

  async searchFolderAndFiles(search: string) {
    return await prisma.folder.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search
            }
          }
        ] 
      },
      include: {
        children: true,
        files: true
      }
    });
  }
}
