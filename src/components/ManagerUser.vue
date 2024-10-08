<template>
  <div class="container">
    <p>Manage Users</p>
    <button @click="handleShowForm" class="btn btn-primary">
      Add New User
    </button>
    <table class="table user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Date Of Birth</th>
          <th>Email</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dateOfBirth }}</td>
          <td>{{ user.email }}</td>
          <td class="btn">
            <button @click="editUser(user)" class="btn btn-warning">
              Edit
            </button>
            <button @click="showDeleteModal(user.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit vs Add Form Modal -->
    <form-user
      v-if="isShowForm"
      :userToEdit="selectedUser"
      :existingUsers="users"
      @onClose="handleCloseForm"
      @onSubmit="handleSubmitForm"
    ></form-user>

    <!-- Modal xoa -->
    <div class="overlay" v-if="isModalVisible">
      <div class="modal-custom">
        <div class="modal-title">
          <h4>Cảnh báo</h4>
          <i class="fa-solid fa-xmark" @click="hideDeleteModal"></i>
        </div>
        <div class="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-light" @click="hideDeleteModal">Hủy</button>
          <button class="btn btn-danger" @click="confirmDelete">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import FormUser from "./FormUser.vue";

const isShowForm = ref(false);
const users = reactive(JSON.parse(localStorage.getItem("user")) || []);
const selectedUser = ref(null);

const isModalVisible = ref(false);
const userIdToDelete = ref(null);

const handleShowForm = () => {
  selectedUser.value = null;
  isShowForm.value = true;
};

const handleCloseForm = () => {
  isShowForm.value = false;
};

const editUser = (user) => {
  selectedUser.value = { ...user };
  isShowForm.value = true;
};

const handleSubmitForm = (user) => {
  if (selectedUser.value) {
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = { ...user };
  } else {
    users.push({ ...user });
  }
  localStorage.setItem("user", JSON.stringify(users));
  handleCloseForm();
};

const showDeleteModal = (id) => {
  isModalVisible.value = true;
  userIdToDelete.value = id;
};

const hideDeleteModal = () => {
  isModalVisible.value = false;
  userIdToDelete.value = null;
};

const confirmDelete = () => {
  const updatedUsers = users.filter((user) => user.id !== userIdToDelete.value);
  localStorage.setItem("user", JSON.stringify(updatedUsers));

  hideDeleteModal();
  window.location.reload();
};
</script>
<style scoped>
p {
  font-size: 40px;
}
.container {
  padding: 20px;
  overflow: auto;
}

h1 {
  margin-bottom: 20px;
}

.btn-primary {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

thead {
  background-color: #f2f2f2;
}

.btn {
  display: flex;
  gap: 10px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-custom {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body-custom {
  margin: 20px 0;
}

.modal-footer-custom {
  display: flex;
  justify-content: space-between;
}
</style>
