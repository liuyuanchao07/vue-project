import { ElLoading } from "element-plus";

const customLoading = (options = {}) => {
  const loadingInstance = ElLoading.service(
    Object.assign(
      {
        fullscreen: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      },
      options
    )
  );

  return {
    close: () => {
      loadingInstance.close();
    },
  };
};

export default customLoading;
