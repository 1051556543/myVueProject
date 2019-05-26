<template>
  <div style="width:1000px; height:930px; background: #fff; margin: 0 auto;">
      <el-container style="width:100%; height:100%; padding:15px; box-sizing:border-box; text-align:left;">
        <el-header style="width:100%;height:50px; boder:10px solid black;">
          <div style="width:100%; height:100%; line-height:50px; border-bottom:1px solid black;">
            <span style="margin-right:30px;">交易条款信息</span>
            <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="createtradeTerm" >新建</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAll">批量删除</el-button>
          </div>
        </el-header>
        <el-main style="width: 100%; height:800px; padding-bottom:10px;">
          <el-table :data="tradeTermList" min-height="500px" bodrder stripe   @selection-change="handleSelectionChange" 
            style="font-size:12px;"
            :header-cell-style="{background:'#E5E5E5',color:'#333'}">
            <el-table-column type="selection" width="50" fixed></el-table-column>
            <el-table-column prop="subVarieties" label="交易子品种  " width="100" align="center"></el-table-column>
            <el-table-column prop="termName" label="交易条款名称" width="100"  align="center"></el-table-column>
            <!-- <el-table-column prop="dataType" label="参数编码"  width="150" align="center"></el-table-column> -->
            <el-table-column prop="dataType" label="数据类型"  width="150" align="center"></el-table-column>
            <el-table-column prop="assistInfo" label="辅助信息"  width="100" align="center"></el-table-column>
            <el-table-column prop="isDeclare" label="是否公告"  width="80" align="center"></el-table-column>
            <el-table-column prop="ruleSence" label="规则场景"  width="150" align="center"></el-table-column>
            <el-table-column  prop="" label="操作" width="200" align="center" fixed="right">
              <template slot-scope="scope">
                 <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                 <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer style="width:100%;height:50px;padding-left:380px;box-sizing:border-box;">
          <div class="block" style="width:100%;height:100%;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryParam.pageInfo.total">
            </el-pagination>
          </div>
        </el-footer>
      </el-container>
      <el-dialog
        title="交易条款信息"
        :visible.sync="tradeTermDialogVisible"
        width="30%"
        :before-close="handleClose" 
        center>   
        <el-form :model="tradeTerm" :label-position="labelPosition" label-width="110px" size="mini" :rules="rules" ref="tradeTerm">
          
          <el-form-item label="交易子品种" prop="subVarieties">
            <el-input v-model="tradeTerm.subVarieties" auto-complete="off" disabled suffix-icon="el-icon-star-on"></el-input>
          </el-form-item>
          <el-form-item label="交易条款名称" prop="termName" >
            <el-input v-model="tradeTerm.termName" auto-complete="off"  suffix-icon="el-icon-edit" placeholder="请输入交易条款名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="参数编码" prop="dataType">
            <el-input v-model="tradeTerm.dataType" auto-complete="off"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="参数数据类型" prop="paramDataType">
            <el-input v-model="tradeTerm.paramDataType" auto-complete="off" suffix-icon="el-icon-edit" placeholder="请输入参数数据类型"></el-input>
          </el-form-item> -->
          <el-form-item label="辅助信息" prop="assistInfo">
            <el-input v-model="tradeTerm.assistInfo" auto-complete="off" suffix-icon="el-icon-edit" placeholder="请输入辅助信息"></el-input>
          </el-form-item>
          <el-form-item label="是否公告" prop="isDeclare">
            <el-input v-model="tradeTerm.isDeclare" auto-complete="off"  suffix-icon="el-icon-edit" placeholder="请输入是或否"></el-input>
          </el-form-item>
          <el-form-item label="规则场景" prop="ruleSence">
            <el-input v-model="tradeTerm.ruleSence" auto-complete="off" disabled suffix-icon="el-icon-star-on"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button type="danger" size="small" @click="tradeTermDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small"  @click="save('tradeTerm')">保 存</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
let id = 1;
export default {
 data () {
   return {
      currentPage: 1,
      labelPosition: "right",
      tradeTerm: {
        subVarieties: '',
        termName: "",
        dataType: "",
        // paramDataType: "",
        assistInfo: "",
        isDeclare: "",
        ruleSence: ""
      },
      tradeTermDialogVisible: false,
      tradeTermList: [],
      queryParam: {
        data: {
          courseName: null
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 2,
          size: 0,
          startRow: 1,
          endRow: 1,
          pages: 0,
          prePage: 0,
          nextPage: 0,
          isFirstPage: true,
          isLastPage: true,
          hasPreviousPage: false,
          navigatePages: 0,
          navigatepageNums: [],
          navigateFirstPage: 1,
          navigateLastPage: 1,
          total: 0
        }
      },
      rules: {
        //  subVarieties: [
        //    { required: true, message: '请输入子品种', trigger: 'blur' },
        //   //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //  ],
         termName: [
           { required: true, message: '请输入交易条款名称', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
        //  dataType: [
        //    { required: true, message: '请输入参数编码', trigger: 'blur' },
        //   //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //  ],
        //  paramDataType: [
        //    { required: true, message: '请输入参数数据类型', trigger: 'blur' },
        //   //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //  ],
         assistInfo: [
           { required: true, message: '请输入辅助信息', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
         isDeclare: [
           { required: true, message: '请输入是或否', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
         ruleSence: [
           { required: true, message: '请输入规则场景', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ]
      }
   }
 },
 mounted () {
   this.loadData(this.queryParam);
 },
 methods: {
   loadData (queryParam) {
     let dataList = [{
        id: "1",
        subVarieties: "电力直接交易",
        termName: "是否自动刷新",
        dataType: "布尔型",
        // paramDataType: "布尔型",
        assistInfo: "无",
        isDeclare: "是",
        ruleSence: "国网山西电力"
      },
      {
        id: "1",
        subVarieties: "电力直接交易",
        termName: "是否自动刷新",
        dataType: "布尔型",
        // paramDataType: "布尔型",
        assistInfo: "无",
        isDeclare: "是",
        ruleSence: "国网山西电力"
      },
      {
        id: "1",
        subVarieties: "电力直接交易",
        termName: "是否自动刷新",
        dataType: "布尔型",
        // paramDataType: "布尔型",
        assistInfo: "无",
        isDeclare: "是",
        ruleSence: "国网山西电力"
      },
      {
        id: "1",
        subVarieties: "电力直接交易",
        termName: "是否自动刷新",
        dataType: "布尔型",
        // paramDataType: "布尔型",
        assistInfo: "无",
        isDeclare: "是",
        ruleSence: "国网山西电力"
      },
      {
        id: "1",
        subVarieties: "电力直接交易",
        termName: "是否自动刷新",
        dataType: "布尔型",
        // paramDataType: "布尔型",
        assistInfo: "无",
        isDeclare: "是",
        ruleSence: "国网山西电力"
      }]
      this.tradeTermList = dataList;
      this.queryParam.pageInfo.total = this.tradeTermList.length;
   
   },
   createtradeTerm () {
     this.tradeTerm = {};
     this.tradeTerm.subVarieties = "电力直接交易";
     this.tradeTerm.dataType = "布尔型";
     this.tradeTerm.ruleSence = "国网山西电力";
     this.tradeTermDialogVisible = true;
   },
   save (tradeTerm) {
     this.$refs[tradeTerm].validate((valid) => {
        if (valid) {
          if ( this.tradeTerm.id == null ) {
            this.tradeTerm.id = id++;
            this.tradeTermList.push(this.tradeTerm);
            this.queryParam.pageInfo.total = this.tradeTermList.length;
          }
          this.tradeTermDialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });    
   },
   handleEdit (index, row) {
     this.tradeTerm = this.tradeTermList[index];
     this.tradeTermDialogVisible = true;
     console.log(index,row);
   },
   handleDelete (index, row) {
    
    this.$confirm('你确定要删除该条信息吗?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(res => {
      this.tradeTermList.splice(index,1);
      this.queryParam.pageInfo.total = this.tradeTermList.length;
    },err => {
     
    })
   },
   handleSelectionChange (multipleSelection) {
     
    
   },
   deleteAll () {
    alert("需连接后台才可实现");
   },
   handleSizeChange(val) {
      this.queryParam.pageInfo.pageSize = val;
   },
    handleCurrentChange(val) {
      this.queryParam.pageInfo.pageNum = val;
   },
   handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
   }
 }
}
</script>

<style scoped>

</style>
