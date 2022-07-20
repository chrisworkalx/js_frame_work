var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    check: {
		enable: true
	},
    view: {
        fontCss: getFont,
        showIcon: false
    }
};
function getFont(treeId, node) {
    return node.font ? node.font : {};
}


var zNodes = [
    { id: 1, pId: 0, name: "儒商信息管理系统", open: true },
    { id: 10, pId: 1, name: "工作桌面", open: true },
    { id: 101, pId: 10, name: "本人创建文章" },
    { id: 102, pId: 10, name: "待审核文章" },
    { id: 103, pId: 10, name: "定制栏目文章" },
    { id: 20, pId: 1, name: "网站管理", open: true },
    { id: 201, pId: 20, name: "站点管理" },
    { id: 202, pId: 20, name: "栏目管理" },
    { id: 203, pId: 20, name: "文章管理" },
    { id: 204, pId: 20, name: "模板管理", font: { 'color': 'red' } },
    { id: 205, pId: 20, name: "资源管理", font: { 'color': 'red' } },
    { id: 30, pId: 1, name: "发布管理", open: true, font: { 'color': 'red' } },
    { id: 40, pId: 1, name: "系统管理", open: true },
    { id: 401, pId: 40, name: "用户管理" },
    { id: 402, pId: 40, name: "角色管理" },
    { id: 403, pId: 40, name: "部门管理" },
    { id: 404, pId: 40, name: "属性管理", open: true },
    { id: 4041, pId: 404, name: "属性类型管理" },
    { id: 4042, pId: 404, name: "属性组管理" },
    { id: 405, pId: 40, name: "流程组管理" },
    { id: 406, pId: 40, name: "配置管理", open: true },
    { id: 4061, pId: 406, name: "系统配置管理" },
    { id: 4062, pId: 406, name: "发布配置管理", font: { 'color': 'red' } },
    { id: 407, pId: 40, name: "日志管理", open: true },
    { id: 4071, pId: 407, name: "登录日志" },
    { id: 4072, pId: 407, name: "文章日志" },
    { id: 4073, pId: 407, name: "安全日志" },
    { id: 4074, pId: 407, name: "系统配置日志" },
    { id: 4075, pId: 407, name: "网站发布日志" },
    { id: 4076, pId: 407, name: "网站管理日志" },
    { id: 4077, pId: 407, name: "审计日志" },
];

$(document).ready(function () {
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});



