<script>
export default {
  data() {
    return {
      dateTime: Date.now(),
      table: {
        data: [],
        // 表格内操作列
        operator: [
          {
            text: '新增',
            fun: this.add
          },
          {
            text: '编辑',
            fun: this.edit
          },
          {
            text: '删除',
            render: (text, row) => {
              return (
                <el-popconfirm
                  title="你确定要删除吗？"
                  onConfirm={() => this.del(row)}
                >
                  <div slot="reference" type="link">
                    删除
                  </div>
                </el-popconfirm>
              );
            }
          }
        ],
        // 操作列样式
        operatorConfig: {
          fixed: 'right', // 固定列表右边（left则固定在左边）
          width: 280,
          label: '操作'
        },
        columns: [
          { prop: 'id', label: '序列', minWidth: 80, fixed: true, key: 'id' },
          { prop: 'name', label: '姓名', minWidth: 120, key: 'name' },
          { prop: 'code', label: 'code', minWidth: 80, key: 'code' },
          { prop: 'address1', label: '地址1', minWidth: 240, key: 'address1' },
          { prop: 'address2', label: '地址2', minWidth: 240, key: 'address2' },
          { prop: 'address3', label: '地址3', minWidth: 240, key: 'address3' },
          { prop: 'status', label: '状态', minWidth: 120, key: 'status' }
        ]
      }
    };
  },
  created() {
    this.initData();
    this.startTime();
  },
  methods: {
    startTime() {
      this.dateTime = Date.now();
      requestAnimationFrame(this.startTime);
    },
    initData() {
      for (let i = 0; i < 30000; i++) {
        this.table.data.push({
          id: i + 1,
          code: i + 1,
          status: '待维修' + i,
          name: '张三' + i,
          address1: '广东省广东省广州市白云广东省广州市白云广州市白云区A' + i,
          address2: '广东省广东省广州市白云广东省广州市白云广州市白云区B' + i,
          address3: '广东省广东省广州市白云广东省广州市白云广州市白云区C' + i
        });
      }
    },
    // 新增
    add(val) {
      console.log('新增', val);
    },
    // 编辑
    edit(val) {
      console.log('编辑', val);
    },
    // 删除
    del(val) {
      this.$confirm('是否永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('删除', val);
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    }
  }
};
</script>
