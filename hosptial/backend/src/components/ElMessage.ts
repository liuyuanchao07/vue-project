import { ElMessage } from "element-plus";

function showMessage({
  showClose = false,
  message = "",
  type = "warning",
  duration = 3000,
}) {
  ElMessage({
    showClose,
    message,
    type,
    duration,
  });
}

export default showMessage;
