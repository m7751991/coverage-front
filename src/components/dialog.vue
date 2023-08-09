<template>
  <el-dialog title="Dialog"  v-model="dialogVisible" width="30%" >

    <el-form :model="form" label-width="120px">
      <el-form-item label="需求名称">
        <el-input v-model="form.env"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-select v-model="form.appId" placeholder="请选择">
          <el-option v-for="item in list" :key="item.appId" :label="item.projectName" :value="item.appId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref,defineExpose,defineEmits,getCurrentInstance } from 'vue';
import { getProjectList,createProject } from '../api/index';
const root = getCurrentInstance().proxy

const dialogVisible = ref(false)
const list = ref([])
const form = ref({
  appId:'',
  env: '',
  projectName: '',
  createTime:''
})

const open = async () => {
  const { data } = await getProjectList()
  list.value = data
  dialogVisible.value = true
}

const save = async () => {
  form.value.projectName = list.value?.find(item=>item.appId ===form.value.appId)?.projectName
  form.value.createTime = new Date()
  const {status} = await createProject(form.value)
  status&&root.$message.success('新增成功')
  emit('refresh')
  dialogVisible.value = false
}


const emit =defineEmits(['refresh'])

defineExpose({
  open
});


</script>

<style lang="scss" scoped></style>