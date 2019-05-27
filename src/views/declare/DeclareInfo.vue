<template>
  <div style="width:1000px; height:400px; background: #fff; margin: 0 auto 15px;">
      <el-container style="width:100%; height:100%; padding:15px; box-sizing:border-box; text-align:left;">
        <el-header style="width:100%;height:50px; boder:10px solid black;background:#fff;">
          <div style="width:100%; height:100%; line-height:50px; border-bottom:1px solid black;">
            <span style="margin-right:30px;">申报规则信息</span>
            <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="createDeclareInfo" >新建</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteAll">批量删除</el-button>
          </div>
        </el-header>
        <el-main style="width: 100%; height:255px; padding-bottom:10px;">
          <el-table :data="declareInfoList" height="240px" bodrder stripe   @selection-change="handleSelectionChange"  
            style="font-size:12px;"
            :header-cell-style="{background:'#E5E5E5',color: '#333'}"
            :row-class-name="tableRowClassName">
            <el-table-column type="selection" width="50" fixed></el-table-column>
            <el-table-column prop="ruleName" label="规则名称" width="80" align="center"></el-table-column>
            <!-- <el-table-column prop="ruleCode" label="规则编码" width="100"  align="center"></el-table-column> -->
            <el-table-column prop="ruleType" label="规则类型"  width="100" align="center"></el-table-column>
            <el-table-column prop="ruleUser" label="规则应用方"  width="100" align="center"></el-table-column>
            <el-table-column prop="ruleRegTime" label="规则注册时间"  width="100" align="center"></el-table-column>
            <el-table-column prop="regPerson" label="注册人"  width="100" align="center"></el-table-column>
            <el-table-column prop="ruleSence" label="规则场景"  width="140" align="center"></el-table-column>
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
        title="申报规则参数"
        :visible.sync="declareInfoDialogVisible"
        width="30%"
        :before-close="handleClose" 
        center> 
    
        <el-form :model="declareInfo" :label-position="labelPosition" label-width="100px" size="mini" :rules="rules" ref="declareInfo"> 
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="declareInfo.ruleName" auto-complete="off" suffix-icon="el-icon-edit" placeholder="请输入规则名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="规则编码" prop="ruleCode">
            <el-input v-model="declareInfo.ruleCode" auto-complete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="规则类型" prop="ruleType" >
            <el-input v-model="declareInfo.ruleType" auto-complete="off" disabled suffix-icon="el-icon-star-on"></el-input>
          </el-form-item>
          <el-form-item label="规则应用方" prop="ruleUser">
            <el-select v-model="declareInfo.ruleUser" placeholder="请选择规则规则应用方">
              <el-option label="适用于购方" value="goufang"></el-option>
              <el-option label="适用于售方" value="shoufang"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则场景" prop="ruleSence" >
            <el-input v-model="declareInfo.ruleSence" auto-complete="off" disabled suffix-icon="el-icon-star-on"></el-input>
          </el-form-item>
          
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button type="danger" size="small" @click="declareInfoDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small"  @click="save('declareInfo')">保 存</el-button>
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
      declareInfo: {
        ruleName: '',
        ruleCode: "",
        ruleType: "交易申报规则",
        ruleUser: "",
        ruleRegTime: "2019-5-26",
        regPerson: "张显",
        ruleSence: ""
      },
      declareInfoDialogVisible: false,
      declareInfoList: [],
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
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // ruleCode: [
        //   { required: true, message: '请输入规则编码', trigger: 'blur' },
        //   // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        ruleType: [
          { required: true, message: '请输入规则类型', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ruleUser: [
          { required: true, message: '请输入规则应用方', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ruleSence: [
          { required: true, message: '请输入规则场景', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        ruleName: '购方',
        ruleCode: "1001",
        ruleType: "交易准入规则",
        ruleUser: "仅适用于购方",
        ruleRegTime: "2019-5-26",
        regPerson: "张三",
        ruleSence: "北京电力交易中心"
      },
      {
        id: "1",
        ruleName: '购方',
        ruleCode: "1001",
        ruleType: "交易准入规则",
        ruleUser: "仅适用于购方",
        ruleRegTime: "2019-5-26",
        regPerson: "张三",
        ruleSence: "北京电力交易中心"
      },
      {
        id: "1",
        ruleName: '购方',
        ruleCode: "1001",
        ruleType: "交易准入规则",
        ruleUser: "仅适用于购方",
        ruleRegTime: "2019-5-26",
        regPerson: "张三",
        ruleSence: "北京电力交易中心",
        flag: false
      },
      {
        id: "1",
        ruleName: '购方sfd',
        ruleCode: "1001",
        ruleType: "交易准入规则",
        ruleUser: "仅适用于购方",
        ruleRegTime: "2019-5-26",
        regPerson: "张三",
        ruleSence: "北京电力交易中心"
      },
      {
        id: "1",
        ruleName: '购方',
        ruleCode: "1001",
        ruleType: "交易准入规则",
        ruleUser: "仅适用于购方",
        ruleRegTime: "2019-5-26",
        regPerson: "张三",
        ruleSence: "北京电力交易中心"
      }];
     
      this.declareInfoList = dataList;
      this.queryParam.pageInfo.total = this.declareInfoList.length;
   
   },
   createDeclareInfo () {
     this.declareInfo = {};
     this.declareInfo.ruleType = "交易申报规则";
     this.declareInfo.ruleSence = "北京交易电力中心";
     this.declareInfoDialogVisible = true;
   },
   save (declareInfo) {
     this.$refs[declareInfo].validate((valid) => {
        if (valid) {
          if ( this.declareInfo.id == null ) {
            this.declareInfo.id = id++;
            this.declareInfo.ruleType = "交易申报规则";
            this.declareInfo.ruleSence = "北京交易电力中心";
            this.declareInfo.ruleRegTime = "2019-5-26";
            this.declareInfo.regPerson = "张显";
            this.declareInfoList.push(this.declareInfo);
            this.queryParam.pageInfo.total = this.declareInfoList.length;
          }
          this.declareInfoDialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
   },
   handleEdit (index, row) {
     this.declareInfo = this.declareInfoList[index];
     this.declareInfoDialogVisible = true;
     console.log(index,row);
   },
   handleDelete (index, row) {
    
    this.$confirm('你确定要删除该条信息吗?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(res => {
      this.declareInfoList.splice(index,1);
      this.queryParam.pageInfo.total = this.declareInfoList.length;
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
   },
   tableRowClassName({row, rowIndex}) {  //用于隔行换色，还没成功
    if(rowIndex%2==1){
      return 'warning-row';
    }else{
      return 'success-row';
    }
  }
 }
}
</script>

<style scoped>
.el-dialog__header {
  padding: 0;
}
</style>
