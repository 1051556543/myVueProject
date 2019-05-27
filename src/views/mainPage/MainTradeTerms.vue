<template>
  <el-container width="100%;" height="930px;">
    <el-header style="margin-bottom:15px;text-align:left;color:#fff;font-size:18px;">
      <!-- <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
      </el-dropdown>-->
      <i class="el-icon-setting" style="margin-right: 5px"></i>
      <span>交易条款管理</span>
    </el-header>

    <el-container>
      <el-aside width="215px" height="930px" style="background-color: #fff;;margin-right:15px;"></el-aside>
      <el-main width="1000px;" style="padding:0;">
        <trade-terms></trade-terms>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TradeTerms from '@/views/terms/TradeTerms'
export default {
  components: {
    'trade-terms': TradeTerms
  },
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
