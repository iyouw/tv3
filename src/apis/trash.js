import request from './transport.js';

/**
 * get trash file list with name, type and updatetime range filters
 * @param { Number } page
 * @param { Number} pageSize
 * @param { String } name
 * @param { Number } type
 * @param { String } updateStartTime
 * @param { String } updateEndTime
 */
export function getTrashFileListAsync(
  page,
  pageSize,
  name,
  type,
  updateStartTime,
  updateEndTime,
) {
  const url = 'recycle/page';
  const method = 'POST';
  const data = {
    page,
    pageSize,
    name,
    type,
    updateTime: {
      start: updateStartTime,
      end: updateEndTime,
    },
  };
  return request({
    url,
    method,
    data,
  });
}

/**
 * recover the specific trash file records
 * @param { Array<String> } resourceIds
 */
export function recoverTrashFileAsync(resourceIds) {
  const url = 'recycle/restore';
  const method = 'POST';
  const data = {
    resIds: resourceIds,
  };
  return request({
    url,
    method,
    data,
  });
}

/**
 * remove the specific trash file
 * @param { Array<String> } resourceIds
 */
export function removeTrashFileAsync(resourceIds) {
  const url = 'recycle/delete';
  const method = 'POST';
  const data = {
    resIds: resourceIds,
  };
  return request({
    url,
    method,
    data,
  });
}
