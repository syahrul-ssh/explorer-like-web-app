<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const folders = ref([]);
const selectedFolder = ref(null);
const searchQuery = ref('');

const fetchFolders = async () => {
  const { data } = await axios.get('http://localhost:3000/api/folders');
  folders.value = data;
};

const fetchFolderDetails = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/folder/${id}`);
  selectedFolder.value = data;
};

const searchFolders = async () => {
  let { data } = await axios.get(`http://localhost:3000/api/search?search=${searchQuery.value}`);
  folders.value = data;
};

const createFolder = async () => {
  const folderName = prompt("Enter folder name:");
  const { data } = await axios.post('http://localhost:3000/api/folder', {
    name: folderName,
    parentId: selectedFolder.value?.id
  });
  location.reload();
  fetchFolderDetails(data.id);
};

const uploadFile = async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post('http://localhost:3000/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  //save file
  await axios.post('http://localhost:3000/api/file', {
    fileName: data.name,
    folderId: selectedFolder.value?.id
  })
  fetchFolderDetails(selectedFolder.value.id);
};

onMounted(fetchFolders);
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <input v-model="searchQuery" @input="searchFolders" placeholder="Search..." class="search-box" />
      <button class="create-folder" @click="createFolder">📂 Create Folder</button>
      <ul>
        <li v-for="folder in folders" :key="folder.id">
          <div @click="folder.expanded = !folder.expanded" class="folder-item" v-on:click="fetchFolderDetails(folder.id)">
            📁 <span>{{ folder.name }}</span>
          </div>
          <ul v-if="folder.expanded">
            <li v-for="sub in folder.children" :key="sub.id" @click.stop="fetchFolderDetails(sub.id)" class="sub-folder">
              📁 <span>{{ sub.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="content">
      <h2 v-if="selectedFolder">📁 {{ selectedFolder.name }}</h2>
      <ul v-if="selectedFolder?.children?.length">
        <li v-for="sub in selectedFolder.children" :key="sub.id" @click.stop="fetchFolderDetails(sub.id)" class="folder-item">📁 {{ sub.name }}</li>
      </ul>
      <h3 v-if="selectedFolder?.files?.length">Files:</h3>
      <ul>
        <li v-for="file in selectedFolder?.files" :key="file.id">📄 {{ file.name }}</li>
      </ul>
    </div>
    <div v-if="selectedFolder" class="action-buttons">
      <button class="create-folder" @click="createFolder">📂 Create Folder</button>
      <label class="upload-file">
        📤 Upload File
        <input type="file" @change="uploadFile" hidden />
      </label>
    </div>
  </div>
</template>
