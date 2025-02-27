const mapRecordToIds = (record: any) => {
  const selectedPermissionId: number[] = []

  const findSelectedIds = (menuList: any[]) => {
    menuList.forEach((item) => {
      if (!item.children) {
        selectedPermissionId.push(item.id)
      } else {
        findSelectedIds(item.children)
      }
    })
  }

  findSelectedIds(record.menuList)

  // console.log(selectedPermissionId)

  return selectedPermissionId
}

export default mapRecordToIds
