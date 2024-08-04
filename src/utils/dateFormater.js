// 对于时间戳根据需求转换为日期格式，且支持通过formatType输出多种格式
export function formatDateTime(date, formatType) {
  // 无效日期检查
  if (!date) {
    return "";
  }

  let parsedDate;
  if (typeof date === "string" && date.includes("T")) {
    parsedDate = new Date(date);
  } else if (typeof date === "number") {
    parsedDate = new Date(date);
  } else {
    return ""; // 无效日期格式，返回空字符串
  }

  const dayIndex = parsedDate.getDay();
  const weekday = ["日", "一", "二", "三", "四", "五", "六"];
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const hour = parsedDate.getHours();
  const minute = parsedDate.getMinutes();

  if (formatType === "formatA") {
    // format A 2021-6-21 16:38
    return `${year}/${month}/${day} ${hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
    // format B 6/21 (周三) 16:38
  } else if (formatType === "formatB") {
    return `${month}/${day}（周${weekday[dayIndex]}）${hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
    // format C 16:38
  } else if (formatType === "formatC") {
    return `${month}/${day} ${hour}:${minute < 10 ? "0" + minute : minute}`;
    // format E 2023-6-21
  } else if (formatType === "formatE") {
    return `${year}-${month}-${day}`;
  }
}
