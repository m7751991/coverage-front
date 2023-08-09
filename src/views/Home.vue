<template>
  <div class="home">
    <header class="nav-tools-header">
      <div>
        测试覆盖率
      </div>
      <el-button @click="add">新增需求</el-button>
    </header>

    <div class="main">
      <el-table :data="state.demandList" style="width: 100%">
        <el-table-column prop="appId" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称">
        </el-table-column>
        <el-table-column prop="env" label="需求名称">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleClick(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Dialog ref="dialog" @refresh="init"></Dialog>

  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getDemandList } from '../api/index'
import Dialog from '../components/dialog.vue';

const state = reactive({
  demandList: []
})
const dialog = ref(null)

onMounted(() => { 
  init()
})

const init = async () => {
  const { data } = await getDemandList()
  state.demandList = data
}


const handleClick = ({ env, appId }) => {
  const url = `http://localhost:3199/coverage?env=${env}&appId=${appId}`
  window.open(url, '__blank')
}

const add = () => {
  dialog.value.open()
}

</script>


<style lang="less">
.home {
  .nav-tools-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // width: 100%;
    padding: 4px 8px;
    background-color: #39f;
    color: #fff;
  }

  .main {
    margin-top: 12px;
  }
}
</style>
