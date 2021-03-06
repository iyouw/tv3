import request from './transport.js'

/**
 * get recently view file list with name, type and updatetime range filters
 * @param { Number } page
 * @param { Number} pageSize
 * @param { String } name
 * @param { Number } type
 * @param { String } updateStartTime
 * @param { String } updateEndTime
 */
export function getRecentlyViewFileListAsync(
  page,
  pageSize,
  name,
  type,
  updateStartTime,
  updateEndTime,
) {
  const url = 'browse/page';
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
 * remove the specific recently view file records
 * @param { Array<String> } resourceIds
 */
export function removeRecentlyViewFileAsync(resourceIds) {
  const url = 'browse/remove';
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
