const contextConfig = {
  title: "用户列表",
  buttonTitle: "新建用户",
  tableList: [
    {
      type: "normal",
      label: "姓名",
      prop: "name",
      width: "120",
    },
    {
      type: "normal",
      label: "真实姓名",
      prop: "realname",
      width: "120",
    },
    {
      type: "normal",
      label: "手机号码",
      prop: "cellphone",
      width: "120",
    },
    {
      type: "state",
      label: "状态",
      prop: "enable",
      width: "120",
    },
    {
      type: "timer",
      label: "创建时间",
      prop: "createAt",
    },
    {
      type: "timer",
      label: "更新时间",
      prop: "updateAt",
    },
    {
      type: "button",
      label: "操作",
      prop: "button",
    },
  ],
}

export default contextConfig
