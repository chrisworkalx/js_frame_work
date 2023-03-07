<!-- eslint-disable no-plusplus -->
<template>
  <div class="menu">
    <el-button type="primary" @click="save">保存</el-button>
    <el-tree
      ref="tree"
      :data="menuList"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      draggable
    >
    </el-tree>
  </div>
</template>

<script>
const menuList = [
  {
    label: 'ProductService',
    id: 'm:1489',
    sort_order: 1000,
    parentId: null,
    children: [
      {
        label: 'ProductArm', id: 'm:1490', parentId: 'm:1489', sort_order: 1001
      },
      {
        label: 'ProductControlBox', id: 'm:1492', parentId: 'm:1489', sort_order: 1002
      },
      {
        label: 'ProductAccessory', id: 'm:1494', parentId: 'm:1489', sort_order: 1003
      },
      {
        label: 'ProductSoftware', id: 'm:1496', parentId: 'm:1489', sort_order: 1004
      },
      {
        label: 'ProductSpareParts', id: 'm:1498', parentId: 'm:1489', sort_order: 1005
      }
    ]
  },
  {
    label: 'RobotService',
    id: 'm:1505',
    parentId: null,
    sort_order: 2000,
    children: [
      {
        label: 'RobotArm', id: 'm:1506', parentId: 'm:1505', sort_order: 2001
      },
      {
        label: 'RobotControlBox', id: 'm:1561', parentId: 'm:1505', sort_order: 2002
      },
      {
        label: 'RobotTeach', id: 'm:1511', parentId: 'm:1505', sort_order: 2003
      },
      {
        label: 'RobotMotionBar', id: 'm:1513', parentId: 'm:1505', sort_order: 2004
      },
      {
        label: 'RobotRobotBed', id: 'm:1515', parentId: 'm:1505', sort_order: 2005
      }
    ]
  },
  {
    label: 'SoftwareService',
    id: 'm:1517',
    parentId: null,
    sort_order: 3000,
    children: [
      {
        label: 'SoftwareLicense', id: 'm:1518', parentId: 'm:1517', sort_order: 3001
      },
      {
        label: 'SoftwareLicenseAudit', id: 'm:1519', parentId: 'm:1517', sort_order: 3001
      },
      {
        label: 'SoftwareLicenseKey', id: 'm:1520', parentId: 'm:1517', sort_order: 3002
      }
    ]
  },
  {
    label: 'OrderService',
    id: 'm:1499',
    parentId: null,
    sort_order: 4000,
    children: [
      {
        label: 'OrderSaleOrder', id: 'm:1500', parentId: 'm:1499', sort_order: 4001
      },
      {
        label: 'OrderStockOut', id: 'm:1501', parentId: 'm:1499', sort_order: 4002
      },
      {
        label: 'OrderSoStockOut', id: 'm:1502', parentId: 'm:1499', sort_order: 4003
      },
      {
        label: 'OrderMyOrder', id: 'm:1503', parentId: 'm:1499', sort_order: 4004
      }
    ]
  },
  {
    label: 'DownloadService',
    id: 'm:1521',
    parentId: null,
    sort_order: 5000,
    children: [
      {
        label: 'DownloadServiceCenter', id: 'm:1522', parentId: 'm:1521', sort_order: 5001
      }
    ]
  },
  {
    label: 'AfterSaleService',
    id: 'm:1557',
    parentId: null,
    sort_order: 6000,
    children: [
      {
        label: 'AfterSaleServiceManagement', id: 'm:1558', parentId: 'm:1557', sort_order: 6001
      }
    ]
  },
  {
    label: 'ManagementService',
    id: 'm:1448',
    parentId: null,
    sort_order: 7000,
    children: [
      {
        label: 'BackupRestore', id: 'm:1567', parentId: 'm:1448', sort_order: 7001
      },
      {
        label: 'ManagementProduct', id: 'm:1523', parentId: 'm:1448', sort_order: 7002
      },
      {
        label: 'ManagementCustomer', id: 'm:1545', parentId: 'm:1448', sort_order: 7003
      },
      {
        label: 'ManagementUser', id: 'm:1537', parentId: 'm:1448', sort_order: 7004
      },
      {
        label: 'ManagementRole', id: 'm:1539', parentId: 'm:1448', sort_order: 7005
      },
      {
        label: 'ManagementPermission', id: 'm:1467', parentId: 'm:1448', sort_order: 7006
      },
      {
        label: 'ManagementMenu', id: 'm:1543', parentId: 'm:1448', sort_order: 7007
      },
      {
        label: 'ManagementGroup', id: 'm:1544', parentId: 'm:1448', sort_order: 7008
      },
      {
        label: 'ManagementMaterial', id: 'm:1546', parentId: 'm:1448', sort_order: 7009
      }
    ]
  }
];
export default {
  data() {
    return {
      collectDiffMenu: [],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ],
      menuList,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed: {
    plainArr() {
      return this.getPlainTree();
    }
  },
  watch: {
    menuList: {
      handler(n) {
        console.log('n', n);
      },
      deep: true
    }
  },
  methods: {
    diffMenu() {

    },
    getPlainTree() {
      return this.menuList.reduce((target, nextMenu, index) => {
        if (!nextMenu.parentId) {
          // eslint-disable-next-line no-param-reassign
          // nextMenu.sort_order = (index + 1) * 1000;
          target.push({
            ...Object.keys(nextMenu).reduce((targetObj, nextKey) => {
              if (nextKey !== 'children') {
                // eslint-disable-next-line no-param-reassign
                targetObj[nextKey] = nextMenu[nextKey];
              }
              return targetObj;
            }, {})
          });
        }
        if (nextMenu.children && Array.isArray(nextMenu.children)) {
          nextMenu.children.forEach((item, i) => {
            target.push({
              ...item
              // sort_order: nextMenu.sort_order + i + 1
            });
          });
        }
        return target;
      }, []);
    },
    save() {
      const submitMenus = this.menuList.reduce((target, nextMenu, index) => {
        if (!nextMenu.parentId) {
          // eslint-disable-next-line no-param-reassign
          // nextMenu.sort_order = (index + 1) * 1000;
          target.push({
            ...Object.keys(nextMenu).reduce((targetObj, nextKey) => {
              if (nextKey !== 'children') {
                // eslint-disable-next-line no-param-reassign
                targetObj[nextKey] = nextMenu[nextKey];
              }
              return targetObj;
            }, {})
          });
        }
        if (nextMenu.children && Array.isArray(nextMenu.children)) {
          nextMenu.children.forEach((item, i) => {
            target.push({
              ...item
              // sort_order: nextMenu.sort_order + i + 1
            });
          });
        }
        return target;
      }, []);
      // console.log('submitMenus', submitMenus);
    },

    handleWalkNodes(draggingNode, dropNode, dropType) {
      const collectMiddleNodes = [];
      const isHasNode = (id) => this.collectDiffMenu.some((m) => m.id === id);
      const isHasSortOrder = (order) => this.collectDiffMenu.some((m) => m.sort_order === order);
      const removeNode = (id, key) => {
        const idx = this.collectDiffMenu.findIndex((m) => m[key] === id);
        if (idx !== -1) {
          this.collectDiffMenu.splice(idx, 1);
        }
      };

      const loopFilterChildNodes = (childArray, parentNodeSortOrder) => {
        // eslint-disable-next-line no-param-reassign
        childArray = childArray || [];
        if (childArray.length) {
          childArray.forEach((node, index) => {
            loopFilterChildNodes(node.children, node.sort_order);
            // eslint-disable-next-line no-param-reassign
            node.sort_order = parentNodeSortOrder * 1 + index + 1;
            if (isHasNode(node.id)) {
              removeNode(node.id, 'id');
            }
            this.collectDiffMenu.push(node);
          });
        }
      };
      // case 1# 兄弟节点子节点间
      const {
        id: draggingNodeId,
        sort_order: draggingNodeSortOrder
      } = draggingNode.data;
      const {
        id: dropNodeId,
        sort_order: dropNodeSortOrder
      } = dropNode.data;
      if (draggingNodeId === dropNodeId) return;

      /**
       * 如果中间还有节点，需要将中间排头的节点进行转换
      */

      const step = (dropNode.data.parentId || draggingNode.data.parentId) ? 1 : 1000;
      const sortOrderMinusLen = dropNodeSortOrder - draggingNodeSortOrder;
      const positiveIntegerSortOrderMinusLen = Math.abs(sortOrderMinusLen / step);

      const [
        startIndex,
        endIndex,
        arrInsert,
        minStartSortOrderNum
      ] = sortOrderMinusLen > 0
        ? [
          draggingNodeSortOrder / step,
          dropNodeSortOrder / step,
          'push',
          draggingNodeSortOrder
        ]
        : [
          dropNodeSortOrder,
          draggingNodeSortOrder,
          'unshift',
          dropNodeSortOrder
        ];
      // eslint-disable-next-line no-plusplus
      for (let i = (startIndex + step); i < endIndex; i++) {
        this.plainArr.forEach((item) => {
          if (item.sort_order === i) {
            const middleNode = this.$refs.tree.getNode(item.id);
            console.log('middleNode', middleNode);
            collectMiddleNodes.push(middleNode.data);
          }
        });
      }
      if (dropType === 'before') {
        collectMiddleNodes[arrInsert](draggingNode.data, dropNode.data);
      } else {
        collectMiddleNodes[arrInsert](dropNode.data, draggingNode.data);
      }

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= positiveIntegerSortOrderMinusLen; i++) {
        if (isHasSortOrder(collectMiddleNodes[i].sort_order)) {
          removeNode(collectMiddleNodes[i].sort_order, 'sort_order');
        }
        collectMiddleNodes[i].sort_order = minStartSortOrderNum + step * i;
      }
      collectMiddleNodes.forEach((ch) => {
        loopFilterChildNodes(ch?.children, ch.sort_order);
      });

      // eslint-disable-next-line no-param-reassign
      // draggingNode.data.sort_order = dropNodeSortOrder;
      // // eslint-disable-next-line no-param-reassign
      // dropNode.data.sort_order = draggingNodeSortOrder;

      // if (isHasNode(draggingNodeId)) {
      //   removeNode(draggingNodeId, 'id');
      // }
      // if (isHasNode(dropNodeId)) {
      //   removeNode(dropNodeId, 'id');
      // }

      // loopFilterChildNodes(dropNodeChildren, dropNode.data.sort_order);
      // loopFilterChildNodes(draggingNodeChildren, draggingNode.data.sort_order);

      this.collectDiffMenu.push(...[...collectMiddleNodes].reduce((target, nextNode) => {
        target.push(Object.keys(nextNode).reduce((obj, nextKey) => {
          if (nextKey !== 'children') {
            // eslint-disable-next-line no-param-reassign
            obj[nextKey] = nextNode[nextKey];
          }
          return obj;
        }, {}));
        return target;
      }, []));
      console.log('this.collectDiffMenu', this.collectDiffMenu);
      // console.log('this.collectDiffMenu', this.collectDiffMenu);
      // console.log(this.collectDiffMenu.map((i) => ({
      //   sort_order: i.sort_order,
      //   label: i.label
      // })));
    },
    handleDragStart(node, ev) {
      // console.log('node', node);
      // console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('draggingNode', draggingNode);
      // console.log('dropNode', dropNode);

    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log('draggingNode', draggingNode);
      // console.log('dropNode', dropNode);
      // console.log('tree drop: ', dropNode.label, dropType);
      this.handleWalkNodes(draggingNode, dropNode, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      // console.log('draggingNode', draggingNode);
      // console.log(dropNode, '---dropNode');
      // console.log(draggingNode, dropNode, type);
      // console.log('type', type);
      // if (dropNode.data.label === '二级 3-1') {
      //   return type !== 'inner';
      // }
      // return true;
      const isParentBrotherNode = !draggingNode.data.parentId && !dropNode.data.parentId && type !== 'inner';

      const isChildBrotherNode = draggingNode.data.parentId
        && dropNode.data.parentId
        && type !== 'inner'
        && draggingNode.data.parentId === dropNode.data.parentId;

      if (isParentBrotherNode || isChildBrotherNode) {
        return true;
      }
      return false;
    },
    allowDrag(draggingNode) {
      // return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      return true;
    }
  }
};
</script>
<style scoped lang="scss">
.menu {
  box-shadow: 0 0 10px 5px #ccc;
  padding: 10px;
}
.el-tree::v-deep {
  max-height: 540px;
  overflow: auto;
  .el-tree-node__content {
    height: 48px;
    margin-left: 20px;
  }
  & > .el-tree-node {
    &:first-child::before {
      top: 24px;
      height: calc(100% - 24px);
    }
    &:nth-last-child(2)::before {
      height: 24px;
    }
    &:first-child:nth-last-child(2) {
      //只有一个一级节点的时候，不显示第一层层级线
      &::before {
        height: 0;
      }
      &::after {
        width: 0;
      }
    }
  }
  .el-tree-node {
    position: relative;
    padding-left: 24px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      border-left: 1px dashed black;
      width: 1px;
      height: 100%;
    }
    &::after {
      display: block;
      content: '';
      position: absolute;
      border-top: 1px dashed black;
      width: 20px;
      height: 24px;
      top: 24px;
    }
    &:last-child::before {
      height: 50%;
    }
  }
  .el-tree-node__children {
    padding-left: 24px;
  }
}
// .empty-tree {
//   height: 100%;
//   width: 100%;
//   background-color: #fff;
//   display: table-cell;
//   text-align: center;
//   vertical-align: middle;
// }
</style>
