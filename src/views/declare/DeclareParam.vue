<template>
  <div style="width:1000px; height:400px; background: #fff; margin: 0 auto;">
      <el-container style="width:100%; height:100%; padding:15px; box-sizing:border-box; text-align:left;">
        <el-header style="width:100%;height:50px; boder:10px solid black;background:#fff;">
          <div style="width:100%; height:100%; line-height:50px; border-bottom:1px solid black;">
            <span style="margin-right:30px;">申报规则参数</span>
            <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="createdeclareParam" >新建</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAll">批量删除</el-button>
          </div>
        </el-header>
        <el-main style="width: 100%; height:255px; padding-bottom:10px;">
          <el-table :data="declareParamList" height="240px" bodrder stripe   @selection-change="handleSelectionChange" 
            style="font-size:12px;"
            :header-cell-style="{background:'#E5E5E5',color:'#333'}">
            <el-table-column type="selection" width="50" fixed></el-table-column>
            <el-table-column prop="ruleName" label="规则名称" width="80" align="center"></el-table-column>
            <el-table-column prop="paramName" label="参数名称" width="100"  align="center"></el-table-column>
            <!-- <el-table-column prop="paramCode" label="参数编码"  width="150" align="center"></el-table-column> -->
            <el-table-column prop="paramDataType" label="参数数据类型"  width="150" align="center"></el-table-column>
            <el-table-column prop="assistInfo" label="辅助信息"  width="100" align="center"></el-table-column>
            <el-table-column prop="isDeclare" label="是否公告"  width="80" align="center"></el-table-column>
            <el-table-column prop="ruleSence" label="所属市场"  width="150" align="center"></el-table-column>
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
        title="申报信息规则"
        :visible.sync="declareParamDialogVisible"
        width="30%"
        :before-close="handleClose" 
        center>   
        <el-form :model="declareParam" :label-position="labelPosition" label-width="110px" size="mini" :rules="rules" ref="declareParam">
          
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="declareParam.ruleName" auto-complete="off" disabled suffix-icon="el-icon-star-on"></el-input>
          </el-form-item>
          <el-form-item label="参数名称" prop="paramName" >
            <el-input v-model="declareParam.paramName" auto-complete="off"  suffix-icon="el-icon-edit" placeholder="请输入参数名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="参数编码" prop="paramCode">
            <el-input v-model="declareParam.paramCode" auto-complete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="参数数据类型" prop="paramDataType">
            <el-input v-model="declareParam.paramDataType" auto-complete="off" suffix-icon="el-icon-edit" placeholder="请输入参数数据类型"></el-input>
          </el-form-item>
          <el-form-item label="辅助信息" prop="assistInfo">
            <el-input v-model="declareParam.assistInfo" auto-complete="off" suffix-icon="el-icon-edit" placeholder="请输入辅助信息"></el-input>
          </el-form-item>
          <el-form-item label="是否公告" prop="isDeclare">
            <el-input v-model="declareParam.isDeclare" auto-complete="off"  suffix-icon="el-icon-edit" placeholder="请输入是或否"></el-input>
          </el-form-item>
          <el-form-item label="所属市场" prop="ruleSence">
            <el-input v-model="declareParam.ruleSence" auto-complete="off" disabled suffix-icon="el-icon-star-on"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button type="danger" size="small" @click="declareParamDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small"  @click="save('declareParam')">保 存</el-button>
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
      declareParam: {
        ruleName: '',
        paramName: "",
        paramCode: "",
        paramDataType: "",
        assistInfo: "",
        isDeclare: "",
        ruleSence: ""
      },
      declareParamDialogVisible: false,
      declareParamList: [],
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
         ruleName: [
           { required: true, message: '请输入规则名称', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
         paramName: [
           { required: true, message: '请输入参数名称', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
        //  paramCode: [
        //    { required: true, message: '请输入参数编码', trigger: 'blur' },
        //   //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //  ],
         paramDataType: [
           { required: true, message: '请输入参数数据类型', trigger: 'blur' },
          //  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ],
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
        ruleName: "申报规则",
        paramName: "是否申报电价",
        paramCode: "IS_DEC_UP_FILE",
        paramDataType: "布尔型",
        assistInfo: "无",
        isDeclare: "是",
        ruleSence: "北京电力交易中心"
      }]
      this.declareParamList = dataList;
      this.queryParam.pageInfo.total = this.declareParamList.length;
   
   },
   createdeclareParam () {
     this.declareParam = {};
     this.declareParam.ruleName = "申报规则";
     this.declareParam.ruleSence = "北京交易电力中心";
     this.declareParamDialogVisible = true;
   },
   save (declareParam) {
     this.$refs[declareParam].validate((valid) => {
        if (valid) {
          if ( this.declareParam.id == null ) {
            this.declareParam.id = id++;
            this.declareParamList.push(this.declareParam);
            this.queryParam.pageInfo.total = this.declareParamList.length;
          }
          this.declareParamDialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });    
   },
   handleEdit (index, row) {
     this.declareParam = this.declareParamList[index];
     this.declareParamDialogVisible = true;
     console.log(index,row);
   },
   handleDelete (index, row) {
    
    this.$confirm('你确定要删除该条信息吗?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(res => {
      this.declareParamList.splice(index,1);
      this.queryParam.pageInfo.total = this.declareParamList.length;
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
