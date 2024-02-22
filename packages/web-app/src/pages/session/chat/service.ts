import { message } from "antd";
import { TableListItem } from "./type";
import { add, del, set } from "./config/request";

export const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await add({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

export const handleUpdate = async (fields: TableListItem, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await set({
      ...currentRow,
      ...fields
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    console.log(error)
    return false;
  }
};

export const handleRemove = async (selectedRows: TableListItem | TableListItem[]) => {
  if (!Array.isArray(selectedRows)) {
    selectedRows = [selectedRows]
  }
  const hide = message.loading('正在删除');

  try {
    await del({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

