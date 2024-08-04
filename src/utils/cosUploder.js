import COS from "cos-wx-sdk-v5";

const COS_ENV = {
  Bucket:
    process.env.NODE_ENV === "development"
      ? "co-stg-1255891656"
      : "co-stg-1255891656",
  Region: "ap-nanjing",
  SliceSize: 1024 * 1024 * 5,
  ExpireTime: 60 * 10, // 单位秒，十分钟
};

export function uploadImagesToCos(imgList, folderName) {
  return new Promise((resolve, reject) => {
    // 1. 请求后端接口获取 COS 密钥信息
    this.$request("0102", { folder_type: "co" })
      .then((response) => {
        // 2. 初始化 COS SDK
        const cos = new COS({
          getAuthorization: function (options, callback) {
            callback({
              TmpSecretId: response.data.tmpSecretId,
              TmpSecretKey: response.data.tmpSecretKey,
              XCosSecurityToken: response.data.tmpSessionToken,
              ExpiredTime: response.data.expiredTime,
            });
          },
        });

        // 3. 遍历上传图片
        const uploadTasks = imgList.map((imgPath) => {
          const filename = imgPath.substr(imgPath.lastIndexOf("/") + 1); // 获取文件名

          return new Promise((resolveUpload, rejectUpload) => {
            // 上传到 COS
            cos.postObject(
              {
                Bucket: COS_ENV.Bucket,
                Region: COS_ENV.Region,
                Key: `${folderName}/${filename}`, // 指定上传路径
                FilePath: imgPath,
                onProgress: function (info) {
                  console.log("上传进度", info.percent);
                },
              },
              (err, data) => {
                if (err) {
                  rejectUpload(err);
                } else {
                  resolveUpload(data);
                }
              }
            );
          });
        });

        // 4. 执行所有上传任务
        Promise.all(uploadTasks)
          .then((results) => {
            resolve(results); // 返回所有上传成功的结果
          })
          .catch((err) => {
            reject(err); // 处理上传过程中的错误
          });
      })
      .catch((error) => {
        reject(error); // 处理获取 COS 密钥接口调用失败的情况
      });
  });
}
